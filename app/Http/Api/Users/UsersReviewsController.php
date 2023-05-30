<?php

namespace App\Http\Api\Users;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\KK_Users_Reviews;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\File;

class UsersReviewsController extends Controller
{
    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'kk_ur_course_id'   => ['nullable', 'numeric'],
            'kk_ur_lesson_id'   => ['nullable', 'numeric'],
            'kk_ur_assessment'  => ['required', 'numeric', 'between:0,5'],
            'kk_ur_text'        => ['nullable', 'string', 'max:500'],
        ]);
        if ($validator->fails())  return response()->json(['success' => false, 'message' => 'Ошибка валидации!', 'data' => $validator->errors()], 422);

        $kk_ur_id = KK_Users_Reviews::insertGetId([
            'kk_ur_course_id'   => $request->kk_ur_course_id,
            'kk_ur_lesson_id'   => $request->kk_ur_lesson_id,
            'kk_ur_user_id'     => Auth::user()->kk_user_id,
            'kk_ur_assessment'  => $request->kk_ur_assessment,
            'kk_ur_text'        => $request->kk_ur_text,
        ]);
        $ur = KK_Users_Reviews::where(['kk_ur_id' => $kk_ur_id])->first();

        return response()->json(['message' => 'Спасибо за ваш отзыв!', 'ur' => $ur], 200);
    }

    public function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'kk_ur_id'          => ['required', 'numeric'],
            'kk_ur_course_id'   => ['nullable', 'numeric'],
            'kk_ur_lesson_id'   => ['nullable', 'numeric'],
            'kk_ur_assessment'  => ['required', 'numeric', 'between:0,5'],
            'kk_ur_text'        => ['nullable', 'string', 'max:500'],
        ]);
        if ($validator->fails())  return response()->json(['success' => false, 'message' => 'Ошибка валидации!', 'data' => $validator->errors()], 422);

        $ur = KK_Users_Reviews::where(['kk_ur_id' => $request->kk_ur_id])->first();
        if (empty($ur)) return response()->json(['message' => 'Отзыв с таким ID не существует!'], 400);

        $ur->update([
            'kk_ur_course_id'   => $request->kk_ur_course_id,
            'kk_ur_lesson_id'   => $request->kk_ur_lesson_id,
            'kk_ur_user_id'     => Auth::user()->kk_user_id,
            'kk_ur_assessment'  => $request->kk_ur_assessment,
            'kk_ur_text'        => $request->kk_ur_text,
        ]);

        return response()->json(['message' => env('RESPONSE_UPDATE_SUCCESS'), 'ur' => $ur], 200);
    }

    public function delete(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'kk_ur_id' => ['required', 'numeric'],
        ]);
        if ($validator->fails())  return response()->json(['success' => false, 'message' => 'Ошибка валидации!', 'data' => $validator->errors()], 422);
        $ur = KK_Users_Reviews::where(['kk_ur_id' => $request->kk_ur_id])->first();
        if (empty($ur)) return response()->json(['message' => 'Отзыв с таким ID не существует!'], 400);
        $ur->delete();
        return response()->json(['message' => env('RESPONSE_DELETE_SUCCESS'), 'ur' => $ur], 200);
    }

    public function getAll(Request $request)
    {
        $params = KK_Users_Reviews::Params($request);
        $urs = KK_Users_Reviews::with($params->parts)->withCount($params->parts_to_count)->where($params->where)->orderBy('kk_ur_created_at', 'DESC')->get();

        return response()->json(['message' => env('RESPONSE_SUCCESS'), 'urs' => $urs], 200);
    }

    public function getOneById(Request $request)
    {
        if (empty($request->kk_ur_id)) return response()->json(['message' => env('RESPONSE_MISSING_DATA'),], 400);
        $params = KK_Users_Reviews::Params($request);
        $ur = KK_Users_Reviews::with($params->parts)->withCount($params->parts_to_count)->where([['kk_ur_id', '=', $request->kk_ur_id]])->where($params->where)->first();

        return response()->json(['message' => env('RESPONSE_SUCCESS'), 'ur' => $ur], 200);
    }


}
