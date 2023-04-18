<?php

namespace App\Http\Api\Courses\Lessons;

use App\Classes\RequestHelper;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\KK_Lessons;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\File;

class LessonsController extends Controller
{

    public function add(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'kk_lesson_course_id' => ['required', 'string'],
            'kk_lesson_name' => ['required', 'string', 'max:255'],
            'kk_lesson_description' => ['required', 'string', 'nullable'],
            'kk_lesson_text' => ['required', 'string', 'nullable'],
            'kk_lesson_audio' => ['nullable'],
        ]);

        if ($validator->fails())  return response()->json(['success' => false, 'message' => 'Ошибка валидации!', 'data' => $validator->errors()], 422);

        $lesson = KK_Lessons::where(['kk_lesson_course_id' => $request->kk_lesson_course_id, 'kk_lesson_name' => $request->kk_lesson_name])->first();
        if (!empty($lesson)) return response()->json(['message' => 'Урок с таким названием уже существует в данном курсе!'], 400);

        $kk_lesson_audio = RequestHelper::saveAudio($request, 'kk_lesson_audio', 'courses');

        $max_lesson_number =  KK_Lessons::where(['kk_lesson_course_id' => $request->kk_lesson_course_id])->max('kk_lesson_number');
        $kk_lesson_id = KK_Lessons::insertGetId([
            'kk_lesson_course_id' => $request->kk_lesson_course_id,
            'kk_lesson_autor_id' => Auth::user()->kk_user_id,
            'kk_lesson_number' => $max_lesson_number + 1,
            'kk_lesson_published' => 1,
            'kk_lesson_name' => $request->kk_lesson_name,
            'kk_lesson_description' => $request->kk_lesson_description,
            'kk_lesson_text' => $request->kk_lesson_text,
            'kk_lesson_audio' => $kk_lesson_audio,
        ]);
        $lesson = KK_Lessons::where(['kk_lesson_id' => $kk_lesson_id])->first();


        return response()->json(['message' => env('RESPONSE_CREATE_SUCCESS'), 'lesson' => $lesson], 200);
    }

    public function edit(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'kk_lesson_id' => ['required'],
            'kk_lesson_course_id' => ['required', 'string'],
            'kk_lesson_name' => ['required', 'string', 'max:255'],
            'kk_lesson_description' => ['required', 'string', 'nullable'],
            'kk_lesson_text' => ['required', 'string', 'nullable'],
            'kk_lesson_audio' => ['nullable'],
        ]);
        if ($validator->fails())  return response()->json(['success' => false, 'message' => 'Ошибка валидации!', 'data' => $validator->errors()], 422);

        $lesson = KK_Lessons::where(['kk_lesson_id' => $request->kk_lesson_id])->first();
        if (empty($lesson)) return response()->json(['message' => 'Урок с таким ID не существует!'], 400);

        if ($request->hasFile('kk_lesson_audio')) $kk_lesson_audio = RequestHelper::saveAudio($request, 'kk_lesson_audio', 'courses');
        else $kk_lesson_audio = $request->kk_lesson_audio;

        // $max_lesson_number =  KK_Lessons::where(['kk_lesson_course_id' => $request->kk_lesson_course_id])->max('kk_lesson_number');
        KK_Lessons::where(['kk_lesson_id' => $request->kk_lesson_id])->update([
            'kk_lesson_course_id' => $request->kk_lesson_course_id,
            // 'kk_lesson_autor_id' => Auth::user()->kk_user_id,
            // 'kk_lesson_number' => $max_lesson_number+1,
            'kk_lesson_published' => 1,
            'kk_lesson_name' => $request->kk_lesson_name,
            'kk_lesson_description' => $request->kk_lesson_description,
            'kk_lesson_text' => $request->kk_lesson_text,
            'kk_lesson_audio' => $kk_lesson_audio,
        ]);
        $lesson = KK_Lessons::where(['kk_lesson_id' => $request->kk_lesson_id])->first();

        return response()->json(['message' => env('RESPONSE_UPDATE_SUCCESS'), 'lesson' => $lesson], 200);
    }


    public function remove(Request $request)
    {
        if (empty($request->kk_lesson_id)) return response()->json(['message' => env('RESPONSE_MISSING_DATA')], 400);
        $lesson = KK_Lessons::where(['kk_lesson_id' => $request->kk_lesson_id])->first();
        if (empty($lesson)) return response()->json(['message' => 'Такой урок не существует!'], 400);

        KK_Lessons::where(['kk_lesson_id' => $request->kk_lesson_id])->delete();
        return response()->json(['message' => env('RESPONSE_DELETE_SUCCESS')], 200);
    }

    // public function getAll(Request $request)
    // {
    //     $params = KK_Lessons::Params($request);
    //     $courses = KK_Lessons::with($params->parts)->withCount($params->parts_to_count)->where($params->where)->orderBy('kk_course_updated_at', 'DESC')->get();

    //     return response()->json(['message' => env('RESPONSE_SUCCESS'), 'courses' => $courses], 200);
    // }

    public function getAllByCourseId(Request $request)
    {
        if (empty($request->kk_lesson_course_id)) return response()->json(['message' => env('RESPONSE_MISSING_DATA'),], 400);
        $params = KK_Lessons::Params($request);
        $lessons = KK_Lessons::with($params->parts)->withCount($params->parts_to_count)->where([['kk_lesson_course_id', '=', $request->kk_lesson_course_id]])->where($params->where)->orderBy('kk_lesson_number')->get();

        return response()->json(['message' => env('RESPONSE_SUCCESS'), 'lessons' => $lessons], 200);
    }

    public function getFirstByCourseId(Request $request)
    {
        if (empty($request->kk_lesson_course_id)) return response()->json(['message' => env('RESPONSE_MISSING_DATA'),], 400);
        $params = KK_Lessons::Params($request);
        $lesson = KK_Lessons::with($params->parts)->withCount($params->parts_to_count)->where([['kk_lesson_course_id', '=', $request->kk_lesson_course_id], ['kk_lesson_number', '=', 1]])->where($params->where)->first();

        return response()->json(['message' => env('RESPONSE_SUCCESS'), 'lesson' => $lesson], 200);
    }

    public function getOneByLessonId(Request $request)
    {
        if (empty($request->kk_lesson_id)) return response()->json(['message' => env('RESPONSE_MISSING_DATA'),], 400);

        $params = KK_Lessons::Params($request);
        $lesson = KK_Lessons::with($params->parts)->withCount($params->parts_to_count)->where([['kk_lesson_id', '=', $request->kk_lesson_id]])->where($params->where)->first();
        if (!auth('sanctum')->check() && $lesson->kk_lesson_number > 3) return response()->json(['message' => 'Чтобы получить доступ к остальным урокам, пожалуйста, пройдите регистрацию!',], 400);
        return response()->json(['message' => env('RESPONSE_SUCCESS'), 'lesson' => $lesson], 200);
    }
}
