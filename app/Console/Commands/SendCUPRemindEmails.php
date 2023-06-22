<?php

namespace App\Console\Commands;

use App\Mail\Error;
use App\Mail\Reminder;
use App\Models\KK_Courses_Users_Progress;
use App\Models\KK_Lessons;
use App\Models\KK_User;
use Illuminate\Support\Facades\Mail;

class SendCUPRemindEmails
{
    public function __invoke()
    {
        try {
            $users = KK_User::where([
                ['kk_user_offline_user', '=', 0],
                ['kk_user_email', '!=', NULL],
                // ['kk_user_email', '=', 'andrew.karganov@gmail.com'],
            ])->withWhereHas(
                'courses_user_progress',
                function ($query) {
                    $query->where([
                        ['kk_cup_status', '=', 'inprocess'],
                        ['kk_cup_need_notify', '=', 1],
                    ])->with(['course'])->withWhereHas('last_finished_lup', function ($query) {
                        $query->where([['kk_lup_finished_at', '<', now()->subDays(3)->endOfDay()]])->withWhereHas(
                            'lesson',
                            function ($query) {
                                $query->select('kk_lesson_id', 'kk_lesson_course_id', 'kk_lesson_number');
                            }
                        );
                    });
                }
            )->get();

            foreach ($users as $key => $user) foreach ($user->courses_user_progress as $key => $cup) {
                $next_lesson = KK_Lessons::select('kk_lesson_id', 'kk_lesson_course_id', 'kk_lesson_number')->where(['kk_lesson_number' => $cup->last_finished_lup->lesson->kk_lesson_number + 1, 'kk_lesson_course_id' => $cup->last_finished_lup->lesson->kk_lesson_course_id])->first();
                if (!empty($next_lesson) && !empty($user->kk_user_email)) {
                    Mail::to($user->kk_user_email)->send(new Reminder($user, $cup->last_finished_lup->lesson, $next_lesson, $user->courses_user_progress));
                    KK_Courses_Users_Progress::where([['kk_cup_id', '=', $cup->kk_cup_id]])->update(['kk_cup_need_notify' => 0]);
                }
            }
            return $users;
        } catch (\Exception  $e) {
            Mail::to('glas.keys@gmail.com')->send(new Error($e->getMessage()));
        }
    }
}
