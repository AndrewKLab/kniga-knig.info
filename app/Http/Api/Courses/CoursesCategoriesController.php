<?php

namespace App\Http\Api\Courses;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\KK_Courses_Categories;


class CoursesCategoriesController extends Controller
{

    public function getAll(Request $request)
    {
        $params = KK_Courses_Categories::Params($request);
        $categories = KK_Courses_Categories::with($params->parts)->withCount($params->parts_to_count)->where($params->where)->get();

        return response()->json(['message' => env('RESPONSE_SUCCESS'), 'categories' => $categories], 200);
    }

    public function getOneByCategoryId(Request $request)
    {
        if (empty($request->kk_cc_id)) return response()->json(['message' => env('RESPONSE_MISSING_DATA')], 400);

        $params = KK_Courses_Categories::Params($request);
        $category = KK_Courses_Categories::with($params->parts)->withCount($params->parts_to_count)->where(['kk_cc_id' => $request->kk_cc_id])->where($params->where)->first();

        return response()->json(['message' => env('RESPONSE_SUCCESS'), 'category' => $category], 200);
    }
}
