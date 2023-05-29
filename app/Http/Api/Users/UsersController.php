<?php

namespace App\Http\Api\Users;

use App\Classes\RequestHelper;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\KK_Courses;
use App\Models\KK_User;
use App\Models\KK_Users_Roles;
use App\Notifications\UserRegistered;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\File;

class UsersController extends Controller
{


    public function add(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'kk_user_firstname' => ['required', 'string', 'max:255'],
            'kk_user_lastname' => ['required', 'string', 'max:255'],
            'kk_user_middlename' => ['string', 'nullable', 'max:255'],
            'kk_user_phonenumber' => ['nullable', 'numeric', 'digits:10', 'unique:kk_users'],
            'kk_user_email' => ['required', 'string', 'email', 'max:255', 'unique:kk_users'],

            'kk_user_country' => ['string', 'nullable', 'max:255'],
            'kk_user_sity' => ['string', 'nullable', 'max:255'],
            'kk_user_commune' => ['string', 'nullable', 'max:255'],

            'kk_user_password' => ['required', 'string', 'min:6', 'confirmed'],
            'kk_user_access' => ['string', 'max:255'],
            'kk_user_offline_user' => ['string', 'nullable'],
            'kk_user_role_id' => ['numeric', 'nullable',],
            'kk_user_admin_id' => ['numeric', 'nullable',],
            'kk_user_coordinator_id' => ['numeric', 'nullable',],
            'kk_user_pastor_id' => ['numeric', 'nullable',],
            'kk_user_teather_id' => ['numeric', 'nullable',],
            'kk_user_promouter_id' => ['numeric', 'nullable',],

            'kk_user_avatar' => ['string', 'max:255'],
        ]);

        if ($validator->fails())  return response()->json(['success' => false, 'message' => 'Ошибка валидации!', 'data' => $validator->errors()], 422);

        $user = KK_User::create([
            'kk_user_firstname' => $request['kk_user_firstname'],
            'kk_user_lastname' => $request['kk_user_lastname'],
            'kk_user_middlename' => $request['kk_user_middlename'],
            'kk_user_phonenumber' => $request['kk_user_phonenumber'],
            'kk_user_email' => $request['kk_user_email'],
            'kk_user_country' => $request['kk_user_country'],
            'kk_user_sity' => $request['kk_user_sity'],
            'kk_user_commune' => $request['kk_user_commune'],
            'kk_user_password' => Hash::make($request['kk_user_password']),
            'kk_user_offline_user' => $request['kk_user_offline_user'] && $request['kk_user_offline_user'] === 'true' ? 1 : 0,
            'kk_user_role_id' => $request['kk_user_role_id'] ? $request['kk_user_role_id'] : 7,
            'kk_user_admin_id' => $request['kk_user_admin_id'],
            'kk_user_coordinator_id' => $request['kk_user_coordinator_id'],
            'kk_user_pastor_id' => $request['kk_user_pastor_id'],
            'kk_user_teather_id' => $request['kk_user_teather_id'],
            'kk_user_promouter_id' => $request['kk_user_promouter_id'],

        ]);

        return response()->json(['message' => env('RESPONSE_CREATE_SUCCESS'), 'user' => $user], 200);
    }

    public function edit(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'kk_user_id' => ['required'],
            'kk_user_firstname' => ['required', 'string', 'max:255'],
            'kk_user_lastname' => ['required', 'string', 'max:255'],
            'kk_user_middlename' => ['string', 'nullable', 'max:255'],
            'kk_user_phonenumber' => ['nullable', 'numeric', 'digits:10'],
            'kk_user_email' => ['required', 'string', 'email', 'max:255'],

            'kk_user_country' => ['string', 'nullable', 'max:255'],
            'kk_user_sity' => ['string', 'nullable', 'max:255'],
            'kk_user_commune' => ['string', 'nullable', 'max:255'],

            // 'kk_user_password' => ['required', 'string', 'min:6', 'confirmed'],
            'kk_user_access' => ['string', 'max:255'],
            'kk_user_offline_user' => ['string', 'nullable'],
            'kk_user_role_id' => ['numeric', 'nullable',],
            'kk_user_admin_id' => ['numeric', 'nullable',],
            'kk_user_coordinator_id' => ['numeric', 'nullable',],
            'kk_user_pastor_id' => ['numeric', 'nullable',],
            'kk_user_teather_id' => ['numeric', 'nullable',],
            'kk_user_promouter_id' => ['numeric', 'nullable',],

            'kk_user_avatar' => ['string', 'max:255'],
        ]);


        if ($validator->fails())  return response()->json(['success' => false, 'message' => 'Ошибка валидации!', 'data' => $validator->errors()], 422);

        $user = KK_User::where(['kk_user_id' => $request->kk_user_id])->first();
        if (empty($user)) return response()->json(['message' => 'Такой пользователь не существует!'], 400);

        KK_User::where(['kk_user_id' => $request->kk_user_id])->update([
            'kk_user_firstname' => $request['kk_user_firstname'],
            'kk_user_lastname' => $request['kk_user_lastname'],
            'kk_user_middlename' => $request['kk_user_middlename'],
            'kk_user_phonenumber' => $request['kk_user_phonenumber'],
            'kk_user_email' => $request['kk_user_email'],
            'kk_user_country' => $request['kk_user_country'],
            'kk_user_sity' => $request['kk_user_sity'],
            'kk_user_commune' => $request['kk_user_commune'],
            // 'kk_user_password' => Hash::make($request['kk_user_password']),
            'kk_user_offline_user' => $request['kk_user_offline_user'] && $request['kk_user_offline_user'] === 'true' ? 1 : 0,
            'kk_user_role_id' => $request['kk_user_role_id'] ? $request['kk_user_role_id'] : 7,
            'kk_user_admin_id' => $request['kk_user_admin_id'],
            'kk_user_coordinator_id' => $request['kk_user_coordinator_id'],
            'kk_user_pastor_id' => $request['kk_user_pastor_id'],
            'kk_user_teather_id' => $request['kk_user_teather_id'],
            'kk_user_promouter_id' => $request['kk_user_promouter_id'],
        ]);

        $user = KK_User::where(['kk_user_id' => $request->kk_user_id])->first();
        return response()->json(['message' => env('RESPONSE_UPDATE_SUCCESS'), 'user' => $user], 200);
    }

    public function remove(Request $request)
    {
        if (empty($request->kk_user_id)) return response()->json(['message' => env('RESPONSE_MISSING_DATA')], 400);
        $user = KK_User::where(['kk_user_id' => $request->kk_user_id])->first();
        if (empty($user)) return response()->json(['message' => 'Такой пользователь не существует!'], 400);

        KK_User::where(['kk_user_id' => $request->kk_user_id])->delete();
        return response()->json(['message' => env('RESPONSE_DELETE_SUCCESS')], 200);
    }

    public function getAll(Request $request)
    {
        $params = KK_User::Params($request);
        $users = KK_User::with($params->parts)->withCount($params->parts_to_count)->where($params->where)->get();

        return response()->json(['message' => env('RESPONSE_SUCCESS'), 'users' => $users], 200);
    }

    public function getAllByRoleId(Request $request)
    {
        if (empty($request->kk_user_role_id)) return response()->json(['message' => env('RESPONSE_MISSING_DATA'),], 400);
        $role = KK_Users_Roles::where(['kk_role_id' => $request->kk_user_role_id])->first();
        if (empty($role)) return response()->json(['message' => 'Такой роли не существует!',], 400);

        $user_role = KK_Users_Roles::where(['kk_role_id' => Auth::user()->kk_user_role_id])->first();
        if (empty($user_role)) return response()->json(['message' => 'Такой роли пользователя не существует!',], 400);

        if ($role->kk_role_level < $user_role->kk_role_level) return response()->json(['message' => env('RESPONSE_ACCESS_DENIED'),], 400);

        $params = KK_User::Params($request);
        $users = KK_User::with($params->parts)->withCount($params->parts_to_count)->where([['kk_user_role_id', '=', $request->kk_user_role_id]])->where($params->where)->orderBy('kk_user_lastname', 'DESC')->get();

        return response()->json(['message' => env('RESPONSE_SUCCESS'), 'users' => $users], 200);
    }
    public function getAllMyUsersByRoleId(Request $request)
    {
        if (empty($request->kk_user_role_id)) return response()->json(['message' => env('RESPONSE_MISSING_DATA'),], 400);
        $role = KK_Users_Roles::where(['kk_role_id' => $request->kk_user_role_id])->first();
        if (empty($role)) return response()->json(['message' => 'Такой роли не существует!',], 400);

        $user_role = KK_Users_Roles::where(['kk_role_id' => Auth::user()->kk_user_role_id])->first();
        if (empty($user_role)) return response()->json(['message' => 'Такой роли пользователя не существует!',], 400);

        if ($role->kk_role_level < $user_role->kk_role_level) return response()->json(['message' => env('RESPONSE_ACCESS_DENIED'),], 400);

        $params = KK_User::Params($request);
        $users = KK_User::with($params->parts)->withCount($params->parts_to_count)->where(function ($query) use ($request) {
            $query->where([['kk_user_role_id', '=', $request->kk_user_role_id]])->where(function ($query) use ($request) {
                $query->orWhere([['kk_user_admin_id', '=', isset($request->kk_user_id) ? $request->kk_user_id : Auth::user()->kk_user_id]])
                    ->orWhere([['kk_user_coordinator_id', '=', isset($request->kk_user_id) ? $request->kk_user_id : Auth::user()->kk_user_id]])
                    ->orWhere([['kk_user_pastor_id', '=', isset($request->kk_user_id) ? $request->kk_user_id : Auth::user()->kk_user_id]])
                    ->orWhere([['kk_user_teather_id', '=', isset($request->kk_user_id) ? $request->kk_user_id : Auth::user()->kk_user_id]])
                    ->orWhere([['kk_user_promouter_id', '=', isset($request->kk_user_id) ? $request->kk_user_id : Auth::user()->kk_user_id]]);
            });
        })->where($params->where)->orderBy('kk_user_lastname', 'DESC')->get();

        return response()->json(['message' => env('RESPONSE_SUCCESS'), 'users' => $users], 200);
    }
    public function getAllWithoutUserByRoleId(Request $request)
    {
        if (empty($request->kk_user_role_id)) return response()->json(['message' => env('RESPONSE_MISSING_DATA'),], 400);
        $role = KK_Users_Roles::where(['kk_role_id' => $request->kk_user_role_id])->first();
        if (empty($role)) return response()->json(['message' => 'Такой роли не существует!',], 400);

        $role_type = '';
        switch ($request->kk_user_role_id) {
            case 1:
                $role_type = 'kk_user_admin_id';
                break;
            case 2:
                $role_type = 'kk_user_admin_id';
                break;
            case 3:
                $role_type = 'kk_user_coordinator_id';
                break;
            case 8:
                $role_type = 'kk_user_pastor_id';
                break;
            case 4:
                $role_type = 'kk_user_teather_id';
                break;
            case 5:
                $role_type = 'kk_user_promouter_id';
                break;
            default:
                $role_type = '';
                break;
        }
        $params = KK_User::Params($request);
        $users = KK_User::with($params->parts)->withCount($params->parts_to_count)->where([[$role_type, '=', NULL]])->orWhere([[$role_type, '=', 0]])->where($params->where)->orderBy('kk_user_lastname', 'DESC')->get();

        return response()->json(['message' => env('RESPONSE_SUCCESS'), 'users' => $users], 200);
    }
    public function getOneByUserId(Request $request)
    {
        if (empty($request->kk_user_id)) return response()->json(['message' => env('RESPONSE_MISSING_DATA'),], 400);
        $params = KK_User::Params($request);
        $user = KK_User::with($params->parts)->withCount($params->parts_to_count)->where([['kk_user_id', '=', $request->kk_user_id]])->where($params->where)->first();

        return response()->json(['message' => env('RESPONSE_SUCCESS'), 'user' => $user], 200);
    }

    public function notify(Request $request)
    {
        $users = KK_User::with([])->whereHas('role', function ($query) {
            $query->where([['kk_role_level', '<', 6]]);
        })->get();
        foreach ($users as $user) {
            $user_n = KK_User::first();
            $user->notify(new UserRegistered($user_n));
        }
    }
}
