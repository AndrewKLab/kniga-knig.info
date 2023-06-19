<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class DiplomCourse extends Mailable
{
    use Queueable, SerializesModels;

    public $user;
    public $course;
    public $pdf;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($user, $course, $pdf)
    {
        $this->user = $user;
        $this->course = $course;
        $this->pdf = $pdf;
    }

    public function build()
    {
        return $this->markdown('emails.diplom_course')->subject("Диплом по окончанию кура")->attach($this->pdf->path);
    }
}
