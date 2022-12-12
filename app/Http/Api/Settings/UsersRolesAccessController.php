<?php

namespace App\Http\Api\Settings;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Mail\ResetPassword;
use App\Models\KK_Courses;
use App\Models\KK_Modules;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use App\Models\KK_User;
use App\Models\KK_Users_Roles;
use App\Models\KK_Users_Roles_Access;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class UsersRolesAccessController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function add(Request $request)
    {
        if (empty($request->kk_ura_role_id) || empty($request->kk_ura_module_id)) return response()->json(['message' => env('RESPONSE_MISSING_DATA')], 400);
        $kk_users_roles_access = KK_Users_Roles_Access::where([['kk_ura_role_id', '=', $request->kk_ura_role_id], ['kk_ura_module_id', '=', $request->kk_ura_module_id]])->first();
        if (!empty($kk_users_roles_access)) return response()->json(['message' => 'Доступ уже существует!', $kk_users_roles_access], 400);
        $kk_ura_id = KK_Users_Roles_Access::insertGetId([
            'kk_ura_role_id' => $request->kk_ura_role_id,
            'kk_ura_module_id' => $request->kk_ura_module_id
        ]);
        $kk_users_roles_access = KK_Users_Roles_Access::where(['kk_ura_id' => $kk_ura_id])->first();
        return response()->json(['message' => env('RESPONSE_CREATE_SUCCESS'), 'kk_users_roles_access' => $kk_users_roles_access], 200);
    }
    public function edit(Request $request)
    {
        if (empty($request->kk_ura_id)) return response()->json(['message' => env('RESPONSE_MISSING_DATA')], 400);
        $kk_users_roles_access = KK_Users_Roles_Access::where(['kk_ura_id' => $request->kk_ura_id])->first();
        if (empty($kk_users_roles_access)) return response()->json(['message' => 'Доступ не существует!', $kk_users_roles_access], 400);
        
        $kk_ura_id = KK_Users_Roles_Access::where(['kk_ura_id' => $request->kk_ura_id])->update([
            'kk_ura_create_access' => !empty($request->kk_ura_create_access) && $request->kk_ura_create_access == 1 ? $request->kk_ura_create_access : 0,
            'kk_ura_read_access' => !empty($request->kk_ura_read_access) && $request->kk_ura_read_access == 1 ? $request->kk_ura_read_access : 0,
            'kk_ura_full_read_access' => !empty($request->kk_ura_full_read_access) && $request->kk_ura_full_read_access == 1 ? $request->kk_ura_full_read_access : 0,
            'kk_ura_update_access' => !empty($request->kk_ura_update_access) && $request->kk_ura_update_access == 1 ? $request->kk_ura_update_access : 0,
            'kk_ura_delete_access' => !empty($request->kk_ura_delete_access) && $request->kk_ura_delete_access == 1 ? $request->kk_ura_delete_access : 0,
        ]);
        
        $kk_users_roles_access = KK_Users_Roles_Access::where(['kk_ura_id' => $request->kk_ura_id])->first();
        return response()->json(['message' => env('RESPONSE_UPDATE_SUCCESS'), 'kk_users_roles_access' => $kk_users_roles_access], 200);
    }
    public function remove(Request $request)
    {
        if (empty($request->kk_ura_id)) return response()->json(['message' => env('RESPONSE_MISSING_DATA')], 400);
        $kk_users_roles_access = KK_Users_Roles_Access::where(['kk_ura_id' => $request->kk_ura_id])->first();
        if (empty($kk_users_roles_access)) return response()->json(['message' => 'Доступ не существует!', $kk_users_roles_access], 400);
        
        KK_Users_Roles_Access::where(['kk_ura_id' => $request->kk_ura_id])->delete();
        $module = KK_Modules::where(['kk_module_id'=>$kk_users_roles_access->kk_ura_module_id])->first();
        return response()->json(['message' => env('RESPONSE_DELETE_SUCCESS'), 'module'=>$module], 200);
    }
}
