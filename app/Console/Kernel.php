<?php

namespace App\Console;

use App\Console\Commands\SendCUPRemindEmails;
use App\Http\Api\Courses\CoursesUsersProgressController;
use App\Mail\Error;
use App\Models\KK_Lessons;
use App\Models\KK_User;
use Exception;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Stringable;

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
        $schedule->call(new SendCUPRemindEmails)
        // ->everyMinute()
        ->dailyAt('18:00');

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
