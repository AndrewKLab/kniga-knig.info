<?php

namespace App\Models;

use App\Models\KK_Courses;
use Illuminate\Database\Eloquent\Model;
use App\Classes\RequestHelper;
use Illuminate\Support\Facades\Auth;

class KK_Courses_Categories extends Model
{
    protected $table = 'kk_courses_categories';
    protected $primaryKey = 'kk_cc_id';
    // private static $latest = ['lk_nkm_latest', '=', 1];
    // private static $exceptions = ['id', 'lk_nkm_update_date'];
    // public $timestamps = false;

    const CREATED_AT = 'kk_cc_created_at';
    const UPDATED_AT = 'kk_cc_updated_at';

    protected $fillable = [
        'kk_cc_autor_id',
        'kk_cc_published',
        'kk_cc_description',
        'kk_course_name',
        'kk_cc_image',
    ];

    public static function Params($request)
    {
        $parts = RequestHelper::parts($request->parts);
        $parts_to_count = RequestHelper::parts($request->parts_to_count);

        $parts_queries = [];
        if (count($parts) > 0) {
            foreach ($parts as $part_key => $part) {
                switch ($part) {
                    case 'courses':
                        $parts_queries += array($part => function ($query) use ($request, $parts, $parts_to_count) {

                            $with = [];
                            if (in_array('lessons', $parts_to_count)) {
                                $with += array('lessons' => function ($query) use ($request, $with) {
                                    $query->select('kk_lesson_id', 'kk_lesson_course_id', 'kk_lesson_autor_id', 'kk_lesson_number', 'kk_lesson_published', 'kk_lesson_name', 'kk_lesson_description', 'kk_lesson_image', 'kk_lesson_audio', 'kk_lesson_video', 'kk_lesson_created_at', 'kk_lesson_updated_at',);

                                    if (isset($request->lessons_published)) {
                                        $query->where("kk_lesson_published", $request->lessons_published);
                                    }
                                });
                            }

                            $withCount = [];
                            if (in_array('lessons', $parts_to_count)) {
                                $withCount += array('lessons' => function ($query) use ($request, $withCount) {

                                    if (isset($request->lessons_published)) {
                                        $query->where("kk_lesson_published", $request->lessons_published);
                                    }
                                });
                            }
                            $query->with($with)->withCount($withCount)->where(function ($query) use ($request, $parts_to_count) {
                                if (isset($request->courses_published)) $query->where("kk_course_published", $request->courses_published);
                                $query->orderBy('kk_course_updated_at', 'ASC');
                            });
                        });
                        break;
                        // default:
                        //     # code...
                        //     break;
                }
            }
        }
        $parts_to_count_queries = [];
        if (count($parts_to_count) > 0) {
            foreach ($parts_to_count as $part_key => $part) {
                switch ($part) {
                    case 'courses':
                        $parts_to_count_queries += array($part => function ($query) use ($request, $part,) {
                            $query->where(function ($query) use ($request) {
                                if (isset($request->courses_published)) {
                                    $query->where("kk_course_published", $request->courses_published);
                                }
                            });
                        });
                        break;
                        // case 'lessons':
                        //     $parts_to_count_queries += array('courses' => function ($query) use ($request, $part) {
                        //         $query->where(function ($query) use ($request) {
                        //             if (isset($request->lessons_published)) {
                        //                 $query->where("kk_course_published", $request->lessons_published);
                        //             }
                        //         });
                        //     });
                        //     break;
                        // default:
                        //     # code...
                        //     break;
                }
            }
        }
        $params = (object) array(
            'parts' => $parts_queries,
            'parts_to_count' => $parts_to_count_queries,
            'where' => function ($query) use ($request) {
                if (isset($request->category_published)) {
                    $query->where("kk_cc_published", $request->category_published);
                }
            },
        );
        return $params;
    }


    public function courses()
    {
        return $this->hasMany(KK_Courses::class, 'kk_course_categoty_id', 'kk_cc_id');
    }
}
