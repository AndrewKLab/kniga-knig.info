<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class Reminder extends Mailable
{
    use Queueable, SerializesModels;

    public $user;
    public $lesson;
    public $next_lesson;
    public $cups;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($user, $lesson, $next_lesson, $cups)
    {
        $this->user = $user;
        $this->lesson = $lesson;
        $this->next_lesson = $next_lesson;
        $this->cups = $cups;
    }

    public function build()
    {
        return $this->markdown('emails.reminder')->subject("Вы давно не заходили");
    }
}
