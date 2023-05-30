<?php

namespace App\Http\Api\Courses;


use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Mail\YourFinishedCUP;
use App\Mail\YourNewCUP;
use App\Models\KK_Courses;
use App\Models\KK_Courses_Users_Progress;
use App\Models\KK_User;
use App\Notifications\CourseFinished;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use Illuminate\Support\Facades\Mail;

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
        $cup = KK_Courses_Users_Progress::where([['kk_cup_user_id', '=', $user->kk_user_id], ['kk_cup_course_id', '=', $request->kk_cup_course_id]])->first();

        if ($user->kk_user_email) {
            $course = KK_Courses::where(['kk_course_id' => $request->kk_cup_course_id])->first();
            Mail::to($user->kk_user_email)->send(new YourNewCUP((object) [
                "body" => 'Спасибо что начали проходить курс "' . $course->kk_course_name . '"! Желаем вам успехов в прохождении!',
            ]));
        }
        return response()->json(['message' => env('RESPONSE_CREATE_SUCCESS'), 'course' => $cup], 200);
    }
    public function edit(Request $request)
    {
        $user = Auth::user();
        if (empty($request->kk_cup_id)) return response()->json(['message' => env('RESPONSE_MISSING_DATA')], 400);
        $cup = KK_Courses_Users_Progress::where([['kk_cup_user_id', '=', $user->kk_user_id], ['kk_cup_id', '=', $request->kk_cup_id]])->first();
        if (empty($cup)) return response()->json(['message' => "Вы еще не проходите данный курс!"], 400);

        $cup->update([
            'kk_cup_status' => $request->kk_lup_status,
            'kk_cup_finished_at' => !empty($request->kk_lup_status) && $request->kk_lup_status === 'finished' ? Carbon::now() : null,
        ]);

        if (!empty($request->kk_lup_status) && $request->kk_lup_status === 'finished' && $user->kk_user_email) {
            $course = KK_Courses::where(['kk_course_id' => $cup->kk_cup_course_id])->first();
            Mail::to($user->kk_user_email)->send(new YourFinishedCUP((object) [
                "body" => 'Спасибо что прошли курс "' . $course->kk_course_name . '"!',
            ]));
        }
        //Отправка уведомления
        if (!empty($request->kk_lup_status) && $request->kk_lup_status === 'finished' && !empty(Auth::user()->kk_user_teather_id)) {
            $target_user = KK_User::where([['kk_user_id', '=', Auth::user()->kk_user_teather_id]])->first();
            $target_users = KK_User::with(['role'])->whereHas('role', function ($query) {
                $query->where([['kk_role_level', '<', 3]]);
                if (!empty(Auth::user()->kk_user_teather_id)) $query->where([['kk_user_id', '!=', Auth::user()->kk_user_teather_id]]);
            })->get();
            $course = KK_Courses::where([['kk_course_id', '=', $cup->kk_cup_course_id]])->first();
            $message = null;

            if (!empty($course)) $message = 'Пользователь ' . Auth::user()->kk_user_lastname . ' ' . Auth::user()->kk_user_firstname . ' прошел курс "' . $course->kk_course_name . '".';
            if (!empty($message)) {
                if (!empty($target_user) && Auth::user()->kk_user_id !== $target_user->kk_user_id) $target_user->notify(new CourseFinished($cup, $message));
                if (!empty($target_users) && $target_users->count() > 0) foreach ($target_users as $tu) if (Auth::user()->kk_user_id !== $tu->kk_user_id) $tu->notify(new CourseFinished($cup, $message));
            }
        }

        return response()->json(['message' => env('RESPONSE_UPDATE_SUCCESS'), 'course' => $cup], 200);
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
