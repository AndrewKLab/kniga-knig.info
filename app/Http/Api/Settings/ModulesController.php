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
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class ModulesController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function getAll(Request $request)
    {
        $params = KK_Modules::Params($request);
        $modules = KK_Modules::with($params->parts)->withCount($params->parts_to_count)->where($params->where)->get();

        return response()->json(['message' => env('RESPONSE_SUCCESS'), 'modules' => $modules], 200);
    }
}
