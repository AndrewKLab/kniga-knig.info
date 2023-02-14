<?php

namespace App\Notifications;

use App\Events\RealTimeMessage;
use App\Models\KK_Chats;
use App\Models\KK_Chats_Messages;
use App\Models\KK_User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\BroadcastMessage;

class ChatNewMessage extends Notification implements ShouldBroadcast
{
    use Queueable;
    /**
     * @var User
     */
    public $chat_message;
    public $message;
    public $notification;
    public $unread_notifications_count;

    public function notificationBody($notifiable)
    {
        return [
            'message' => $this->message,
            'link'=>'/chats/'.$this->chat_message->kk_cm_chat_id,
            'new_chat_message' => $this->chat_message,
            // 'notifiable' => $notifiable,
        ];
    }

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(KK_Chats_Messages $chat_message, string $message)
    {
        $this->chat_message = $chat_message;
        $this->message = $message;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['database', 'broadcast'];
    }

    // /**
    //  * Get the mail representation of the notification.
    //  *
    //  * @param  mixed  $notifiable
    //  * @return \Illuminate\Notifications\Messages\MailMessage
    //  */
    // public function toMail($notifiable)
    // {
    //     return (new MailMessage)
    //         ->line('The introduction to the notification.')
    //         ->action('Notification Action', url('/'))
    //         ->line('Thank you for using our application!');
    // }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return $this->notificationBody($notifiable);
    }


    /**
     * Get the broadcastable representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return BroadcastMessage
     */
    public function toBroadcast($notifiable): BroadcastMessage
    {
        $this->notification = $notifiable->notifications->first();
        $this->unread_notifications_count = $notifiable->unreadNotifications->count();
        return new BroadcastMessage([
            'notification' => $this->notification,
            'unread_notifications_count' => $this->unread_notifications_count,
        ]);
    }
}
