<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Classes\RequestHelper;
use Illuminate\Support\Facades\Auth;

class KK_Modules extends Model
{
    protected $table = 'kk_modules';
    protected $primaryKey = 'kk_module_id';

    const CREATED_AT = 'kk_module_created_at';
    const UPDATED_AT = 'kk_module_updated_at'; 

    protected $fillable = [
        'kk_module_name',
    ];


    public static function Params($request)
    {
        $parts = RequestHelper::parts($request->parts);
        $parts_to_count = RequestHelper::parts($request->parts_to_count);

        $parts_queries = [];
        if (count($parts) > 0) {
            foreach ($parts as $part_key => $part) {
                switch ($part) {
                    case 'kk_users_roles_access':
                        $parts_queries += array($part => function ($query) use ($request, $parts) {
                            $query->where(function ($query) use ($request) {
                                $query->where("kk_ura_role_id", $request->kk_ura_role_id);
                            });
                        });
                }
            }
        }

        $parts_to_count_queries = [];

        $params = (object) array(
            'parts' => $parts_queries,
            'parts_to_count' => $parts_to_count_queries,
            'where' => function ($query) use ($request, $parts) {
                // if (in_array('last_message', $parts)) $query->orderBy("kk_cm_created_at", 'asc');
                // if (isset($request->kk_course_id)) $query->where("kk_lesson_course_id", $request->kk_course_id);

            },
        );
        return $params;
    }

    public function kk_users_roles_access()
    {
        return $this->hasOne(KK_Users_Roles_Access::class, 'kk_ura_module_id', 'kk_module_id');         
    }
}
