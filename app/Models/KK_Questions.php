<?php

namespace App\Models;

use App\Models\KK_Courses;
use Illuminate\Database\Eloquent\Model;
use App\Classes\RequestHelper;

class KK_Questions extends Model
{
    protected $table = 'kk_questions';
    protected $primaryKey = 'kk_question_id';

    const CREATED_AT = 'kk_question_created_at';
    const UPDATED_AT = 'kk_question_updated_at'; 

    protected $fillable = [
        'kk_question_lesson_id',
        'kk_question_type',
        'kk_question_text',
    ];

    public static function Params($request)
    {
        $parts = RequestHelper::parts($request->parts);
        $parts_to_count = RequestHelper::parts($request->parts_to_count);

        $parts_queries = [];
        if (count($parts) > 0) {
            foreach ($parts as $part_key => $part) {

                switch ($part) {
                    case 'answers':
                        $parts_queries += array($part => function ($query) use ($request, $parts) {

                            // $query->where(function ($query) use ($request) {
                            //     $query->where("kk_cup_user_id", Auth::user()->kk_user_id);
                            //     if (isset($request->course_users_progress_status)) {
                            //         $query->where("kk_cup_status", $request->course_users_progress_status);
                            //     }
                            // });
                        });
                        break;
                    // case 'course':
                    //     $parts_queries += array($part => function ($query) use ($request, $part) {
                    //         $query->where(function ($query) use ($request) {
                    //             if (isset($request->course_published)) {
                    //                 $query->where("kk_course_published", $request->course_published);
                    //             }
                    //         });
                    //     });
                    //     break;
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
                if (isset($request->lesson_published)) $query->where("kk_lesson_published", $request->lesson_published);
                if (isset($request->kk_course_id)) $query->where("kk_lesson_course_id", $request->kk_course_id);

            },
        );
        return $params;
    }


    public function answers()
    {
        return $this->hasMany(KK_Questions_Answers::class, 'kk_qa_question_id', 'kk_question_id');
    }
}
