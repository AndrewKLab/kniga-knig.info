<?php

namespace App\Http\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use App\Models\KK_User;
use App\Models\SocialAccount;
use App\Models\User;
use App\Notifications\UserRegistered;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Response;
use Laravel\Socialite\Facades\Socialite;

class OdniklassnikiController extends Controller
{
    public function authUrl()
    {
        return Response::json([
            'url' => Socialite::driver('odnoklassniki')->stateless()->redirect()->getTargetUrl(),
        ]);
    }

    public function authCallback(Request $request)
    {
        $odnoklassnikiUser = Socialite::driver('odnoklassniki')->stateless()->user();
        $user_data = $odnoklassnikiUser->user;

        return DB::transaction(function () use ($odnoklassnikiUser, $user_data, $request) {
            if(empty($odnoklassnikiUser->email)) return response()->json(['message'=>'Е-mail является обязательным для регистрации в системе. Пожалуйста добавте E-mail в аккаунт выбранной вами социальной сети!'], 400);
            
            $user = KK_User::where([['kk_user_email', '=', $odnoklassnikiUser->getEmail()]])->first();
            if (!empty($user)) $user->update([
                'kk_user_email' => $odnoklassnikiUser->getEmail(),
            ]);
            else {
                $referal = AuthController::setReferalUsers($request);
                $user = KK_User::create([
                    'kk_user_email' => $odnoklassnikiUser->getEmail(),
                    'kk_user_lastname' => isset($user_data['last_name']) ? $user_data['last_name'] : null,
                    'kk_user_firstname' => isset($user_data['first_name']) ? $user_data['first_name'] : null,
                    'kk_user_password' => Hash::make('odnoklassniki_' . $odnoklassnikiUser->getId()),
                    'kk_user_role_id' => 6,

                    'kk_user_admin_id' => $referal['kk_user_admin_id'],
                    'kk_user_coordinator_id' => $referal['kk_user_coordinator_id'],
                    'kk_user_pastor_id' => $referal['kk_user_pastor_id'],
                    'kk_user_teather_id' => $referal['kk_user_teather_id'],
                    'kk_user_promouter_id' => $referal['kk_user_promouter_id'],
                ]);

                if (!empty($referal['referal_user_id'])) {
                    $referal_user = KK_User::where(['kk_user_id' => $referal['referal_user_id']])->first();
                    $referal_user->notify(new UserRegistered($user, 'Пользователь ' . $user->kk_user_lastname . ' ' . $user->kk_user_firstname . ' был зарегистрирован по вашей клиентской ссылке с помощью ОК.'));
                } else {
                    $target_users = KK_User::with(['role'])->whereHas('role', function ($query) {
                        $query->where([['kk_role_level', '<', 3]]);
                    })->get();
                    foreach ($target_users as $target_user) {
                        $target_user->notify(new UserRegistered($user, 'Пользователь ' . $user->kk_user_lastname . ' ' . $user->kk_user_firstname . ' был зарегистрирован с помощью ОК.'));
                    }
                }
            }

            $user = KK_User::where([['kk_user_id', '=', $user->kk_user_id]])->with(['role'])->first();
            $data =  [
                'token' => $user->createToken('Sanctom+Socialite')->plainTextToken,
                'user' => $user,
            ];

            return response()->json($data, 200);
        });

    }
}
