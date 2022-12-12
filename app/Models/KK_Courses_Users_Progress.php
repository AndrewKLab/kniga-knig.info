<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;
use App\Classes\RequestHelper;
use App\Models\KK_Courses;
use App\Models\KK_Lessons_Users_Progress;
use Illuminate\Support\Facades\Auth;

class KK_Courses_Users_Progress extends Model
{
    protected $table = 'kk_courses_users_progress';
    protected $primaryKey = 'kk_cup_id';


    const CREATED_AT = 'kk_cup_created_at';
    const UPDATED_AT = 'kk_cup_updated_at';

    protected $fillable = [
        'kk_cup_user_id',
        'kk_cup_course_id',
        'kk_cup_status',
        'kk_cup_assessment',
        'kk_cup_started_at',
        'kk_cup_finished_at',
    ];

    public static function Params($request)
    {
        $parts = RequestHelper::parts($request->parts);
        $parts_to_count = RequestHelper::parts($request->parts_to_count);

        $parts_queries = [];
        if (count($parts) > 0) {
            foreach ($parts as $part_key => $part) {

                switch ($part) {
                    case 'course':
                        $parts_queries += array($part => function ($query) use ($request, $parts, $parts_to_count) {

                            $with = [];
                            $withCount = [];
                            if (in_array('lessons', $parts)) {
                                $with += array('lessons' => function ($query) use ($request, $with) {
                                    if (isset($request->lessons_published)) {
                                        $query->where("kk_lesson_published", $request->lessons_published);
                                    }
                                });
                            }
                            if (in_array('lessons', $parts_to_count)) {
                                $withCount += array('lessons' => function ($query) use ($request, $withCount) {
                                    if (isset($request->lessons_published)) {
                                        $query->where("kk_lesson_published", $request->lessons_published);
                                    }
                                });
                            }
                            if (in_array('lessons_users_progress', $parts)) {
                                $with += array('lessons_users_progress' => function ($query) use ($request, $with) {
                                    if (isset($request->lessons_users_progress_status)) {
                                        $query->where("kk_lup_status", $request->lessons_users_progress_status);
                                    }
                                    $query->where(['kk_lup_user_id'=>Auth::user()->kk_user_id]);
                                });
                            }
                            if (in_array('lessons_users_progress', $parts_to_count)) {
                                $withCount += array('lessons_users_progress' => function ($query) use ($request, $withCount) {
                                    if (isset($request->lessons_users_progress_status)) {
                                        $query->where("kk_lup_status", $request->lessons_users_progress_status);
                                    }
                                    $query->where(['kk_lup_user_id'=>Auth::user()->kk_user_id]);
                                });
                            }

                            $query->with($with)->where(function ($query) use ($request, $parts) {
                                if (isset($request->course_published)) $query->where("kk_course_published", $request->course_published);
                                $query->orderBy('kk_course_updated_at', 'ASC');
                            });
                            $query->withCount($withCount)->where(function ($query) use ($request, $parts_to_count) {
                                if (isset($request->course_published)) $query->where("kk_course_published", $request->course_published);
                                $query->orderBy('kk_course_updated_at', 'ASC');
                            });

                        });
                        break;
                        case 'lessons_users_progress':
                            $parts_queries += array($part => function ($query) use ($request, $parts, $parts_to_count) {

                            });
                        break;
                    // case 'lessons':
                    //     $parts_queries += array($part => function ($query) use ($request, $part) {
                    //         $query->where(function ($query) use ($request) {
                    //             if (isset($request->lessons_published)) {
                    //                 $query->where("kk_lesson_published", $request->lessons_published);
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

        $parts_to_count_queries = [];
        if (count($parts_to_count) > 0) {
            foreach ($parts_to_count as $part_key => $part) {
                switch ($part) {
                        // case 'category':
                        //     $parts_to_count_queries += array($part => function ($query) use ($request, $part) {
                        //         $query->where(function ($query) use ($request) {
                        //             if (isset($request->category_published)) {
                        //                 $query->where("kk_cc_published", $request->category_published);
                        //             }
                        //         });
                        //     });
                        //     break;
                        // case 'lessons':
                        //     $parts_to_count_queries += array($part => function ($query) use ($request, $part) {
                        //         $query->where(function ($query) use ($request) {
                        //             if (isset($request->lessons_published)) {
                        //                 $query->where("kk_lesson_published", $request->lessons_published);
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
                if (isset($request->status)) {
                    $query->where("kk_cup_status", $request->status);
                }
            },
        );
        return $params;
    }


    public function course()
    {
        return $this->hasOne(KK_Courses::class, 'kk_course_id', 'kk_cup_course_id');
    }
    public function lessons_users_progress()
    {
        return $this->hasMany(KK_Lessons_Users_Progress::class, 'kk_lup_cup_id', 'kk_cup_id');
    }
}
