<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class DiplomCourseOrder extends Mailable
{
    use Queueable, SerializesModels;

    public $user;
    public $course;
    public $order;
    public $pdf;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($user, $course, $order, $pdf)
    {
        $this->user = $user;
        $this->course = $course;
        $this->order = $order;
        $this->pdf = $pdf;
    }

    public function build()
    {
        return $this->markdown('emails.diplom_course_order')->subject("Запрос на получение диплома курьером")->attach($this->pdf->path);
    }
}
