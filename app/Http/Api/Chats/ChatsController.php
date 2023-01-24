<?php

namespace App\Http\Api\Chats;


use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\KK_Chats;
use App\Models\KK_User;
use App\Notifications\ChatCreated;
use Illuminate\Support\Facades\Auth;

class ChatsController extends Controller
{

    public function create(Request $request)
    {
        if (empty($request->kk_user_id)) return response()->json(['message' => config('responce_answers.missing_data')], 400);
        if (Auth::user()->kk_user_id == $request->kk_user_id) return response()->json(['message' => 'Начать диалог с самим собой не возможно!'], 400);

        $chat = KK_Chats::where(function ($query) use ($request) {
            $query->where(function ($query) use ($request) {
                $query->where([['kk_chat_user_one_id', '=', Auth::user()->kk_user_id], ['kk_chat_user_two_id', '=', $request->kk_user_id]]);
            })->orWhere(function ($query) use ($request) {  
                $query->where([['kk_chat_user_one_id', '=', $request->kk_user_id], ['kk_chat_user_two_id', '=', Auth::user()->kk_user_id]]);
            }); 
        })->first();
        if(!empty($chat)) return response()->json(['message' => 'Такой чат уже существует!', 'chat'=>$chat], 400);

        $chat = KK_Chats::create([
            'kk_chat_user_one_id'=>Auth::user()->kk_user_id,
            'kk_chat_user_two_id'=>$request->kk_user_id,
        ]);

        $target_user = KK_User::where([['kk_user_id', '=', $request->kk_user_id]])->first();
        $target_user->notify(new ChatCreated($chat, 'У вас появился новый диалог с пользователем ' . Auth::user()->kk_user_lastname . ' ' . Auth::user()->kk_user_firstname . '.'));

        return response()->json(['message' => config('responce_answers.success'), 'chat' => $chat], 200);
    }
    public function getAllByUser(Request $request)
    {
        $user = Auth::user();
        if (empty($user)) return response()->json(['message' => config('responce_answers.missing_data'),], 400);
        $params = KK_Chats::Params($request);
        $chats = KK_Chats::with($params->parts)->withCount($params->parts_to_count)->where(function ($query) use ($user) {
            $query->where([['kk_chat_user_one_id', '=', $user->kk_user_id]])->orWhere([['kk_chat_user_two_id', '=', $user->kk_user_id]]);
        })->where($params->where)->get();
        $sorted = $chats->sortByDesc(function ($chat, $key) {
            if(!empty($chat->last_message)) return $chat->last_message->kk_cm_created_at;
        });

        return response()->json(['message' => config('responce_answers.success'), 'chats' => $sorted->values()->all()], 200);
    }
    public function getOneById(Request $request)
    {
        $user = Auth::user();
        if (empty($user) || empty($request->kk_chat_id)) return response()->json(['message' => config('responce_answers.missing_data'),], 400);
        $params = KK_Chats::Params($request);
        $chat = KK_Chats::with($params->parts)->withCount($params->parts_to_count)->where(function ($query) use ($request) {
            $query->where(function ($query) use ($request) {
                $query->where([['kk_chat_user_one_id', '=', Auth::user()->kk_user_id]]);
            })->orWhere(function ($query) use ($request) {  
                $query->where([['kk_chat_user_two_id', '=', Auth::user()->kk_user_id]]);
            }); 
        })->where([['kk_chat_id', '=', $request->kk_chat_id]])->where($params->where)->first();

        if(empty($chat)) return response()->json(['message' => 'У вас нет доступа к этому чату!',], 400);
        // $sorted = $chats->sortByDesc(function ($chat, $key) {
        //     if(!empty($chat->last_message)) return $chat->last_message->kk_cm_created_at;
        // });

        return response()->json(['message' => config('responce_answers.success'), 'chat' => $chat], 200);
    }
}
