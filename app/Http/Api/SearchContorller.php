<?php

namespace App\Http\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Mail\ResetPassword;
use App\Models\KK_Courses;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use App\Models\KK_User;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class SearchContorller extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function search(Request $request)
    {
        $validator = Validator::make($request->all(), ['search' => ['required', 'string',  'max:255']]);
        if ($validator->fails())  return response()->json(['success'   => false, 'message'   => 'Ошибка валидации!', 'data' => $validator->errors()], 422);

        $params = KK_Courses::Params($request);
        $courses = KK_Courses::with($params->parts)
            ->withCount($params->parts_to_count)
            ->where($params->where)
            ->where([['kk_course_name', 'LIKE', "%{$request->search}%"]])
            ->orderBy('kk_course_updated_at', 'DESC')
            ->get();

        if(count($courses) === 0) return response()->json(['message' => 'По запросу "'.$request->search.'" ничего не найдено!'], 400);
        return response()->json(['message' => env('RESPONSE_SUCCESS'), 'courses' => $courses], 200);
    }
}
