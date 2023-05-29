<?php

namespace App\Http\Api\Organizations;

use App\Classes\RequestHelper;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\KK_Organizations;
use App\Models\KK_Organizations_Types;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\File;

class OrganizationsTypesController extends Controller
{
    public function getAll(Request $request)
    {
        $params = KK_Organizations_Types::Params($request);
        $ot = KK_Organizations_Types::with($params->parts)->withCount($params->parts_to_count)->where($params->where)->get();

        return response()->json(['message' => env('RESPONSE_SUCCESS'), 'ot' => $ot], 200);
    }
}