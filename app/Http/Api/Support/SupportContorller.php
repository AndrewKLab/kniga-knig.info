<?php

namespace App\Http\Api\Support;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Mail\ResetPassword;
use App\Mail\Support;
use App\Models\KK_Courses;
use App\Models\KK_Support;
use App\Models\KK_Support_Types;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use App\Models\KK_User;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use TimeHunter\LaravelGoogleReCaptchaV3\Validations\GoogleReCaptchaV3ValidationRule;


class SupportContorller extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'kk_support_type_id' => ['required', 'string'],
            'kk_support_name' => ['required', 'string',  'max:255'],
            'kk_support_email' => ['required', 'string', 'email',  'max:255'],
            'kk_support_subject' => ['string', 'max:255'],
            'kk_support_message' => ['string', 'max:2000'],
            'g-recaptcha-response' => [new GoogleReCaptchaV3ValidationRule('contact_us')]
        ]);
        if ($validator->fails())  return response()->json(['success'   => false, 'message'   => 'Ошибка валидации!', 'data' => $validator->errors()], 422);

        KK_Support::create([
            'kk_support_user_id' => $request->kk_support_user_id,
            'kk_support_type_id' => $request->kk_support_type_id,
            'kk_support_name' => $request->kk_support_name,
            'kk_support_email' => $request->kk_support_email,
            'kk_support_subject' => $request->kk_support_subject,
            'kk_support_message' => $request->kk_support_message,
        ]);

        $user = null;
        if (!empty($request->kk_support_user_id)) $user = KK_User::where(['kk_user_id' => $request->kk_support_user_id])->first();
        $support_type = null;
        if (!empty($request->kk_support_type_id)) $support_type = KK_Support_Types::where(['kk_st_id' => $request->kk_support_type_id])->first();

        $mail = (object) [
            'user'=>$user,
            'support_type'=>$support_type,
            'kk_support_name' => $request->kk_support_name,
            'kk_support_email' => $request->kk_support_email,
            'kk_support_subject' => $request->kk_support_subject,
            'kk_support_message' => $request->kk_support_message,
        ];
         Mail::to('glas.keys@gmail.com')->send(new Support($mail));

        return response()->json(['message' => "Ваше сообщение отправлено успешно!",], 200);
    }
}
