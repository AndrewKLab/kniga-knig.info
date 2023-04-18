<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Classes\RequestHelper;
use App\Notifications\UserRegistered;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\Notification;

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
        'kk_user_pastor_id',
        'kk_user_teather_id',
        'kk_user_promouter_id',
        'kk_user_avatar',
    ];

    // public static function boot(){
    //     parent::boot();
    //     static::created(function($model){
    //         $users = KK_User::with([])->whereHas('role', function($query){
    //             $query->where([['kk_role_level','<', 6 ]]);
    //         })->get();
    //         foreach ($users as $user) {
    //             $user->notify(new UserRegistered('Hello World'));
    //         }


    //         // Notification::send($users, new UserRegistered($model));
    //     });
    // }

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
                switch ($part) {
                    case 'role':
                        $parts_queries += array($part => function ($query) use ($request, $part) {
                        });
                        break;
                    case 'admin':
                        $parts_queries += array($part => function ($query) use ($request, $part) {
                        });
                    case 'coordinator':
                        $parts_queries += array($part => function ($query) use ($request, $part) {
                        });
                    case 'pastor':
                        $parts_queries += array($part => function ($query) use ($request, $part) {
                        });
                    case 'teather':
                        $parts_queries += array($part => function ($query) use ($request, $part) {
                        });
                    case 'teather':
                        $parts_queries += array($part => function ($query) use ($request, $part) {
                        });
                    case 'promouter':
                        $parts_queries += array($part => function ($query) use ($request, $part) {
                        });
                        break;
                    case 'courses_user_progress':
                        $parts_queries += array($part => function ($query) use ($request, $parts, $parts_to_count) {
                            $with = [];
                            $withCount = [];

                            if (in_array('course', $parts)) {
                                $with += array('course' => function ($query) use ($request, $with, $parts, $parts_to_count) {
                                    if (isset($request->course_published)) $query->where("kk_course_published", $request->course_published);

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
                                            $query->where(['kk_lup_user_id' => $request->kk_user_id]);
                                        });
                                    }
                                    if (in_array('lessons_users_progress', $parts_to_count)) {
                                        $withCount += array('lessons_users_progress' => function ($query) use ($request, $withCount) {
                                            if (isset($request->lessons_users_progress_status)) {
                                                $query->where("kk_lup_status", $request->lessons_users_progress_status);
                                            }
                                            $query->where(['kk_lup_user_id' => $request->kk_user_id]);
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
                    case 'course_user_progress':
                        $parts_queries += array($part => function ($query) use ($request, $parts, $parts_to_count) {
                            $with = [];
                            $withCount = [];

                            if (in_array('course', $parts)) {
                                $with += array('course' => function ($query) use ($request, $with, $parts, $parts_to_count) {
                                    if (isset($request->course_published)) $query->where("kk_course_published", $request->course_published);

                                    $with = [];
                                    $withCount = [];
                                    if (in_array('lessons', $parts)) {
                                        $with += array('lessons' => function ($query) use ($request, $with, $parts) {
                                            $with = [];

                                            if (isset($request->lessons_published)) $query->where("kk_lesson_published", $request->lessons_published);
                                            if (in_array('lesson_users_progress', $parts)) {
                                                $with += array('lesson_users_progress' => function ($query) use ($request, $with, $parts) {
                                                    if (!empty($request->kk_user_id)) $query->where(['kk_lup_user_id' => $request->kk_user_id]);
                                                });
                                            }
                                            $query->with($with)->where(function ($query) use ($request, $parts) {
                                            });
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
                                            $query->where(['kk_lup_user_id' => $request->kk_user_id]);
                                        });
                                    }
                                    if (in_array('lessons_users_progress', $parts_to_count)) {
                                        $withCount += array('lessons_users_progress' => function ($query) use ($request, $withCount) {
                                            if (isset($request->lessons_users_progress_status)) {
                                                $query->where("kk_lup_status", $request->lessons_users_progress_status);
                                            }
                                            $query->where(['kk_lup_user_id' => $request->kk_user_id]);
                                        });
                                    }

                                    $query->with($with)->where(function ($query) use ($request, $parts) {
                                        if (isset($request->course_published)) $query->where("kk_course_published", $request->course_published);
                                    });
                                    $query->withCount($withCount)->where(function ($query) use ($request, $parts_to_count) {
                                        if (isset($request->course_published)) $query->where("kk_course_published", $request->course_published);
                                    });
                                });
                            }

                            $query->with($with)->where(function ($query) use ($request, $parts) {
                                if (isset($request->course_published)) $query->where("kk_course_published", $request->course_published);
                                if (isset($request->kk_course_id)) $query->where("kk_cup_course_id", $request->kk_course_id);
                            });
                            $query->withCount($withCount)->where(function ($query) use ($request, $parts_to_count) {
                                if (isset($request->course_published)) $query->where("kk_course_published", $request->course_published);
                                if (isset($request->kk_course_id)) $query->where("kk_cup_course_id", $request->kk_course_id);
                            });
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
                if (isset($request->with_all_my_users) && isset($request->kk_user_id)) $query->where(function ($query) use ($request) {
                    $query->orWhere([['kk_user_admin_id', '=', $request->kk_user_id]])
                        ->orWhere([['kk_user_coordinator_id', '=', $request->kk_user_id]])
                        ->orWhere([['kk_user_pastor_id', '=', $request->kk_user_id]])
                        ->orWhere([['kk_user_teather_id', '=', $request->kk_user_id]])
                        ->orWhere([['kk_user_promouter_id', '=', $request->kk_user_id]]);
                });

                // if (isset($request->kk_course_id)) $query->where("kk_lesson_course_id", $request->kk_course_id);

            },
        );
        return $params;
    }

    public function role()
    {
        return $this->hasOne(KK_Users_Roles::class, 'kk_role_id', 'kk_user_role_id');
    }
    public function admin()
    {
        return $this->hasOne(KK_User::class, 'kk_user_id', 'kk_user_admin_id');
    }
    public function coordinator()
    {
        return $this->hasOne(KK_User::class, 'kk_user_id', 'kk_user_coordinator_id');
    }
    public function pastor()
    {
        return $this->hasOne(KK_User::class, 'kk_user_id', 'kk_user_pastor_id');
    }
    public function teather()
    {
        return $this->hasOne(KK_User::class, 'kk_user_id', 'kk_user_teather_id');
    }
    public function promouter()
    {
        return $this->hasOne(KK_User::class, 'kk_user_id', 'kk_user_promouter_id');
    }
    public function courses_user_progress()
    {
        return $this->hasMany(KK_Courses_Users_Progress::class, 'kk_cup_user_id', 'kk_user_id');
    }
    public function course_user_progress()
    {
        return $this->hasOne(KK_Courses_Users_Progress::class, 'kk_cup_user_id', 'kk_user_id');
    }
}
