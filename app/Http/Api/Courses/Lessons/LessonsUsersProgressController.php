<?php

namespace App\Http\Api\Courses\Lessons;


use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\KK_Courses;
use App\Models\KK_Lessons;
use App\Models\KK_Lessons_Users_Progress;
use App\Models\KK_Questions;
use App\Models\KK_Questions_Answers;
use App\Models\KK_Questions_Users_Answers;
use App\Models\KK_User;
use App\Notifications\LessonChecked;
use App\Notifications\LessonFinished;
use App\Notifications\LessonToCheck;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class LessonsUsersProgressController extends Controller
{
    public function add(Request $request)
    {
        $user = Auth::user();
        if (empty($request->kk_lup_cup_id) || empty($request->kk_lup_course_id) || empty($request->kk_lup_lesson_id)) return response()->json(['message' => env('RESPONSE_MISSING_DATA')], 400);
        $lup = KK_Lessons_Users_Progress::where([['kk_lup_user_id', '=', $user->kk_user_id], ['kk_lup_course_id', '=', $request->kk_lup_course_id], ['kk_lup_lesson_id', '=', $request->kk_lup_lesson_id]])->first();
        if (!empty($lup)) return response()->json(['message' => "Вы уже проходите данный урок!"], 400);
        KK_Lessons_Users_Progress::create([
            'kk_lup_cup_id' => $request->kk_lup_cup_id,
            'kk_lup_user_id' => $user->kk_user_id,
            'kk_lup_course_id' => $request->kk_lup_course_id,
            'kk_lup_lesson_id' => $request->kk_lup_lesson_id,
            'kk_lup_status' => 'inprocess',
        ]);
        $lesson = KK_Lessons_Users_Progress::where([['kk_lup_user_id', '=', $user->kk_user_id], ['kk_lup_course_id', '=', $request->kk_lup_course_id], ['kk_lup_lesson_id', '=', $request->kk_lup_lesson_id]])->first();
        return response()->json(['message' => env('RESPONSE_CREATE_SUCCESS'), 'lesson' => $lesson], 200);
    }
    public function edit(Request $request)
    {
        $user = Auth::user();
        if (!empty($request->kk_lup_user_id) && Auth::user()->role->kk_role_level < 6) $user = KK_User::where([['kk_user_id', '=', $request->kk_lup_user_id]])->first();

        if (empty($request->kk_lup_id)) return response()->json(['message' => env('RESPONSE_MISSING_DATA')], 400);

        $lup = KK_Lessons_Users_Progress::where([['kk_lup_id', '=', $request->kk_lup_id]])->first();
        if (empty($lup)) return response()->json(['message' => "Такого прохождения урока не найдено!"], 400);

        $lesson = KK_Lessons::where([['kk_lesson_id', '=', $lup->kk_lup_lesson_id]])->with(['questions' => function ($query) {
            $query->with(['answers']);
        }])->first();
        if (empty($lesson)) return response()->json(['message' => "Такого урока не найдено!"], 400);

        $has_text_question = false;

        if ($request->check_questions !== '0') {
            if ($lesson->questions && count($lesson->questions) > 0) {

                $questions = [];
                $questions_messages = [];
                foreach ($lesson->questions as $key => $question) {
                    if ($question->kk_question_type === 'text') $has_text_question = true;
                    $questions['q' . $question->kk_question_id] = ['required', 'string','max:255' ];
                    $questions_messages['q' . $question->kk_question_id . '.required'] = "Это поле обязательно для заполнения!";
                    $questions_messages['q' . $question->kk_question_id . '.max:255'] = "Количество символов в поле не может превышать 255.";
                }
                $validator = Validator::make($request->all(), $questions, $questions_messages);
                if ($validator->fails())  return response()->json(['success'   => false, 'message'   => 'Пожалуйста пройдите тест!', 'data' => $validator->errors()], 422);
            }
        }

        return DB::transaction(function () use ($request, $user, $lup, $lesson, $has_text_question) {
            if ($request->check_questions !== '0') {
                $questions_user_answers = $request->all();
                foreach ($questions_user_answers as $user_question => $user_answers) {
                    $user_question_id = substr($user_question, 1);
                    if ($lesson->questions && count($lesson->questions) > 0) {
                        foreach ($lesson->questions as $key => $question) {
                            if ($question->answers && count($question->answers) > 0 && $question->kk_question_id == $user_question_id) {
                                $qua = KK_Questions_Users_Answers::where([
                                    'kk_qua_user_id' => $user->kk_user_id,
                                    'kk_qua_lup_id' => $lup->kk_lup_id,
                                    'kk_qua_question_id' => $question->kk_question_id,
                                ])->get();
                                if (!empty($qua) && count($qua) > 0) {
                                    KK_Questions_Users_Answers::where([
                                        'kk_qua_user_id' => $user->kk_user_id,
                                        'kk_qua_lup_id' => $lup->kk_lup_id,
                                        'kk_qua_question_id' => $question->kk_question_id,
                                    ])->delete();
                                }
                                foreach ($question->answers as $key => $answer) {
                                    if ($question->kk_question_type === 'checkbox' || $question->kk_question_type === 'radio') {
                                        $isCorrect = 0;
                                        $users_answers_checks = explode(',', $user_answers);
                                        foreach ($users_answers_checks as $key => $uac) {
                                            if ($answer->kk_qa_id == $uac) {
                                                if ($answer->kk_qa_correct === 1) $isCorrect = 1;

                                                KK_Questions_Users_Answers::create([
                                                    'kk_qua_user_id' => $user->kk_user_id,
                                                    'kk_qua_lup_id' => $lup->kk_lup_id,
                                                    'kk_qua_question_id' => $question->kk_question_id,
                                                    'kk_qua_answer_id' => $answer->kk_qa_id,
                                                    'kk_qua_correct' => $isCorrect,
                                                ]);
                                            }
                                        }
                                    } else if ($question->kk_question_type === 'text') {
                                        KK_Questions_Users_Answers::create([
                                            'kk_qua_user_id' => $user->kk_user_id,
                                            'kk_qua_lup_id' => $lup->kk_lup_id,
                                            'kk_qua_question_id' => $question->kk_question_id,
                                            'kk_qua_answer_id' => $answer->kk_qa_id,
                                            'kk_qua_text' => $user_answers,
                                            'kk_qua_correct' => 0,
                                        ]);
                                    }
                                }
                            }
                        }
                    }
                }
            }


            KK_Lessons_Users_Progress::where([['kk_lup_id', '=', $request->kk_lup_id]])->update([
                'kk_lup_status' => $request->kk_lup_status,
                'kk_lup_checked' => isset($request->kk_lup_checked) ? ($request->kk_lup_checked === "1" ? 1 : 0) : ($has_text_question === true ? 0 : 1),
                'kk_lup_finished_at' => $request->kk_lup_finished_at,
            ]);
            $lesson_user_progress = KK_Lessons_Users_Progress::where([['kk_lup_id', '=', $request->kk_lup_id]])->first();
            $questions = KK_Questions::where(['kk_question_lesson_id' => $lesson->kk_lesson_id])->with(['answers' => function ($query) use ($request) {
                $query->with(['user_answer' => function ($querys) use ($request) {
                    $querys->where("kk_qua_user_id", Auth::user()->kk_user_id);
                }]);
            }])->get();

            $course = KK_Courses::where([['kk_course_id', '=', $lup->kk_lup_course_id]])->first();
            $lesson = KK_Lessons::where([['kk_lesson_id', '=', $lup->kk_lup_lesson_id]])->first();
            if ($request->check_questions !== '0') {
                $target_user = KK_User::where([['kk_user_id', '=', Auth::user()->kk_user_teather_id]])->first(); //Учитель пользователя
                if (!empty($course) && !empty($lesson) && !empty($target_user) && Auth::user()->kk_user_id !== $target_user->kk_user_id) {
                    if (!empty($request->kk_lup_status) && $request->kk_lup_status === 'finished') {
                        //Отправка уведомления что урок необходимо проверить
                        if ($has_text_question === true)  $target_user->notify(new LessonToCheck($lup, 'Здравствуйте! Вам необходимо проверить ответы пользователя ' . Auth::user()->kk_user_lastname . ' ' . Auth::user()->kk_user_firstname . ' в уроке "' . $lesson->kk_lesson_name . '" курса "' . $course->kk_course_name . '".'));
                        //Отправка уведомления что урок пройден
                        else $target_user->notify(new LessonFinished($lup, 'Пользователь ' . Auth::user()->kk_user_lastname . ' ' . Auth::user()->kk_user_firstname . ' прошел урок "' . $lesson->kk_lesson_name . '" в курсе "' . $course->kk_course_name . '".'));
                    }
                }
            } else if($request->check_questions === '0' && isset($request->kk_lup_checked) && $request->kk_lup_checked === "1") {
                if (!empty($request->kk_lup_status) && $request->kk_lup_status === 'finished' && !empty($course) && !empty($lesson) && !empty($user) && Auth::user()->kk_user_id !== $user->kk_user_id) {
                    $user->notify(new LessonChecked($lesson, 'Ответы на пройденый вами урок "' . $lesson->kk_lesson_name . '" в курсе "' . $course->kk_course_name . '", были проверены.'));
                }
            }





            return response()->json(['message' => env('RESPONSE_UPDATE_SUCCESS'), 'lesson' => $lesson_user_progress, 'questions' => $questions], 200);
        });
    }


    public function remove(Request $request)
    {
        $user = Auth::user();
        if (empty($request->kk_lup_id)) return response()->json(['message' => "Пожалуйста выберите проходимый курс."], 400);
        $lup = KK_Lessons_Users_Progress::where([['kk_lup_user_id', '=', $user->kk_user_id], ['kk_lup_id', '=', $request->kk_lup_id]])->first();
        if (empty($lup)) return response()->json(['message' => "Прохождение курса с таким ID не найдено!"], 400);
        KK_Lessons_Users_Progress::where([['kk_lup_user_id', '=', $user->kk_user_id], ['kk_lup_id', '=', $request->kk_lup_id]])->delete();
        return response()->json(['message' => env('RESPONSE_DELETE_SUCCESS')], 200);
    }
    public function getAllByCupId(Request $request)
    {
        if (empty($request->kk_lup_cup_id)) return response()->json(['message' => "Пожалуйста выберите проходимый курс."], 400);
        $user = Auth::user();
        $params = KK_Lessons_Users_Progress::Params($request);
        $lessons = KK_Lessons_Users_Progress::with($params->parts)->withCount($params->parts_to_count)->where($params->where)->where([['kk_lup_cup_id', '=', $request->kk_lup_cup_id], ['kk_lup_user_id', '=', $user->kk_user_id],])->orderBy('kk_lup_started_at', 'DESC')->get();
        if ($lessons->count() === 0) return response()->json(['message' => "Вы покачто не начали проходить ни один из уроков."], 400);
        return response()->json(['message' => env('RESPONSE_SUCCESS'), 'lessons' => $lessons], 200);
    }
    public function getOneByLessonId(Request $request)
    {
        if (empty($request->kk_lup_course_id)) return response()->json(['message' => "Пожалуйста выберите проходимый курс."], 400);
        if (empty($request->kk_lup_lesson_id)) return response()->json(['message' => "Пожалуйста выберите проходимый урок."], 400);
        $user = Auth::user();
        $params = KK_Lessons_Users_Progress::Params($request);
        $lesson = KK_Lessons_Users_Progress::with($params->parts)->withCount($params->parts_to_count)->where($params->where)->where([
            ['kk_lup_user_id', '=', $user->kk_user_id],
            ['kk_lup_course_id', '=', $request->kk_lup_course_id],
            ['kk_lup_lesson_id', '=', $request->kk_lup_lesson_id],
        ])->first();
        if (empty($lesson)) return response()->json(['message' => "Вы покачто не начали этот урок."], 400);
        return response()->json(['message' => env('RESPONSE_SUCCESS'), 'lesson' => $lesson], 200);
    }
}
