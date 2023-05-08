<?php

namespace App\Exports;

use App\Models\User;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;

class UsersEmailsExport implements FromView
{
    protected $lups;

    public function __construct($lups)
    {
        $this->lups = $lups;
    }

    public function view(): View
    {
        return view('exports.users_emails', [
            'lups' => $this->lups
        ]);
    }
}
