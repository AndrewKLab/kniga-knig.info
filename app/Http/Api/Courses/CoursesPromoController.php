<?php

namespace App\Http\Api\Courses;

use App\Classes\RequestHelper;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\KK_Courses;
use App\Models\KK_Courses_Promo;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\File;

class CoursesPromoController extends Controller
{
    public function getOneById(Request $request)
    {
        if (empty($request->kk_cp_id)) return response()->json(['message' => env('RESPONSE_MISSING_DATA'),], 400);
        $params = KK_Courses_Promo::Params($request);
        $course_promo = KK_Courses_Promo::with($params->parts)->withCount($params->parts_to_count)->where([['kk_cp_id', '=', $request->kk_cp_id]])->where($params->where)->first();
        if (empty($course_promo)) return response()->json(['message' => 'Промо курса по вашему запросу не найдено!',], 404);

        return response()->json(['message' => env('RESPONSE_SUCCESS'), 'course_promo' => $course_promo], 200);
    }
}
