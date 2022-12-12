<?php

namespace App\Models;

use App\Classes\RequestHelper;
use Illuminate\Database\Eloquent\Model;

class KK_Users_Roles extends Model
{
    protected $table = 'kk_users_roles';
    protected $primaryKey = 'kk_role_id';


    const CREATED_AT = 'kk_role_created';
    const UPDATED_AT = 'kk_role_updated_at';

    protected $fillable = [
        'kk_role_type',
        'kk_role_level',
        'kk_role_name',
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
                    case 'users':
                        $parts_queries += array($part => function ($query) use ($request, $part) {
                            // $query->where(function ($query) use ($request) {
                            //     $query->where("kk_cup_user_id", Auth::user()->kk_user_id);
                            //     if (isset($request->course_users_progress_status)) {
                            //         $query->where("kk_cup_status", $request->course_users_progress_status);
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
                // if (isset($request->lesson_published)) $query->where("kk_lesson_published", $request->lesson_published);
                // if (isset($request->kk_course_id)) $query->where("kk_lesson_course_id", $request->kk_course_id);

            },
        );
        return $params;
    }

    public function users()
    {
        return $this->hasMany(KK_User::class, 'kk_user_role_id', 'kk_role_id');
    }

}
