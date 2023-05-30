<?php

namespace App\Models;

use App\Classes\RequestHelper;
use Illuminate\Database\Eloquent\Model;

class KK_Users_Reviews extends Model
{

    protected $table = 'kk_users_reviews';
    protected $primaryKey = 'kk_ur_id';

    const CREATED_AT = 'kk_ur_created_at';
    const UPDATED_AT = 'kk_ur_updated_at';

    protected $fillable = [
        'kk_ur_user_id',
        'kk_ur_course_id',
        'kk_ur_lesson_id',
        'kk_ur_assessment',
        'kk_ur_text',
    ];

    public static function Params($request)
    {
        $parts = RequestHelper::parts($request->parts);
        $parts_to_count = RequestHelper::parts($request->parts_to_count);

        $parts_queries = [];
        if (count($parts) > 0) {
            foreach ($parts as $part_key => $part) {
                switch ($part) {
                    case 'user':
                        $parts_queries += array($part => function ($query) use ($request, $part) {
                        });
                        break;
                    case 'lesson':
                        $parts_queries += array($part => function ($query) use ($request, $part) {
                            $query->select('kk_lesson_id', 'kk_lesson_course_id', 'kk_lesson_autor_id', 'kk_lesson_number', 'kk_lesson_published', 'kk_lesson_name')->with(['course']);
                        });
                        break;
                    case 'course':
                        $parts_queries += array($part => function ($query) use ($request, $part) {
                        });
                        break;
                }
            }
        }

        $parts_to_count_queries = [];
        if (count($parts_to_count) > 0) {
            foreach ($parts_to_count as $part_key => $part) {
                // switch ($part) {
                //     case 'category':

                //         break;
                // }
            }
        }
        $params = (object) array(
            'parts' => $parts_queries,
            'parts_to_count' => $parts_to_count_queries,
            'where' => function ($query) use ($request) {

                // if (isset($request->kk_course_id)) $query->where("kk_lesson_course_id", $request->kk_course_id);

            },
        );
        return $params;
    }

    public function user()
    {
        return $this->hasOne(KK_User::class, 'kk_user_id', 'kk_ur_user_id')->with(['role']);
    }
    public function course()
    {
        return $this->hasOne(KK_Courses::class, 'kk_course_id', 'kk_ur_course_id');
    }
    public function lesson()
    {
        return $this->hasOne(KK_Lessons::class, 'kk_lesson_id', 'kk_ur_lesson_id');
    }
}
