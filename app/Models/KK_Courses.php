<?php

namespace App\Models;

use App\Models\KK_Courses_Categories;
use Illuminate\Database\Eloquent\Model;
use App\Classes\RequestHelper;
use Illuminate\Support\Facades\Auth;

class KK_Courses extends Model
{
    protected $table = 'kk_courses';
    protected $primaryKey = 'kk_course_id';
    // private static $latest = ['lk_nkm_latest', '=', 1];
    // private static $exceptions = ['id', 'lk_nkm_update_date'];
    // public $timestamps = false;

    const CREATED_AT = 'kk_course_created_at';
    const UPDATED_AT = 'kk_course_updated_at';

    protected $fillable = [
        'kk_course_categoty_id',
        'kk_course_autor_id',
        'kk_course_published',
        'kk_course_name',
        'kk_course_description',
        'kk_course_image',
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
                    case 'category':
                        $parts_queries += array($part => function ($query) use ($request, $part) {
                            $query->where(function ($query) use ($request) {
                                if (isset($request->category_published)) {
                                    $query->where("kk_cc_published", $request->category_published);
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
                    case 'category':
                        $parts_to_count_queries += array($part => function ($query) use ($request, $part) {
                            $query->where(function ($query) use ($request) {
                                if (isset($request->category_published)) {
                                    $query->where("kk_cc_published", $request->category_published);
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
                if (isset($request->course_published)) $query->where("kk_course_published", $request->course_published);
                if (isset($request->kk_course_autor_id)) $query->where("kk_course_autor_id", $request->kk_course_autor_id);

            },
        );
        return $params;
    }


    public function category()
    {
        return $this->hasOne(KK_Courses_Categories::class, 'kk_cc_id', 'kk_course_categoty_id');
    }

    public function course_users_progress()
    {
        return $this->hasOne(KK_Courses_Users_Progress::class, 'kk_cup_course_id', 'kk_course_id');
    }
    public function lessons()
    {
        return $this->hasMany(KK_Lessons::class, 'kk_lesson_course_id', 'kk_course_id')->orderBy('kk_lesson_number');
    }
    public function lessons_users_progress()
    {
        return $this->hasOne(KK_Lessons_Users_Progress::class, 'kk_lup_course_id', 'kk_course_id');
    }

    public function cup_started()
    {
        return $this->hasMany(KK_Courses_Users_Progress::class, 'kk_cup_course_id', 'kk_course_id')->where([['kk_cup_started_at', 'IS NOT', NULL]]);
    }
    public function cup_finished()
    {
        return $this->hasMany(KK_Courses_Users_Progress::class, 'kk_cup_course_id', 'kk_course_id')->where([['kk_cup_finished_at', 'IS NOT', NULL]]);
    }
}
