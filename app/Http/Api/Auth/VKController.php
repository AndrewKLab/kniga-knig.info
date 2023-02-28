<?php

namespace App\Http\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\KK_User;
use App\Models\SocialAccount;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Response;
use Laravel\Socialite\Facades\Socialite;

class VKController extends Controller
{
    public function authUrl()
    {
        return Response::json([
            'url' => Socialite::driver('vkontakte')->stateless()->redirect()->getTargetUrl(),
        ]);
    }

    public function authCallback()
    {
        $vkontakteUser = Socialite::driver('vkontakte')->stateless()->user();
        $user = $vkontakteUser->user;

        return DB::transaction(function () use ($vkontakteUser, $user) {
            if(empty($vkontakteUser->getEmail())) return response()->json(['message'=>'Е-mail является обязательным для регистрации в системе. Пожалуйста добавте E-mail в аккаунт выбранной вами социальной сети!'], 400);
            $user = KK_User::firstOrCreate(
                [
                    'kk_user_email' => $vkontakteUser->getEmail(),
                ],
                [
                    'kk_user_email' => $vkontakteUser->getEmail(),
                    'kk_user_lastname' => $user['last_name'],
                    'kk_user_firstname' => $user['first_name'],
                    'kk_user_password' => Hash::make('vkontakte_'.$vkontakteUser->getId()),
                    'kk_user_role_id' => 7,
                ]
            );
            $user = KK_User::where([['kk_user_id', '=', $user->kk_user_id]])->with(['role'])->first();
            $data =  [
                'token' => $user->createToken('Sanctom+Socialite')->plainTextToken,
                'user' => $user,
            ];

            return response()->json($data, 200);
        });

    }
}
