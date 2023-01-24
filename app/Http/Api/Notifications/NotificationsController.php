<?php

namespace App\Http\Api\Notifications;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Mail\ResetPassword;
use App\Models\KK_Chats;
use App\Models\KK_Chats_Messages;
use App\Models\KK_Courses;
use App\Models\KK_Lessons;
use App\Models\KK_Lessons_Users_Progress;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use App\Models\KK_User;
use App\Notifications\ChatCreated;
use App\Notifications\ChatNewMessage;
use App\Notifications\CourseFinished;
use App\Notifications\LessonChecked;
use App\Notifications\LessonFinished;
use App\Notifications\LessonToCheck;
use App\Notifications\UserRegistered;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class NotificationsController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function getAll(Request $request)
    {
        $notifications = Auth::user()->notifications;
        $unread_notifications_count = Auth::user()->unreadNotifications->count();

        if (count($notifications) === 0) return response()->json(['message' => 'Список ваших уведомлений пуст.'], 400);
        return response()->json(['message' => env('RESPONSE_SUCCESS'), 'notifications' => $notifications, 'unread_notifications_count' => $unread_notifications_count], 200);
    }

    public function markAsReadOneById(Request $request)
    {
        if (empty($request->id)) return response()->json(['message' => 'Данные не полные!'], 400);
        $notification = Auth::user()->notifications->where('id', $request->id)->first()->markAsRead();

        $notifications = Auth::user()->notifications;
        $unread_notifications_count = Auth::user()->unreadNotifications->count();

        if (count($notifications) === 0) return response()->json(['message' => 'Список ваших уведомлений пуст.'], 400);
        return response()->json(['message' => env('RESPONSE_SUCCESS'), 'notifications' => $notifications, 'unread_notifications_count' => $unread_notifications_count], 200);
    }

    public function markAsReadAll(Request $request)
    {
        $user = Auth::user();
        $user->unreadNotifications->markAsRead();

        
        $unread_notifications_count = 0;
        $notifications = $user->notifications;

        if (count($notifications) === 0) return response()->json(['message' => 'Список ваших уведомлений пуст.'], 400);
        return response()->json(['message' => env('RESPONSE_SUCCESS'), 'notifications' => $notifications, 'unread_notifications_count' => $unread_notifications_count], 200);
    }

    public function sendNotifications(Request $request)
    {

        $user = Auth::user();
        if(!empty($request->kk_user_id)) $user = KK_User::where([['kk_user_id', '=',$request->kk_user_id]])->first();

        switch ($request->type) {
            case 'App\Notifications\UserRegistered':
                $user->notify(new UserRegistered($user, 'Пользователь Иванов Иван был зарегистрирован.')); //Добавлено
                break;
            case 'App\Notifications\ChatCreated':
                $chat = KK_Chats::first();
                $user->notify(new ChatCreated($chat, 'У вас появился новый диалог с пользователем Иванов Иван.')); //Добавлено
                break;
            case 'App\Notifications\ChatNewMessage':
                $chat_message = KK_Chats_Messages::first();
                $user->notify(new ChatNewMessage($chat_message, 'У вас новое сообщение в диалоге с пользователем Иванов Иван.')); //Добавлено
                break;
            case 'App\Notifications\CourseFinished':
                $course = KK_Courses::first();
                $user->notify(new CourseFinished($course, 'Пользователь Иванов Иван прошел курс Курс.'));
                break;
            case 'App\Notifications\LessonFinished':
                $lesson = KK_Lessons::first();
                $user->notify(new LessonFinished($lesson, 'Пользователь Иванов Иван прошел урок Урок.'));
                break;
            case 'App\Notifications\LessonChecked':
                $lesson = KK_Lessons_Users_Progress::first();
                $user->notify(new LessonChecked($lesson, 'Ответы на проходимый вами урок Урок, были проверены.'));
                break;
            case 'App\Notifications\LessonToCheck':
                $lesson = KK_Lessons_Users_Progress::first();
                $user->notify(new LessonToCheck($lesson, 'Вам необходимо проверить ответы пользователя Иванов Иван на урок Урок.'));
                break;
            
            default:
                # code...
                break;
        }
        
        return response()->json(['message' => env('RESPONSE_SUCCESS')], 200);
    }
}
