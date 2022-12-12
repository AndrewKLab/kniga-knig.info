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
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class UsersRolesController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function getAll(Request $request)
    {
        $params = KK_Users_Roles::Params($request);
        $roles = KK_Users_Roles::with($params->parts)->withCount($params->parts_to_count)->where($params->where)->orderBy('kk_role_level')->get();
        return response()->json(['message' => env('RESPONSE_SUCCESS'), 'roles' => $roles], 200);
    }
}
