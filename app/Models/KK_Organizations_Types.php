<?php

namespace App\Models;

use App\Models\KK_Courses_Categories;
use Illuminate\Database\Eloquent\Model;
use App\Classes\RequestHelper;
use Illuminate\Support\Facades\Auth;

class KK_Organizations_Types extends Model
{
    protected $table = 'kk_organizations_types';
    protected $primaryKey = 'kk_ot_id';

    const CREATED_AT = 'kk_ot_created_at';
    const UPDATED_AT = 'kk_ot_updated_at';

    protected $fillable = [
        'kk_ot_name',
    ];

    public static function Params($request)
    {
        $parts = RequestHelper::parts($request->parts);
        $parts_to_count = RequestHelper::parts($request->parts_to_count);

        $parts_queries = [];
        if (count($parts) > 0) {
            foreach ($parts as $part_key => $part) {
                switch ($part) {
                    // case 'type':
                    //     $parts_queries += array($part => function ($query) use ($request, $part) {
                    //         // $query->where(function ($query) use ($request) {
                    //         //     $query->where("kk_cup_user_id", Auth::user()->kk_user_id);
                    //         //     if (isset($request->course_users_progress_status)) {
                    //         //         $query->where("kk_cup_status", $request->course_users_progress_status);
                    //         //     }
                    //         // });
                    //     });
                    //     break;
                }
            }
        }

        $parts_to_count_queries = [];
        if (count($parts_to_count) > 0) {
            foreach ($parts_to_count as $part_key => $part) {
                switch ($part) {
                }
            }
        }
        $params = (object) array(
            'parts' => $parts_queries,
            'parts_to_count' => $parts_to_count_queries,
            'where' => function ($query) use ($request) {
                // if (isset($request->course_published)) $query->where("kk_course_published", $request->course_published);
                // if (isset($request->kk_course_autor_id)) $query->where("kk_course_autor_id", $request->kk_course_autor_id);

            },
        );
        return $params;
    }
}
