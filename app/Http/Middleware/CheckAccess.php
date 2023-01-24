<?php

namespace App\Http\Middleware;

use App\Models\KK_Modules;
use App\Models\KK_Users_Roles_Access;
use App\Providers\RouteServiceProvider;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CheckAccess
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next

     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next, $kk_module_name, $action)
    {

        $user = Auth::user();
        if (empty($user)) return response()->json(['message' => config('responce_answers.access_denied')], 401);
        $module = KK_Modules::where(['kk_module_name' => $kk_module_name])->first();
        if (empty($module)) return response()->json(['message' => 'Такого модуля не существует!'], 401);
        $kk_users_roles_access = KK_Users_Roles_Access::where([['kk_ura_role_id', '=', $user->kk_user_role_id], ['kk_ura_module_id', '=', $module->kk_module_id]])->first();
        if (empty($kk_users_roles_access)) return response()->json(['message' => config('responce_answers.access_denied')], 401);
        
        switch ($action) {
            case 'create':
                if ($kk_users_roles_access->kk_ura_create_access === 0) return response()->json(['message' => config('responce_answers.access_denied')], 401);
                break;
            case 'read':
                if ($kk_users_roles_access->kk_ura_read_access === 0) return response()->json(['message' => config('responce_answers.access_denied')], 401);
                break;
            case 'full_read':
                if ($kk_users_roles_access->kk_ura_full_read_access === 0) return response()->json(['message' => config('responce_answers.access_denied')], 401);
                break;
            case 'update':
                if ($kk_users_roles_access->kk_ura_update_access === 0) return response()->json(['message' => config('responce_answers.access_denied')], 401);
                break;
            case 'delete':
                if ($kk_users_roles_access->kk_ura_delete_access === 0) return response()->json(['message' => config('responce_answers.access_denied')], 401);
                break;

            default:
                return response()->json(['message' => 'Такого типа действия не существует!'], 401);
        }

        return $next($request);
    }
}
