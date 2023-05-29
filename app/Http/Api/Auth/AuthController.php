<?php

namespace App\Http\Api\Auth;

use App\Classes\RequestHelper;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Mail\ResetPassword;
use App\Models\KK_Courses_Users_Progress;
use App\Models\KK_Lessons_Users_Progress;
use App\Models\KK_Organizations;
use App\Models\KK_Questions_Users_Answers;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use App\Models\KK_User;
use App\Models\KK_Users_Roles;
use App\Notifications\UserRegistered;
use Carbon\Carbon;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\File;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use TimeHunter\LaravelGoogleReCaptchaV3\Validations\GoogleReCaptchaV3ValidationRule;


class AuthController extends Controller
{
    public static function setReferalUsers($request)
    {
        $referal = [
            'referal_user_id'          =>  null,
            'kk_user_admin_id'          =>  null,
            'kk_user_coordinator_id'    =>  null,
            'kk_user_pastor_id'         =>  null,
            'kk_user_teather_id'        =>  null,
            'kk_user_promouter_id'      =>  null,
        ];
        if (!empty($request->referal_user)) $referal['referal_user_id'] = $request->referal_user;
        else {
            $organization = KK_Organizations::where(['kk_organization_id' => 396])->with(['users' => function ($query) {
                $query->with(['user' => function ($query) {
                    $query->withCount(['students']);
                }]);
            }])->first(); //Медиа-холдинг "Надежда"

            $min_students_count = 0;
            if(!empty($organization) && count($organization->users) > 0){
                foreach ($organization->users as $key => $user) {
                    if($user->students_count <= $min_students_count) {
                        $min_students_count = $user->user->students_count;
                        $referal['referal_user_id'] = $user->user->kk_user_id;
                    }
                }
            }
        }

        if (!empty($referal['referal_user_id'])) {
            $referal_user = KK_User::where(['kk_user_id' => $referal['referal_user_id']])->with(['role'])->first();
            if (empty($referal_user)) return response()->json(['message' => 'Такой пользователь не найден!'], 400);
            if (empty($referal_user->role)) return response()->json(['message' => 'Такая роль пользователя не найдена!'], 400);
            if ($referal_user->role->kk_role_level === 1 || $referal_user->role->kk_role_level === 2) {
                $referal['kk_user_admin_id'] = $referal_user->kk_user_id;
                $referal['kk_user_coordinator_id'] = $referal_user->kk_user_id;
                $referal['kk_user_pastor_id'] = $referal_user->kk_user_id;
                $referal['kk_user_teather_id'] = $referal_user->kk_user_id;
                $referal['kk_user_promouter_id'] = $referal_user->kk_user_id;
            } else if ($referal_user->role->kk_role_level === 3) {
                $referal['kk_user_admin_id'] = $referal_user->kk_user_admin_id;
                $referal['kk_user_coordinator_id'] = $referal_user->kk_user_id;
                $referal['kk_user_pastor_id'] = $referal_user->kk_user_id;
                $referal['kk_user_teather_id'] = $referal_user->kk_user_id;
                $referal['kk_user_promouter_id'] = $referal_user->kk_user_id;
            } else if ($referal_user->role->kk_role_level === 4) {
                $referal['kk_user_admin_id'] = $referal_user->kk_user_admin_id;
                $referal['kk_user_coordinator_id'] = $referal_user->kk_user_coordinator_id;
                $referal['kk_user_pastor_id'] = $referal_user->kk_user_id;
                $referal['kk_user_teather_id'] = $referal_user->kk_user_id;
                $referal['kk_user_promouter_id'] = $referal_user->kk_user_id;
            } else if ($referal_user->role->kk_role_level === 5) {
                $referal['kk_user_admin_id'] = $referal_user->kk_user_admin_id;
                $referal['kk_user_coordinator_id'] = $referal_user->kk_user_coordinator_id;
                $referal['kk_user_pastor_id'] = $referal_user->kk_user_pastor_id;
                $referal['kk_user_teather_id'] = $referal_user->kk_user_id;
                $referal['kk_user_promouter_id'] = $referal_user->kk_user_id;
            } else if ($referal_user->role->kk_role_level === 6) {
                $referal['kk_user_admin_id'] = $referal_user->kk_user_admin_id;
                $referal['kk_user_coordinator_id'] = $referal_user->kk_user_coordinator_id;
                $referal['kk_user_pastor_id'] = $referal_user->kk_user_pastor_id;
                $referal['kk_user_teather_id'] = $referal_user->kk_user_teather_id;
                $referal['kk_user_promouter_id'] = $referal_user->kk_user_id;
            }
        }
        return $referal;
    }
    

    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function registration(RegisterFormRequest $request)
    {
        if ($request->kk_user_password_privacy_politic_confirmation !== 'true') return response()->json(['message' => 'Пожалуйста примите "Согласие на обработку персональных данных".'], 400);

        $referal = self::setReferalUsers($request);
        $user = KK_User::create([
            'kk_user_firstname' => $request['kk_user_firstname'],
            'kk_user_lastname' => $request['kk_user_lastname'],
            'kk_user_middlename' => $request['kk_user_middlename'],
            'kk_user_phonenumber' => $request['kk_user_phonenumber'],
            'kk_user_email' => $request['kk_user_email'],
            'kk_user_country' => $request['kk_user_country'],
            'kk_user_sity' => $request['kk_user_sity'],
            'kk_user_commune' => $request['kk_user_commune'],
            'kk_user_password' => Hash::make($request['kk_user_password']),
            'kk_user_offline_user' => $request['kk_user_offline_user'] ? $request['kk_user_offline_user'] : 0,
            'kk_user_role_id' => 6,

            'kk_user_admin_id' => $referal['kk_user_admin_id'],
            'kk_user_coordinator_id' => $referal['kk_user_coordinator_id'],
            'kk_user_pastor_id' => $referal['kk_user_pastor_id'],
            'kk_user_teather_id' => $referal['kk_user_teather_id'],
            'kk_user_promouter_id' => $referal['kk_user_promouter_id'],

            'kk_user_avatar' => $request['kk_user_avatar'],
            'kk_user_email_verified_at' => $request['kk_user_email_verified_at'],
        ]);

        $created_cup = null;
        if (!empty($request->courses_user_progress) && $request->courses_user_progress !== 'null') {
            $courses_user_progress = json_decode($request->courses_user_progress);
            if ($courses_user_progress) foreach ($courses_user_progress as $key => $cup) {
                $cup_exist = KK_Courses_Users_Progress::where([['kk_cup_user_id', '=', $user->kk_user_id], ['kk_cup_course_id', '=', $cup->kk_cup_course_id]])->first();
                if (empty($cup_exist)) $created_cup = KK_Courses_Users_Progress::create([
                    'kk_cup_user_id' => $user->kk_user_id,
                    'kk_cup_course_id' => $cup->kk_cup_course_id,
                    'kk_cup_status' => $cup->kk_cup_status,
                    'kk_cup_started_at' => $cup->kk_cup_started_at,
                    'kk_cup_finished_at' => $cup->kk_cup_finished_at,
                ]);
            }
        }

        $created_lup = null;
        if ($created_cup && !empty($request->lessons_user_progress) && $request->lessons_user_progress !== 'null') {
            $lessons_user_progress = json_decode($request->lessons_user_progress);
            if ($lessons_user_progress) foreach ($lessons_user_progress as $key => $lup) {
                $lup_exist = KK_Lessons_Users_Progress::where([['kk_lup_user_id', '=', $user->kk_user_id], ['kk_lup_course_id', '=', $request->kk_lup_course_id], ['kk_lup_lesson_id', '=', $request->kk_lup_lesson_id]])->first();
                if (empty($lup_exist)) $created_lup = KK_Lessons_Users_Progress::create([
                    'kk_lup_cup_id' => $created_cup->kk_cup_id,
                    'kk_lup_user_id' => $user->kk_user_id,
                    'kk_lup_course_id' => $lup->kk_lup_course_id,
                    'kk_lup_lesson_id' => $lup->kk_lup_lesson_id,
                    'kk_lup_status' => $lup->kk_lup_status,
                    'kk_lup_checked' => 0,
                    'kk_lup_started_at' => $lup->kk_lup_started_at,
                    'kk_lup_finished_at' => $lup->kk_lup_finished_at,
                ]);
            }
        }

        if ($created_lup && !empty($request->questions_users_answers) && $request->questions_users_answers !== 'null') {
            $questions_users_answers = json_decode($request->questions_users_answers);
            if ($questions_users_answers) foreach ($questions_users_answers as $key => $qua) {
                $qua_exist = KK_Questions_Users_Answers::where([['kk_qua_user_id', '=', $user->kk_user_id], ['kk_qua_lup_id', '=', $created_lup->kk_lup_id], ['kk_qua_question_id', '=', $request->kk_qua_question_id]])->first();
                if (empty($qua_exist)) $created_qua = KK_Questions_Users_Answers::create([
                    'kk_qua_user_id' => $user->kk_user_id,
                    'kk_qua_lup_id' => $created_lup->kk_lup_id,
                    'kk_qua_question_id' => $qua->kk_qua_question_id,
                    'kk_qua_answer_id' => $qua->kk_qua_answer_id,
                    'kk_qua_text' => $qua->kk_qua_text,
                    'kk_qua_correct' => $qua->kk_qua_correct,
                ]);
            }
        }

        if (!empty($referal['referal_user_id'])) {
            $referal_user = KK_User::where(['kk_user_id' => $referal['referal_user_id']])->first();
            $referal_user->notify(new UserRegistered($user, 'Пользователь ' . $user->kk_user_lastname . ' ' . $user->kk_user_firstname . ' был зарегистрирован по вашей клиентской ссылке.'));
        } else {
            $target_users = KK_User::with(['role'])->whereHas('role', function ($query) {
                $query->where([['kk_role_level', '<', 3]]);
            })->get();
            foreach ($target_users as $target_user) {
                $target_user->notify(new UserRegistered($user, 'Пользователь ' . $user->kk_user_lastname . ' ' . $user->kk_user_firstname . ' был зарегистрирован.'));
            }
        }

        return response()->json([
            'user' => $user,
            'message' => 'Вы успешно зарегистрированы. Используйте свой адрес электронной почты и пароль для входа.'
        ], 200);
    }
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function login(LoginFormRequest $request)
    {
        $credentials = $request->only('kk_user_email_or_kk_user_phone', 'kk_user_password');
        $user = KK_User::where('kk_user_email', $credentials['kk_user_email_or_kk_user_phone'])->orWhere('kk_user_phonenumber', $credentials['kk_user_email_or_kk_user_phone'])->with(['role'])->first();
        if ($user) {

            if (!Hash::check($credentials['kk_user_password'], $user->kk_user_password)) {
                return response()->json([
                    'message' => 'Вы ввели не верный логин или пароль',
                    'errors' => 'Unauthorised'
                ], 401);
            }

            $token = $user->createToken(config('app.name'));
            $token->accessToken->expires_at = $request->kk_user_remember_token ? Carbon::now()->addMonth() : Carbon::now()->addDay();

            $token->accessToken->save();

            return response()->json([
                'token_type' => 'Bearer',
                'token' => $token->plainTextToken,
                'expires_at' => Carbon::parse($token->accessToken->expires_at)->toDateTimeString(),
                'user' => $user
            ], 200);
        } else {

            return response()->json([
                'message' => 'Вы ввели не верный логин или пароль',
                'errors' => 'Unauthorised'
            ], 401);
        }
    }

    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function logout(Request $request)
    {
        $user = $request->user();
        $user->currentAccessToken()->delete();
        return response()->json([
            'message' => 'Вы успешно вышли из системы.',
            'user' => $user
        ]);
    }

