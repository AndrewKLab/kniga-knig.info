<?php

namespace App\Http\Api\Courses\Lessons\Questions;

use App\Classes\RequestHelper;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\KK_Lessons;
use App\Models\KK_Questions;
use App\Models\KK_Questions_Answers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\File;

class QuestionsController extends Controller
{

    public function add(Request $request)
    {
        $rules = [
            'kk_question_lesson_id' => ['required', 'string'],
            'kk_question_type' => ['required', 'string', 'max:255'],
            'kk_question_text' => ['required', 'string', 'max:1000'],
        ];

        if (!empty($request->kk_question_type) && $request->kk_question_type !== 'text') {
            $rules = [
                ...$rules,
                'answers.*.kk_qa_text' => ['required', 'string', 'max:255'],
                'answers.*.kk_qa_correct' => ['required', 'max:1'],
            ];

            if (empty($request->answers) || !empty($request->answers) && count($request->answers) === 0) return response()->json(['message' => 'Добавьте хотябы один ответ!'], 400);
        }

        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails())  return response()->json(['success' => false, 'message' => 'Ошибка валидации!', 'data' => $validator->errors()], 422);

        return DB::transaction(function () use ($request) {
            $kk_question_id = KK_Questions::insertGetId([
                'kk_question_lesson_id' => $request->kk_question_lesson_id,
                'kk_question_type' => $request->kk_question_type,
                'kk_question_text' => $request->kk_question_text,
            ]);
            if ($request->kk_question_type !== 'text') foreach ($request->answers as $key => $answer) {
                KK_Questions_Answers::insert([
                    'kk_qa_question_id' => $kk_question_id,
                    'kk_qa_text' => $answer['kk_qa_text'],
                    'kk_qa_correct' => $answer['kk_qa_correct'],
                ]);
            }
            else                 KK_Questions_Answers::insert([
                'kk_qa_question_id' => $kk_question_id,
                'kk_qa_text' => '',
                'kk_qa_correct' => 0,
            ]);

            $question = KK_Questions::where(['kk_question_id' => $kk_question_id])->with(['answers'])->first();

            return response()->json(['message' => env('RESPONSE_CREATE_SUCCESS'), 'question' => $question], 200);
        });
    }

    public function edit(Request $request)
    {

        $rules = [
            'kk_question_id' => ['required', 'string'],
            'kk_question_lesson_id' => ['required', 'string'],
            'kk_question_type' => ['required', 'string', 'max:255'],
            'kk_question_text' => ['required', 'string', 'max:1000'],
        ];

        if (!empty($request->kk_question_type) && $request->kk_question_type !== 'text') {
            $rules = [
                ...$rules,
                'answers.*.kk_qa_text' => ['required', 'string', 'max:255'],
                'answers.*.kk_qa_correct' => ['required', 'max:1'],
            ];

            if (empty($request->answers) || !empty($request->answers) && count($request->answers) === 0) return response()->json(['message' => 'Добавьте хотябы один ответ!'], 400);
        }
        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails())  return response()->json(['success' => false, 'message' => 'Ошибка валидации!', 'data' => $validator->errors()], 422);

        return DB::transaction(function () use ($request) {
            $question = KK_Questions::where(['kk_question_id' => $request->kk_question_id])->first();
            if (empty($question)) return response()->json(['message' => 'Такого вопроса не существует!'], 400);

            KK_Questions::where(['kk_question_id' => $request->kk_question_id])->update([
                'kk_question_type' => $request->kk_question_type,
                'kk_question_text' => $request->kk_question_text,
            ]);
            KK_Questions_Answers::where(['kk_qa_question_id' => $request->kk_question_id])->delete();


            if ($request->kk_question_type !== 'text') foreach ($request->answers as $key => $answer) {
                KK_Questions_Answers::insert([
                    'kk_qa_question_id' => $request->kk_question_id,
                    'kk_qa_text' => $answer['kk_qa_text'],
                    'kk_qa_correct' => $answer['kk_qa_correct'],
                ]);
            }
            else                 KK_Questions_Answers::insert([
                'kk_qa_question_id' => $request->kk_question_id,
                'kk_qa_text' => '',
                'kk_qa_correct' => 0,
            ]);

            $question = KK_Questions::where(['kk_question_id' => $request->kk_question_id])->with(['answers'])->first();

            return response()->json(['message' => env('RESPONSE_UPDATE_SUCCESS'), 'question' => $question], 200);
        });
    }


    public function remove(Request $request)
    {
        if (empty($request->kk_question_id)) return response()->json(['message' => env('RESPONSE_MISSING_DATA')], 400);
        $question = KK_Questions::where(['kk_question_id' => $request->kk_question_id])->first();
        if (empty($question)) return response()->json(['message' => 'Такой урок не существует!'], 400);

        KK_Questions::where(['kk_question_id' => $request->kk_question_id])->delete();
        return response()->json(['message' => env('RESPONSE_DELETE_SUCCESS')], 200);
    }

    // public function getAll(Request $request)
    // {
    //     $params = KK_Lessons::Params($request);
    //     $courses = KK_Lessons::with($params->parts)->withCount($params->parts_to_count)->where($params->where)->orderBy('kk_course_updated_at', 'DESC')->get();

    //     return response()->json(['message' => env('RESPONSE_SUCCESS'), 'courses' => $courses], 200);
    // }

    public function getAllByLessonId(Request $request)
    {
        if (empty($request->kk_question_lesson_id)) return response()->json(['message' => env('RESPONSE_MISSING_DATA'),], 400);
        $params = KK_Questions::Params($request);
        $questions = KK_Questions::with($params->parts)->withCount($params->parts_to_count)->where([['kk_question_lesson_id', '=', $request->kk_question_lesson_id]])->where($params->where)->get();

        return response()->json(['message' => env('RESPONSE_SUCCESS'), 'questions' => $questions], 200);
    }
}
