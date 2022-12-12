<?php

namespace App\Models;

use App\Models\KK_Courses;
use Illuminate\Database\Eloquent\Model;
use App\Classes\RequestHelper;
use Illuminate\Support\Facades\Auth;

class KK_Lessons extends Model
{
    protected $table = 'kk_lessons';
    protected $primaryKey = 'kk_lesson_id';

    const CREATED_AT = 'kk_lesson_created_at';
    const UPDATED_AT = 'kk_lesson_updated_at';

    protected $fillable = [
        'kk_lesson_course_id',
        'kk_lesson_autor_id',
        'kk_lesson_published',
        'kk_lesson_name',
        'kk_lesson_description',
        'kk_lesson_image',
        'kk_lesson_audio',
        'kk_lesson_video',
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
                        if (Auth::check()) {
                            $parts_queries += array($part => function ($query) use ($request, $part) {
                                $query->where(function ($query) use ($request) {
                                    $query->where("kk_cup_user_id", Auth::user()->kk_user_id);
                                    if (isset($request->course_users_progress_status)) {
                                        $query->where("kk_cup_status", $request->course_users_progress_status);
                                    }
                                });
                            });
                        }
                        break;
                    case 'course':
                        $parts_queries += array($part => function ($query) use ($request, $parts, $parts_to_count) {
                            $with = [];
                            if (in_array('lessons', $parts)) {
                                $with += array('lessons' => function ($query) use ($request) {
                                    if (isset($request->lessons_published)) {
                                        $query->where("kk_lesson_published", $request->lessons_published);
                                    }
                                });
                            }
                            $query->with($with);
                            $withCount = [];
                            if (in_array('lessons', $parts_to_count)) {
                                $withCount += array('lessons' => function ($query) use ($request) {
                                    if (isset($request->lessons_published)) {
                                        $query->where("kk_lesson_published", $request->lessons_published);
                                    }
                                });
                            }
                            $query->withCount($withCount);
                            $query->where(function ($query) use ($request) {
                                if (isset($request->course_published)) {
                                    $query->where("kk_course_published", $request->course_published);
                                }
                            });
                        });
                        break;
                    case 'questions':
                        $parts_queries += array($part => function ($query) use ($request, $parts) {
                            $with = [];
                            
                            if (in_array('answers', $parts)) {
                               
                                $with += array('answers' => function ($query) use ($request, $parts) {
                                    if (Auth::check()) {
                                        $with = [];
                                        
                                        if (in_array('user_answer', $parts)) {
                                            
                                            $with += array('user_answer' => function ($querys) use ($request, $parts) {
                                                $querys->where("kk_qua_user_id", Auth::user()->kk_user_id);
                                            });
                                        }
                                        $query->with($with);
                                    }
                                    // if (isset($request->lessons_published)) {
                                    //     $query->where("kk_lesson_published", $request->lessons_published);
                                    // }
                                });
                            }
                            $query->with($with);
                            // $query->where(function ($query) use ($request) {
                            //     if (isset($request->course_published)) {
                            //         $query->where("kk_course_published", $request->course_published);
                            //     }
                            // });
                        });
                        break;
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
                if (isset($request->lesson_published)) $query->where("kk_lesson_published", $request->lesson_published);
                if (isset($request->kk_course_id)) $query->where("kk_lesson_course_id", $request->kk_course_id);
            },
        );
        return $params;
    }


    public function course()
    {
        return $this->hasOne(KK_Courses::class, 'kk_course_id', 'kk_lesson_course_id');
    }
    public function course_users_progress()
    {
        return $this->hasOne(KK_Courses_Users_Progress::class, 'kk_cup_course_id', 'kk_lesson_course_id');
    }
    public function questions()
    {
        return $this->hasMany(KK_Questions::class, 'kk_question_lesson_id', 'kk_lesson_id');
    }

    public function lessons_users_progress()
    {
        return $this->hasOne(KK_Lessons_Users_Progress::class, 'kk_lup_lesson_id', 'kk_lesson_id');
    }
}
