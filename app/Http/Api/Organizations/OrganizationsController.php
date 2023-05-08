<?php

namespace App\Http\Api\Organizations;

use App\Classes\RequestHelper;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\KK_Organizations;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\File;

class OrganizationsController extends Controller
{

    public function getAll(Request $request)
    {
        $params = KK_Organizations::Params($request);
        $organizations = KK_Organizations::with($params->parts)->withCount($params->parts_to_count)->where($params->where)->get();

        return response()->json(['message' => env('RESPONSE_SUCCESS'), 'organizations' => $organizations], 200);
    }

    public function getOneById(Request $request)
    {
        if (empty($request->kk_organization_id)) return response()->json(['message' => env('RESPONSE_MISSING_DATA'),], 400);
        $params = KK_Organizations::Params($request);
        $organization = KK_Organizations::with($params->parts)->withCount($params->parts_to_count)->where($params->where)->where(['kk_organization_id' => $request->kk_organization_id])->first();

        return response()->json(['message' => env('RESPONSE_SUCCESS'), 'organization' => $organization], 200);
    }

    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'kk_organization_parrent_id' => ['integer'],
            'kk_organization_type_id' => ['required', 'integer'],
            'kk_organization_name' => ['required', 'string', 'max:255'],
        ]);
        if ($validator->fails())  return response()->json(['success' => false, 'message' => 'Ошибка валидации!', 'data' => $validator->errors()], 422);

        $organization = KK_Organizations::where(['kk_organization_name' => $request->kk_organization_name])->first();
        if (!empty($organization)) return response()->json(['message' => 'Организация с таким названием уже существует!'], 400);

        $organization = KK_Organizations::create([
            'kk_organization_parrent_id' => $request->kk_organization_parrent_id,
            'kk_organization_type_id' => $request->kk_organization_type_id,
            'kk_organization_name' => $request->kk_organization_name,
        ]);
        $organization = KK_Organizations::where(['kk_organization_id' => $organization->kk_organization_id])->first();

        return response()->json(['message' => env('RESPONSE_CREATE_SUCCESS'), 'organization' => $organization], 200);
    }

    public function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'kk_organization_id' => ['required', 'integer'],
            'kk_organization_parrent_id' => ['integer', 'nullable'],
            'kk_organization_type_id' => ['required', 'integer'],
            'kk_organization_name' => ['required', 'string', 'max:255'],
        ]);
        if ($validator->fails())  return response()->json(['success' => false, 'message' => 'Ошибка валидации!', 'data' => $validator->errors()], 422);

        $organization = KK_Organizations::where(['kk_organization_id' => $request->kk_organization_id])->first();
        if (empty($organization)) return response()->json(['message' => 'Организация с таким ID не найдена!'], 400);

        $organization->update([
            'kk_organization_parrent_id' => $request->kk_organization_parrent_id,
            'kk_organization_type_id' => $request->kk_organization_type_id,
            'kk_organization_name' => $request->kk_organization_name,
        ]);
        $organization = KK_Organizations::where(['kk_organization_id' => $organization->kk_organization_id])->first();

        return response()->json(['message' => env('RESPONSE_UPDATE_SUCCESS'), 'organization' => $organization], 200);
    }

    public function delete(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'kk_organization_id' => ['required', 'integer'],
        ]);
        if ($validator->fails())  return response()->json(['success' => false, 'message' => 'Ошибка валидации!', 'data' => $validator->errors()], 422);
        $organization = KK_Organizations::where(['kk_organization_id' => $request->kk_organization_id])->first();
        if (empty($organization)) return response()->json(['message' => 'Организация с таким ID не найдена!'], 400);
        $organization->delete();
        return response()->json(['message' => env('RESPONSE_DELETE_SUCCESS'), 'organization' => $organization], 200);
    }
}