    public function forgotPassword(ForfotPasswordFormRequest $request)
    {

        $credentials = $request->only('kk_user_email');
        $user = KK_User::where('kk_user_email', $credentials['kk_user_email'])->first();
        if (empty($user))  return response()->json(['message' => 'Пользователь с таким адресом электронной почты не существует.'], 400);

        $verify =  DB::table('password_resets')->where([['email', $credentials['kk_user_email']]]);
        if ($verify->exists()) $verify->delete();

        $token = random_int(100000, 999999);
        $password_reset = DB::table('password_resets')->insert([
            'email' => $credentials['kk_user_email'],
            'token' =>  Hash::make($token),
            'created_at' => Carbon::now()
        ]);

        if ($password_reset) {
            Mail::to($credentials['kk_user_email'])->send(new ResetPassword($token));
            return response()->json(['message' => 'Пожалуйста, проверьте свою электронную почту на наличие 6-значного пин-кода.',], 200);
        }
    }

    public function verifyPinPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'kk_user_email' => ['required', 'string', 'email', 'max:255'],
            'token' => ['required'],
            'g-recaptcha-response' => [new GoogleReCaptchaV3ValidationRule('verifyPinPassword')]
        ]);

        if ($validator->fails())  return response()->json(['success'   => false, 'message'   => 'Ошибка валидации!', 'data' => $validator->errors()], 422);
        $credentials = $request->only('kk_user_email', 'token');
        $check = DB::table('password_resets')->where([['email', $credentials['kk_user_email']]])->first();



        if (!empty($check)) {
            if (!Hash::check($credentials['token'], $check->token)) return response()->json(['message' => 'Вы ввели не верный пин-код.'], 400);

            $difference = Carbon::now()->diffInSeconds($check->created_at);
            if ($difference > 3600) return response()->json(['message' => "Срок действия кода истек!"], 400);

            // $delete = DB::table('password_resets')->where([['email', $check->email], ['token', $check->token]])->delete();

            return response()->json(['message' => "Теперь вы можете сбросить пароль."], 200);
        } else return response()->json(['message' => "Недействительный токен."], 401);
    }

    public function resetPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'kk_user_email' => ['required', 'string', 'email', 'max:255'],
            'kk_user_password' => ['required', 'string', 'min:6', 'confirmed'],
            'token' => ['required'],
            'g-recaptcha-response' => [new GoogleReCaptchaV3ValidationRule('resetPassword')]
        ]);

        if ($validator->fails())  return response()->json(['success'   => false, 'message' => 'Ошибка валидации!', 'data' => $validator->errors()], 422);

        $credentials = $request->only('kk_user_email', 'kk_user_password', 'token');

        $check = DB::table('password_resets')->where([['email', $credentials['kk_user_email']]])->first();
        if (empty($check)) return response()->json(['message' => "Недействительный токен."], 401);
        if (!Hash::check($credentials['token'], $check->token)) return response()->json(['message' => 'Вы ввели не верный пин-код.'], 400);

        $difference = Carbon::now()->diffInSeconds($check->created_at);
        if ($difference > 3600) return response()->json(['message' => "Срок действия кода истек!"], 400);

        $delete = DB::table('password_resets')->where([['email', $check->email], ['token', $check->token]])->delete();

        $user = KK_User::where('kk_user_email', $credentials['kk_user_email']);
        $user->update(['kk_user_password' => Hash::make($credentials['kk_user_password'])]);

        $token = $user->first()->createToken(config('app.name'))->plainTextToken;

        return response()->json(
            [
                'success' => true,
                'message' => "Ваш пароль был сброшен.",
                'token' => $token
            ],
            200
        );
    }

    public function editAuthUser(Request $request)
    {
        $user = KK_User::where(['kk_user_id' => Auth::user()->kk_user_id])->with(KK_User::$defaultParts)->first();
        if (empty($user)) return response()->json(['success'   => false, 'message' => 'Такого пользователя не существует!'], 400);

        $validator = Validator::make($request->all(), [
            'kk_user_firstname' => ['required', 'string', 'max:255'],
            'kk_user_lastname' => ['required', 'string', 'max:255'],
            'kk_user_middlename' => ['string', 'max:255', 'nullable'],
            'kk_user_phonenumber' => ['required', 'numeric', 'digits:10', Rule::unique('kk_users', 'kk_user_phonenumber')->ignore($user)],
            'kk_user_email' => ['required', 'string', 'email', 'max:255',  'nullable', Rule::unique('kk_users', 'kk_user_email')->ignore($user)],

            'kk_user_country' => ['string', 'max:255', 'nullable'],
            'kk_user_sity' => ['string', 'max:255', 'nullable'],
            'kk_user_commune' => ['string', 'max:255', 'nullable'],

            'g-recaptcha-response' => [new GoogleReCaptchaV3ValidationRule('editAuthUser')]
        ]);

        if ($validator->fails())  return response()->json(['success'   => false, 'message' => 'Ошибка валидации!', 'data' => $validator->errors()], 422);

        KK_User::where(['kk_user_id' => Auth::user()->kk_user_id])->update([
            'kk_user_firstname' => $request['kk_user_firstname'],
            'kk_user_lastname' => $request['kk_user_lastname'],
            'kk_user_middlename' => $request['kk_user_middlename'],
            'kk_user_phonenumber' => $request['kk_user_phonenumber'],
            'kk_user_email' => $request['kk_user_email'],
            'kk_user_country' => $request['kk_user_country'],
            'kk_user_sity' => $request['kk_user_sity'],
            'kk_user_commune' => $request['kk_user_commune'],
        ]);

        $user = KK_User::where(['kk_user_id' => Auth::user()->kk_user_id])->with(KK_User::$defaultParts)->first();

        return response()->json([
            'success' => true,
            'message' => "Ваш профиль был изменен.",
            'user' => $user
        ], 200);
    }

    public function editAvatarAuthUser(Request $request)
    {
        $user = KK_User::where(['kk_user_id' => Auth::user()->kk_user_id])->with(KK_User::$defaultParts)->first();
        if (empty($user)) return response()->json(['success'   => false, 'message' => 'Такого пользователя не существует!'], 400);

        $validator = Validator::make($request->all(), [
            'kk_user_avatar' => ['required', File::image()->max(12 * 1024)->dimensions(Rule::dimensions()->maxWidth(1000)->maxHeight(1000)),],
            'g-recaptcha-response' => [new GoogleReCaptchaV3ValidationRule('editAvatarAuthUser')]
        ]);

        if ($validator->fails())  return response()->json(['success'   => false, 'message' => 'Ошибка валидации!', 'data' => $validator->errors()], 422);

        $kk_user_avatar = RequestHelper::saveImage($request, 'kk_user_avatar', 'avatars');
        KK_User::where(['kk_user_id' => Auth::user()->kk_user_id])->update([
            'kk_user_avatar' => $kk_user_avatar,
        ]);

        $user = KK_User::where(['kk_user_id' => Auth::user()->kk_user_id])->with(KK_User::$defaultParts)->first();

        return response()->json([
            'success' => true,
            'message' => "Ваш аватар был изменен.",
            'user' => $user
        ], 200);
    }

    public function getAuthUser(Request $request)
    {
        $user = KK_User::where(['kk_user_id' => Auth::user()->kk_user_id])->with(KK_User::$defaultParts)->first();
        return response()->json(
            [
                'message' => env('RESPONSE_SUCCESS'),
                'user' => $user,
            ],
            200
        );
    }
}
