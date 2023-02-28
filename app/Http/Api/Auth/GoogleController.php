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

class GoogleController extends Controller
{
    public function authUrl()
    {
        return Response::json([
            'url' => Socialite::driver('google')->stateless()->redirect()->getTargetUrl(),
        ]);
    }

    public function authCallback()
    {
        $googleUser = Socialite::driver('google')->stateless()->user();
        $user = $googleUser->user;

        return DB::transaction(function () use ($googleUser, &$user) {
            $user = KK_User::firstOrCreate(
                [
                    'kk_user_email' => $googleUser->getEmail(),
                ],
                [
                    'kk_user_email' => $googleUser->getEmail(),
                    'kk_user_lastname' => $user['family_name'],
                    'kk_user_firstname' => $user['given_name'],
                    'kk_user_password' => Hash::make('google_'.$googleUser->getId()),
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
