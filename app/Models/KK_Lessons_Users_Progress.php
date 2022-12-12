<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;
use App\Classes\RequestHelper;
use App\Models\KK_Courses;
use App\Models\KK_Courses_Categories;

class KK_Lessons_Users_Progress extends Model
{
    protected $table = 'kk_lessons_users_progress';
    protected $primaryKey = 'kk_lup_id';


    const CREATED_AT = 'kk_lup_created_at';
    const UPDATED_AT = 'kk_lup_updated_at';

    protected $fillable = [
        'kk_lup_cup_id',
        'kk_lup_user_id',
        'kk_lup_lesson_id',
        'kk_lup_course_id',
        'kk_lup_status',
        'kk_lup_assessment',
        'kk_lup_started_at',
        'kk_lup_finished_at',
    ];

    public static function Params($request)
    {
        $parts = RequestHelper::parts($request->parts);
        $parts_to_count = RequestHelper::parts($request->parts_to_count);

        $parts_queries = [];
        if (count($parts) > 0) {
            foreach ($parts as $part_key => $part) {

                switch ($part) {
                    // case 'course':
                    //     $parts_queries += array($part => function ($query) use ($request, $part, $parts_to_count) {
                    //         $withCount = [];
                    //         if (in_array('lessons', $parts_to_count)) {
                    //             $withCount += array('lessons' => function ($query) use ($request, $withCount) {
                    //                 if (isset($request->lessons_published)) {
                    //                     $query->where("kk_lesson_published", $request->lessons_published);
                    //                 }
                    //             });
                    //         }
                    //         $query->withCount($withCount)->where(function ($query) use ($request, $parts_to_count) {
                    //             if (isset($request->course_published)) $query->where("kk_course_published", $request->course_published);
                    //             $query->orderBy('kk_course_updated_at', 'ASC');
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
                if (isset($request->status)) {
                    $query->where("kk_lup_status", $request->status);
                }
            },
        );
        return $params;
    }


    // public function course()
    // {
    //     return $this->hasOne(KK_Courses::class, 'kk_course_id', 'kk_lup_course_id');
    // }
}
