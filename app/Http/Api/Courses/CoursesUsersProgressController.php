<?php

namespace App\Http\Api\Courses;


use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\KK_Courses_Users_Progress;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class CoursesUsersProgressController extends Controller
{
    public function add(Request $request)
    {
        $user = Auth::user();
        if (empty($request->kk_cup_course_id)) return response()->json(['message' => env('RESPONSE_MISSING_DATA')], 400);
        $cup = KK_Courses_Users_Progress::where([['kk_cup_user_id', '=', $user->kk_user_id], ['kk_cup_course_id', '=', $request->kk_cup_course_id]])->first();
        if (!empty($cup)) return response()->json(['message' => "Вы уже проходите данный курс!"], 400);
        KK_Courses_Users_Progress::create([
            'kk_cup_user_id' => $user->kk_user_id,
            'kk_cup_course_id' => $request->kk_cup_course_id,
            'kk_cup_status' => 'inprocess',
        ]);
        $course = KK_Courses_Users_Progress::where([['kk_cup_user_id', '=', $user->kk_user_id], ['kk_cup_course_id', '=', $request->kk_cup_course_id]])->first();
        return response()->json(['message' => env('RESPONSE_CREATE_SUCCESS'), 'course' => $course], 200);
    }
    public function edit(Request $request)
    {
        $user = Auth::user();
        if (empty($request->kk_cup_id)) return response()->json(['message' => env('RESPONSE_MISSING_DATA')], 400);
        $cup = KK_Courses_Users_Progress::where([['kk_cup_user_id', '=', $user->kk_user_id], ['kk_cup_id', '=', $request->kk_cup_id]])->first();
        if (empty($cup)) return response()->json(['message' => "Вы еще не проходите данный курс!"], 400);
        KK_Courses_Users_Progress::where([['kk_cup_id', '=', $request->kk_cup_id]])->update([
            'kk_cup_status' => $request->kk_lup_status,
            'kk_cup_finished_at' => !empty($request->kk_lup_status) && $request->kk_lup_status === 'finished' ? Carbon::now() : null,
        ]);
        $lesson_user_progress = KK_Courses_Users_Progress::where([['kk_cup_id', '=', $request->kk_cup_id]])->first();
        return response()->json(['message' => env('RESPONSE_UPDATE_SUCCESS'), 'course' => $lesson_user_progress], 200);
    }
    public function remove(Request $request)
    {
        $user = Auth::user();
        if (empty($request->kk_cup_id)) return response()->json(['message' => "Пожалуйста выберите проходимый курс."], 400);
        $cup = KK_Courses_Users_Progress::where([['kk_cup_user_id', '=', $user->kk_user_id], ['kk_cup_id', '=', $request->kk_cup_id]])->first();
        if (empty($cup)) return response()->json(['message' => "Прохождение курса с таким ID не найдено!"], 400);
        KK_Courses_Users_Progress::where([['kk_cup_user_id', '=', $user->kk_user_id], ['kk_cup_id', '=', $request->kk_cup_id]])->delete();
        return response()->json(['message' => env('RESPONSE_DELETE_SUCCESS')], 200);
    }
    public function getAll(Request $request)
    {
        $user = Auth::user();
        $params = KK_Courses_Users_Progress::Params($request);
        $courses = KK_Courses_Users_Progress::with($params->parts)->withCount($params->parts_to_count)->where($params->where)->where([['kk_cup_user_id', '=', $user->kk_user_id]])->orderBy('kk_cup_started_at', 'DESC')->get();
        if ($courses->count() === 0) return response()->json(['message' => "Вы пока что не начали проходить ни один из курсов. "], 400);
        return response()->json(['message' => env('RESPONSE_SUCCESS'), 'courses' => $courses], 200);
    }
    public function getOneByCourseId(Request $request)
    {
        if (empty($request->kk_cup_course_id)) return response()->json(['message' => "Пожалуйста выберите курс."], 400);
        $user = Auth::user();
        $params = KK_Courses_Users_Progress::Params($request);
        $course = KK_Courses_Users_Progress::with($params->parts)->withCount($params->parts_to_count)->where($params->where)->where([['kk_cup_user_id', '=', $user->kk_user_id], ['kk_cup_course_id', '=', $request->kk_cup_course_id]])->first();
        if (empty($course)) return response()->json(['message' => "Вы пока что не начали этот курс."], 400);
        return response()->json(['message' => env('RESPONSE_SUCCESS'), 'course' => $course], 200);
    }
}
