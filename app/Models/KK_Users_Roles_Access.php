<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Classes\RequestHelper;
use Illuminate\Support\Facades\Auth;

class KK_Users_Roles_Access extends Model
{
    protected $table = 'kk_users_roles_access';
    protected $primaryKey = 'kk_ura_id';

    const CREATED_AT = 'kk_ura_created_at';
    const UPDATED_AT = 'kk_ura_updated_at'; 

    protected $fillable = [
        'kk_ura_role_id',
        'kk_ura_module_id',
        'kk_ura_create_access',
        'kk_ura_read_access',
        'kk_ura_full_read_access',
        'kk_ura_update_access',
        'kk_ura_delete_access',
    ];

}
