<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Classes\RequestHelper;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class KK_User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'kk_users';
    protected $primaryKey = 'kk_user_id';
    public static $defaultParts = ['role'];

    const CREATED_AT = 'kk_user_created_at';
    const UPDATED_AT = 'kk_user_updated_at'; 

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'kk_user_active',
        'kk_user_firstname',
        'kk_user_lastname',
        'kk_user_middlename',
        'kk_user_phonenumber',
        'kk_user_email',
        'kk_user_country',
        'kk_user_sity',
        'kk_user_commune',
        'kk_user_password',
        'kk_user_access',
        'kk_user_offline_user',
        'kk_user_role_id',
        'kk_user_admin_id',
        'kk_user_coordinator_id',
        'kk_user_teather_id',
        'kk_user_promouter_id',
        'kk_user_avatar',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'kk_user_password',
        'kk_user_remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'kk_user_email_verified_at' => 'datetime',
    ];

    public static function Params($request)
    {
        $parts = RequestHelper::parts($request->parts);
        $parts_to_count = RequestHelper::parts($request->parts_to_count);

        $parts_queries = [];
        if (count($parts) > 0) {
            foreach ($parts as $part_key => $part) {
                // switch ($part) {
                //     case 'course_users_progress':
                //         $parts_queries += array($part => function ($query) use ($request, $part) {
                //             $query->where(function ($query) use ($request) {
                //                 $query->where("kk_cup_user_id", Auth::user()->kk_user_id);
                //                 if (isset($request->course_users_progress_status)) {
                //                     $query->where("kk_cup_status", $request->course_users_progress_status);
                //                 }
                //             });
                //         });
                //         break;
                // }
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

    public function role()
    {
        return $this->hasOne(KK_Users_Roles::class, 'kk_role_id', 'kk_user_role_id');
    }
}
