<?php

namespace App\Notifications;

use App\Events\RealTimeMessage;
use App\Models\KK_Chats;
use App\Models\KK_Courses;
use App\Models\KK_Lessons;
use App\Models\KK_Lessons_Users_Progress;
use App\Models\KK_User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\BroadcastMessage;

class LessonToCheck extends Notification implements ShouldBroadcast
{
    use Queueable;
    /**
     * @var User
     */
    public $lesson;
    public $message;
    public $notification;
    public $unread_notifications_count;

    public function notificationBody($notifiable)
    {
        return [
            'message' => $this->message,
            'link' => config('app.crm_url').'/users/info/course_progress/'.$this->lesson->kk_lup_course_id.'/'.$this->lesson->kk_lup_user_id.'?kk_lesson_id='.$this->lesson->kk_lup_lesson_id,
            // 'lesson_to_check' => $this->lesson,

            // 'notifiable' => $notifiable,
        ];
    }

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(KK_Lessons_Users_Progress $lesson, string $message)
    {
        $this->lesson = $lesson;
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
