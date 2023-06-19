<?php

namespace App\Console;

use App\Console\Commands\SendCUPRemindEmails;
use App\Http\Api\Courses\CoursesUsersProgressController;
use App\Mail\Reminder;
use App\Models\KK_Lessons;
use App\Models\KK_User;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use Illuminate\Support\Facades\Mail;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        $schedule->call(new SendCUPRemindEmails)->dailyAt('18:00')->emailOutputOnFailure('glas.keys@gmail.com');
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__ . '/Commands');

        require base_path('routes/console.php');
    }
}
