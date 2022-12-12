<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Classes\RequestHelper;
use Illuminate\Support\Facades\Auth;

class KK_Chats extends Model
{
    protected $table = 'kk_chats';
    protected $primaryKey = 'kk_chat_id';

    const CREATED_AT = 'kk_chat_created_at';
    const UPDATED_AT = 'kk_chat_updated_at'; 

    protected $fillable = [
        'kk_chat_user_one_id',
        'kk_chat_user_two_id',
    ];

    public static function Params($request)
    {
        $parts = RequestHelper::parts($request->parts);
        $parts_to_count = RequestHelper::parts($request->parts_to_count);
        $user = Auth::user();

        $parts_queries = [];
        if (count($parts) > 0) {
            foreach ($parts as $part_key => $part) {
                switch ($part) {
                    case 'messages':
                        $parts_queries += array($part => function ($query) use ($request, $parts) {

                            // $query->where(function ($query) use ($request) {
                            //     $query->where("kk_cup_user_id", Auth::user()->kk_user_id);
                            //     if (isset($request->course_users_progress_status)) {
                            //         $query->where("kk_cup_status", $request->course_users_progress_status);
                            //     }
                            // });
                        });
                    case 'user_one':
                        $parts_queries += array('user_one' => function ($query) use ($request, $user) {
                            // $query->where([['kk_user_id', '!=', $user->kk_user_id]]);
                        });
                    case 'user_two':
                        $parts_queries += array('user_two' => function ($query) use ($request, $user) {
                            // $query->where([['kk_user_id', '!=', $user->kk_user_id]]);
                        });
                        break;
                    case 'last_message':
                        $parts_queries += array($part => function ($query) use ($request, $user) {
                            // $query->where([['kk_user_id', '!=', $user->kk_user_id]]);
                        });
                        break;
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

    public function user_one()
    {
        return $this->hasOne(KK_User::class, 'kk_user_id', 'kk_chat_user_one_id');         
    }
    public function user_two()
    {
        return $this->hasOne(KK_User::class, 'kk_user_id', 'kk_chat_user_two_id');         
    }
    public function last_message()
    {
        return $this->hasOne(KK_Chats_Messages::class, 'kk_cm_chat_id', 'kk_chat_id')->orderBy('kk_cm_created_at', 'desc');         
    }
    public function messages()
    {
        return $this->hasMany(KK_Chats_Messages::class, 'kk_cm_chat_id', 'kk_chat_id');         
    }
}
