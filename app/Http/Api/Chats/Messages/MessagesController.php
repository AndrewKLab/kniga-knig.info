<?php

namespace App\Http\Api\Chats\Messages;


use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\KK_Chats;
use App\Models\KK_Chats_Messages;
use App\Models\KK_User;
use App\Notifications\ChatNewMessage;
use Illuminate\Support\Facades\Auth;

class MessagesController extends Controller
{

    public function sendMessage(Request $request)
    {
        $user = Auth::user();
        if (empty($user) || empty($request->kk_cm_chat_id) || empty($request->kk_cm_send_to_user_id) || (empty($request->kk_cm_message))) return response()->json(['message' => env('RESPONSE_MISSING_DATA'),], 400);

        $chat = KK_Chats::where(function ($query) use ($user, $request) {
            $query->where([['kk_chat_user_one_id', '=', $user->kk_user_id]])->orWhere([['kk_chat_user_two_id', '=', $request->kk_cm_send_to_user_id]]);
        })->orWhere(function ($query) use ($user, $request) {
            $query->where([['kk_chat_user_one_id', '=', $request->kk_cm_send_to_user_id]])->orWhere([['kk_chat_user_two_id', '=', $user->kk_user_id]]);
        })->where([['kk_chat_id', '=', $request->kk_cm_chat_id]])->first();
        if (empty($chat)) return response()->json(['message' => 'У вас нет доступа к этому чату!',], 400);

        $message_id = KK_Chats_Messages::insertGetId([
            'kk_cm_chat_id'=>$request->kk_cm_chat_id,
            'kk_cm_send_from_user_id'=>$user->kk_user_id,
            'kk_cm_send_to_user_id'=>$request->kk_cm_send_to_user_id,
            'kk_cm_message'=>$request->kk_cm_message,
            // 'kk_cm_files'=>$request->kk_cm_chat_id,
            'kk_cm_read_status'=>0,
        ]);

        $message = KK_Chats_Messages::where(['kk_cm_id'=>$message_id])->first();

        $target_user = KK_User::where([['kk_user_id', '=', $request->kk_cm_send_to_user_id]])->first();
        $target_user->notify(new ChatNewMessage($message, 'У вас новое сообщение в чате с пользователем ' . Auth::user()->kk_user_lastname . ' ' . Auth::user()->kk_user_firstname . '.'));

        // $params = KK_Chats::Params($request);
        // $chats = KK_Chats::with($params->parts)->withCount($params->parts_to_count)->where(function ($query) use ($user) {
        //     $query->where([['kk_chat_user_one_id', '=', $user->kk_user_id]])->orWhere([['kk_chat_user_two_id', '=', $user->kk_user_id]]);
        // })->where($params->where)->get();
        // $sorted = $chats->sortByDesc(function ($chat, $key) {
        //     if(!empty($chat->last_message)) return $chat->last_message->kk_cm_created_at;
        // });

        return response()->json(['res_message' => env('RESPONSE_SUCCESS'), 'message' => $message], 200);
    }

}
