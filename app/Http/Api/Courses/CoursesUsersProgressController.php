<?php

namespace App\Http\Api\Courses;


use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\PdfGeneratorController;
use App\Mail\DiplomCourse;
use App\Mail\DiplomCourseOrder;
use App\Mail\Reminder;
use App\Mail\YourFinishedCUP;
use App\Mail\YourNewCUP;
use App\Models\KK_Courses;
use App\Models\KK_Courses_Users_Progress;
use App\Models\KK_Lessons;
use App\Models\KK_User;
use App\Notifications\CourseFinished;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

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

        // if ($user->kk_user_email) {
        //     $course = KK_Courses::where(['kk_course_id' => $request->kk_cup_course_id])->first();
        //     Mail::to($user->kk_user_email)->send(new YourNewCUP((object) [
        //         "body" => 'Спасибо что начали проходить курс "' . $course->kk_course_name . '"! Желаем вам успехов в прохождении!',
        //     ]));
        // }
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
            Mail::to($user->kk_user_email)->send(new YourFinishedCUP($user, $course));
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
    public static function getAll(Request $request)
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

    public function update_cup_need_notify(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'kk_cup_id' => ['required'],
            'kk_cup_need_notify' => ['required'],
        ]);
        if ($validator->fails())  return response()->json(['success' => false, 'message' => 'Ошибка валидации!', 'data' => $validator->errors()], 422);

        $cup = KK_Courses_Users_Progress::where([['kk_cup_user_id', '=', Auth::user()->kk_user_id], ['kk_cup_id', '=', $request->kk_cup_id]])->first();
        if (empty($cup)) return response()->json(['message' => "Вы еще не проходите данный курс!"], 400);
        
        $cup->update([
            'kk_cup_need_notify' => $request->kk_cup_need_notify,
        ]);

        return response()->json(['message' => 'Запрос выполнен успешно.', 'cup' => $cup], 200);
    }

    public function send_course_diplom_to_email(Request $request)
    {
        if (empty($request->kk_cup_course_id)) return response()->json(['message' => "Пожалуйста выберите курс."], 400);
        $course = KK_Courses::where(['kk_course_id' => $request->kk_cup_course_id])->first();
        if (empty($course)) return response()->json(['message' => "Курса с таким ID не существует!"], 400);

        $user = Auth::user();
        $cup = KK_Courses_Users_Progress::where([['kk_cup_user_id', '=', $user->kk_user_id], ['kk_cup_course_id', '=', $request->kk_cup_course_id]])->first();
        if (empty($cup)) return response()->json(['message' => "Вы пока что не начали этот курс."], 400);
        if ($cup->kk_cup_status !== 'finished') return response()->json(['message' => "Вы пока что не закончили этот курс."], 400);

        $pdf_result = PdfGeneratorController::course_diplom($user, $course);

        if ($cup->kk_cup_status === 'finished' && $user->kk_user_email) Mail::to($user->kk_user_email)->send(new DiplomCourse($user, $course, $pdf_result));

        return response()->json(['message' => 'Ваш диплом был отправлен на электронную почту - ' . $user->kk_user_email . '.'], 200);
    }
    public function send_course_diplom_order(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'phonenumber' => ['string', 'max:255'],
            'region' => ['required', 'string', 'max:255'],
            'city' => ['required', 'string', 'max:255'],
            'street' => ['required', 'string', 'max:255'],
            'house' => ['required', 'string', 'max:255'],
            'apartment' => ['string', 'max:255'],
        ]);
        if ($validator->fails())  return response()->json(['success' => false, 'message' => 'Ошибка валидации!', 'data' => $validator->errors()], 422);

        if (empty($request->kk_cup_course_id)) return response()->json(['message' => "Пожалуйста выберите курс."], 400);
        $course = KK_Courses::where(['kk_course_id' => $request->kk_cup_course_id])->first();
        if (empty($course)) return response()->json(['message' => "Курса с таким ID не существует!"], 400);

        $user = Auth::user();
        $cup = KK_Courses_Users_Progress::where([['kk_cup_user_id', '=', $user->kk_user_id], ['kk_cup_course_id', '=', $request->kk_cup_course_id]])->first();
        if (empty($cup)) return response()->json(['message' => "Вы пока что не начали этот курс."], 400);
        if ($cup->kk_cup_status !== 'finished') return response()->json(['message' => "Вы пока что не закончили этот курс."], 400);

        $pdf_result = PdfGeneratorController::course_diplom($user, $course);

        if ($cup->kk_cup_status === 'finished' && $user->kk_user_email) Mail::to(config('mail.from.address'))->send(new DiplomCourseOrder($user, $course, (object)[
            'phonenumber' => $request->phonenumber,
            'region' => $request->region,
            'city' => $request->city,
            'street' => $request->street,
            'house' => $request->house,
            'apartment' => $request->apartment,
        ], $pdf_result));


        return response()->json(['message' => 'Ваш запрос на получение диплома был отправлен.'], 200);
    }

    public static function send_reminder(Request $request)
    {

        $users = KK_User::where([
            ['kk_user_offline_user', '=', 0],
            // ['kk_user_email', '!=', NULL],
            ['kk_user_email', '=', 'andrew.karganov@gmail.com'],
        ])->withWhereHas(
            'courses_user_progress',
            function ($query) {
                $query->where([
                    ['kk_cup_status', '=', 'inprocess'],
                    ['kk_cup_need_notify', '=', 1],
                ])->with(['course'])->withWhereHas('last_finished_lup', function ($query) {
                    $query->where([['kk_lup_finished_at', '<', now()->subDays(3)->endOfDay()]])->withWhereHas(
                        'lesson',
                        function ($query) {
                            $query->select('kk_lesson_id', 'kk_lesson_course_id', 'kk_lesson_number');
                        }
                    );
                });
            }
        )->get();


        foreach ($users as $key => $user) foreach ($user->courses_user_progress as $key => $cup) {
            $next_lesson = KK_Lessons::select('kk_lesson_id', 'kk_lesson_course_id', 'kk_lesson_number')->where(['kk_lesson_number' => $cup->last_finished_lup->lesson->kk_lesson_number + 1, 'kk_lesson_course_id' => $cup->last_finished_lup->lesson->kk_lesson_course_id])->first();
            if (!empty($next_lesson)) {
                Mail::to($user->kk_user_email)->send(new Reminder($user, $cup->last_finished_lup->lesson, $next_lesson, $user->courses_user_progress));
                KK_Courses_Users_Progress::where([['kk_cup_id', '=', $cup->kk_cup_id]])->update(['kk_cup_need_notify' => 0]);
            }
        }



        return response()->json(['message' => 'Email был отправлен.', 'us2ers' => count($users), 'users' => $users], 200);
    }
}
