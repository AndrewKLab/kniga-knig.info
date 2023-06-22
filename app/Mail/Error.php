<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class Error extends Mailable
{
    use Queueable, SerializesModels;

    public $error;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($error)
    {
        $this->error = $error;

    }

    public function build()
    {
        return $this->markdown('emails.error')->subject("Отчет об ошибке!");
    }
}
