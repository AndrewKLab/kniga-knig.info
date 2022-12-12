<?php

namespace App\Http\Api\Chats;


use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\KK_Chats;
use Illuminate\Support\Facades\Auth;

class ChatsController extends Controller
{

    public function getAllByUser(Request $request)
    {
        $user = Auth::user();
        if (empty($user)) return response()->json(['message' => env('RESPONSE_MISSING_DATA'),], 400);
        $params = KK_Chats::Params($request);
        $chats = KK_Chats::with($params->parts)->withCount($params->parts_to_count)->where(function ($query) use ($user) {
            $query->where([['kk_chat_user_one_id', '=', $user->kk_user_id]])->orWhere([['kk_chat_user_two_id', '=', $user->kk_user_id]]);
        })->where($params->where)->get();
        $sorted = $chats->sortByDesc(function ($chat, $key) {
            if(!empty($chat->last_message)) return $chat->last_message->kk_cm_created_at;
        });

        return response()->json(['message' => env('RESPONSE_SUCCESS'), 'chats' => $sorted->values()->all()], 200);
    }
    public function getOneById(Request $request)
    {
        $user = Auth::user();
        if (empty($user) || empty($request->kk_chat_id)) return response()->json(['message' => env('RESPONSE_MISSING_DATA'),], 400);
        $params = KK_Chats::Params($request);
        $chat = KK_Chats::with($params->parts)->withCount($params->parts_to_count)->where(function ($query) use ($user, $request) {
            $query->where(function ($query) use ($user) {
                $query->where([['kk_chat_user_one_id', '=', $user->kk_user_id]])->orWhere([['kk_chat_user_two_id', '=', $user->kk_user_id]]);
            })->where([['kk_chat_id', '=', $request->kk_chat_id]]);
            
        })->where($params->where)->first();

        if(empty($chat)) return response()->json(['message' => 'У вас нет доступа к этому чату!',], 400);
        // $sorted = $chats->sortByDesc(function ($chat, $key) {
        //     if(!empty($chat->last_message)) return $chat->last_message->kk_cm_created_at;
        // });

        return response()->json(['message' => env('RESPONSE_SUCCESS'), 'chat' => $chat], 200);
    }
}
