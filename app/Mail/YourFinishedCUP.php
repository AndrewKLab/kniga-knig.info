<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class YourFinishedCUP extends Mailable
{
    use Queueable, SerializesModels;

    public $user;
    public $course;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($user, $course)
    {
        $this->user = $user;
        $this->course = $course;
    }

    public function build()
    {
        return $this->markdown('emails.finish_course')->subject("Проздравляем с прохождением курса!");
    }

}
