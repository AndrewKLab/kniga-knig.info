<?php

namespace App\Models;

use App\Models\KK_Courses_Categories;
use Illuminate\Database\Eloquent\Model;
use App\Classes\RequestHelper;
use Illuminate\Support\Facades\Auth;

class KK_Courses_Promo extends Model
{
    protected $table = 'kk_courses_promo';
    protected $primaryKey = 'kk_cp_id';

    const CREATED_AT = 'kk_cp_created_at';
    const UPDATED_AT = 'kk_cp_updated_at';

    protected $fillable = [
        'kk_cp_course_id',
        'kk_cp_name',
        'kk_cp_sub_name',
        'kk_cp_description',
        'kk_cp_image',
        'kk_cp_published',
    ];

    public static function Params($request)
    {
        $parts = RequestHelper::parts($request->parts);
        $parts_to_count = RequestHelper::parts($request->parts_to_count);

        $parts_queries = [];
        if (count($parts) > 0) {
            foreach ($parts as $part_key => $part) {

                switch ($part) {
                    case 'course_users_progress':
                        $parts_queries += array($part => function ($query) use ($request, $part) {
                            $query->where(function ($query) use ($request) {
                                $query->where("kk_cup_user_id", Auth::user()->kk_user_id);
                                if (isset($request->course_users_progress_status)) {
                                    $query->where("kk_cup_status", $request->course_users_progress_status);
                                }
                            });
                        });
                        break;
                    case 'course':
                        $parts_queries += array($part => function ($query) use ($request, $part) {
                            $query->where(function ($query) use ($request) {
                                if (isset($request->category_published)) {
                                    $query->where("kk_course_published", $request->category_published);
                                }
                            });
                        });
                        break;
                    case 'lessons':
                        $parts_queries += array($part => function ($query) use ($request, $part) {
                            $query->select('kk_lesson_id', 'kk_lesson_course_id', 'kk_lesson_autor_id', 'kk_lesson_number', 'kk_lesson_published', 'kk_lesson_name', 'kk_lesson_description', 'kk_lesson_image', 'kk_lesson_audio', 'kk_lesson_video', 'kk_lesson_created_at', 'kk_lesson_updated_at',);

                            $query->where(function ($query) use ($request) {
                                if (isset($request->lessons_published)) {
                                    $query->where("kk_lesson_published", $request->lessons_published);
                                }
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
                    case 'course':
                        $parts_to_count_queries += array($part => function ($query) use ($request, $part) {
                            $query->where(function ($query) use ($request) {
                                if (isset($request->category_published)) {
                                    $query->where("kk_course_published", $request->category_published);
                                }
                            });
                        });
                        break;
                    case 'lessons':
                        $parts_to_count_queries += array($part => function ($query) use ($request, $part) {
                            $query->where(function ($query) use ($request) {
                                if (isset($request->lessons_published)) {
                                    $query->where("kk_lesson_published", $request->lessons_published);
                                }
                            });
                        });
                        break;
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
                if (isset($request->course_published)) $query->where("kk_cp_published", $request->course_published);
            },
        );
        return $params;
    }

    public function lessons()
    {
        return $this->hasMany(KK_Lessons::class, 'kk_lesson_course_id', 'kk_cp_course_id')->orderBy('kk_lesson_number');
    }
}
