<?php

namespace App\Http\Api\Organizations;

use App\Classes\RequestHelper;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\KK_Organizations;
use App\Models\KK_Organizations_Types;
use App\Models\KK_Organizations_Users;
use App\Models\KK_User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\File;

class OrganizationsUsersController extends Controller
{
    // public function getAll(Request $request)
    // {
    //     $params = KK_Organizations_Types::Params($request);
    //     $ot = KK_Organizations_Types::with($params->parts)->withCount($params->parts_to_count)->where($params->where)->get();

    //     return response()->json(['message' => env('RESPONSE_SUCCESS'), 'ot' => $ot], 200);
    // }

    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'kk_ou_organization_id' => ['required', 'integer'],
            'kk_ou_user_id' => ['required', 'integer'],
        ]);
        if ($validator->fails())  return response()->json(['success' => false, 'message' => 'Ошибка валидации!', 'data' => $validator->errors()], 422);

        $ou = KK_Organizations_Users::where(['kk_ou_organization_id' => $request->kk_ou_organization_id, 'kk_ou_user_id' => $request->kk_ou_user_id,])->first();
        if (!empty($ou)) return response()->json(['message' => 'Данный пользователь уже состоит в этой организации!'], 400);

        $org = KK_Organizations::where(['kk_organization_id' => $request->kk_ou_organization_id])->first();
        if(empty($org)) return response()->json(['message' => 'Организация с таким ID не найдена!'], 400);

        $user = KK_User::where(['kk_user_id' => $request->kk_ou_user_id])->first();
        if(empty($user)) return response()->json(['message' => 'Пользователь с таким ID не найден!'], 400);

        $ou = KK_Organizations_Users::create([
            'kk_ou_organization_id' => $request->kk_ou_organization_id,
            'kk_ou_user_id' => $request->kk_ou_user_id,
        ]);
        $ou = KK_Organizations_Users::where(['kk_ou_id' => $ou->kk_ou_id])->first();

        return response()->json(['message' => env('RESPONSE_CREATE_SUCCESS'), 'ou' => $ou], 200);
    }

    public function delete(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'kk_ou_id' => ['required', 'integer'],
        ]);
        if ($validator->fails())  return response()->json(['success' => false, 'message' => 'Ошибка валидации!', 'data' => $validator->errors()], 422);
        $ou = KK_Organizations_Users::where(['kk_ou_id' => $request->kk_ou_id])->first();
        if (empty($ou)) return response()->json(['message' => 'Запись с таким ID не найдена!'], 400);
        $ou->delete();
        return response()->json(['message' => env('RESPONSE_DELETE_SUCCESS'), 'ou' => $ou], 200);
    }
}