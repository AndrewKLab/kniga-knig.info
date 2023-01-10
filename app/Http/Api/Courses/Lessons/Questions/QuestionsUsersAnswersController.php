<?php

namespace App\Http\Api\Courses\Lessons\Questions;

use App\Classes\RequestHelper;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\KK_Lessons;
use App\Models\KK_Questions;
use App\Models\KK_Questions_Answers;
use App\Models\KK_Questions_Users_Answers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\File;

class QuestionsUsersAnswersController extends Controller
{
    public function edit(Request $request)
    {

        $rules = [
            'kk_qua_id' => ['required'],
            'kk_qua_correct' => ['string', 'nullable', 'max:255'],
        ];

        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails())  return response()->json(['success' => false, 'message' => 'Ошибка валидации!', 'data' => $validator->errors()], 422);

        KK_Questions_Users_Answers::where(['kk_qua_id' => $request->kk_qua_id])->update([
            'kk_qua_correct'=>$request->kk_qua_correct
        ]);

        $user_answer = KK_Questions_Users_Answers::where(['kk_qua_id' => $request->kk_qua_id])->first();

        return response()->json(['message' => env('RESPONSE_UPDATE_SUCCESS'), 'user_answer' => $user_answer], 200);
    }
}
