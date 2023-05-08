<?php

namespace App\Http\Api\Statistics;

use App\Exports\UsersEmailsExport;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Mail\ResetPassword;
use App\Models\KK_Courses;
use App\Models\KK_Courses_Users_Progress;
use App\Models\KK_Lessons_Users_Progress;
use App\Models\KK_Modules;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use App\Models\KK_User;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Maatwebsite\Excel\Facades\Excel;

class StatisticsController extends Controller
{

    public static function arrayOfDays($params)
    {
        $data = [];
        $date = $params->start_date->copy();
        while ($date <= $params->end_date->copy()) {
            $data = [
                ...$data, (object) [
                    'name' => $date->copy()->format("d.m.Y"),
                    'date' => $date->copy()->startOfDay()->timestamp,
                    $params->dataKey => 0,
                ]
            ];
            $date->addDays(1);
        }
        return $data;
    }
    public static function arrayOfMonths($params)
    {
        $data = [];
        $date = $params->start_date->copy();
        while ($date <= $params->end_date->copy()) {
            $data = [
                ...$data, (object) [
                    'name' => $date->copy()->translatedFormat("M Y"),
                    'date' => $date->copy()->startOfMonth()->timestamp,
                    $params->dataKey => 0,
                ]
            ];
            $date->addMonth(1);
        }
        return $data;
    }

    public static function countOfUsersFromPeriod($params)
    {
        $period_count = 0;
        foreach ($params->items as $key => $item) {
            if (
                Carbon::createFromFormat("Y-m-d H:i:s",  $item->{$params->item_created_param})->timestamp >= $params->start_date->copy()->timestamp &&
                Carbon::createFromFormat("Y-m-d H:i:s", $item->{$params->item_created_param})->timestamp <= $params->end_date->copy()->timestamp
            )  $period_count++;

            switch ($params->data_list_item_type) {
                case 'day':
                    foreach ($params->data as $key => $day) if (
                        Carbon::createFromFormat("Y-m-d H:i:s",  $item->{$params->item_created_param})->timestamp >= Carbon::createFromTimestamp($day->date)->startOfDay()->timestamp &&
                        Carbon::createFromFormat("Y-m-d H:i:s", $item->{$params->item_created_param})->timestamp <= Carbon::createFromTimestamp($day->date)->endOfDay()->timestamp
                    ) $day->{$params->dataKey} += 1;
                    break;
                case 'month':
                    foreach ($params->data as $key => $month) if (
                        Carbon::createFromFormat("Y-m-d H:i:s",  $item->{$params->item_created_param})->timestamp >= Carbon::createFromTimestamp($month->date)->startOfMonth()->timestamp &&
                        Carbon::createFromFormat("Y-m-d H:i:s", $item->{$params->item_created_param})->timestamp <= Carbon::createFromTimestamp($month->date)->endOfMonth()->timestamp
                    ) $month->{$params->dataKey} += 1;
                    break;
                default:
                    foreach ($params->data as $key => $day) if (
                        Carbon::createFromFormat("Y-m-d H:i:s",  $item->{$params->item_created_param})->timestamp >= Carbon::createFromTimestamp($day->date)->startOfDay()->timestamp &&
                        Carbon::createFromFormat("Y-m-d H:i:s", $item->{$params->item_created_param})->timestamp <= Carbon::createFromTimestamp($day->date)->endOfDay()->timestamp
                    ) $day->{$params->dataKey} += 1;
                    break;
            }
        }
        return (object) [
            'period_count' =>  $period_count,
            'data' => $params->data,
        ];
    }
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function users(Request $request)
    {
        Carbon::setLocale('ru');
        if (empty($request->start_date) || empty($request->end_date)) return response()->json(['message' => "Выберите период!",], 400);
        $start_date = Carbon::createFromFormat("Y-m-d", $request->start_date);
        $end_date = Carbon::createFromFormat("Y-m-d", $request->end_date);

        $users = KK_User::get();

        $data_list_item_type = 'day';
        $data = self::arrayOfDays((object)['dataKey' => 'users', 'start_date' => $start_date, 'end_date' => $end_date,]);

        if (count($data) > 31) $data_list_item_type = 'month';
        if ($data_list_item_type === 'month') $data = self::arrayOfMonths((object)['dataKey' => 'users', 'start_date' => $start_date, 'end_date' => $end_date,]);

        $countOfUsersFromPeriod = self::countOfUsersFromPeriod((object)[
            'items' => $users,
            'item_created_param' => 'kk_user_created_at',
            'dataKey' => 'users',
            'start_date' => $start_date,
            'end_date' => $end_date,
            'data_list_item_type' => $data_list_item_type,
            'data' => $data,
        ]);

        return response()->json([
            'message' => env('RESPONSE_SUCCESS'),
            'count' => count($users),
            'period_count' => $countOfUsersFromPeriod->period_count,
            'data' => $countOfUsersFromPeriod->data,
        ], 200);
    }

    public function courses_users_progress(Request $request)
    {
        Carbon::setLocale('ru');
        if (empty($request->start_date) || empty($request->end_date)) return response()->json(['message' => "Выберите период!",], 200);
        $start_date = Carbon::createFromFormat("Y-m-d", $request->start_date);
        $end_date = Carbon::createFromFormat("Y-m-d", $request->end_date);

        $courses_users_progress = KK_Courses_Users_Progress::get();

        $data_list_item_type = 'day';
        $data = self::arrayOfDays((object)['dataKey' => 'cup', 'start_date' => $start_date, 'end_date' => $end_date,]);

        if (count($data) > 31) $data_list_item_type = 'month';
        if ($data_list_item_type === 'month') $data = self::arrayOfMonths((object)['dataKey' => 'cup', 'start_date' => $start_date, 'end_date' => $end_date,]);

        $countOfUsersFromPeriod = self::countOfUsersFromPeriod((object)[
            'items' => $courses_users_progress,
            'item_created_param' => 'kk_cup_created_at',
            'dataKey' => 'cup',
            'start_date' => $start_date,
            'end_date' => $end_date,
            'data_list_item_type' => $data_list_item_type,
            'data' => $data,
        ]);

        return response()->json([
            'message' => env('RESPONSE_SUCCESS'),
            'count' => count($courses_users_progress),
            'period_count' => $countOfUsersFromPeriod->period_count,
            'data' => $countOfUsersFromPeriod->data,
        ], 200);
    }

    public function getStatisticByCourse(Request $request)
    {
        if (empty($request->kk_course_id)) return response()->json(['message' => "Данные не полные!",], 400);
        $course = KK_Courses::where([['kk_course_id', '=', $request->kk_course_id]])->with(['lessons' => function ($query) {
            $query->withCount([
                'lup_started',
                'lup_finished',
                'lup_not_finished',
            ]);
        }])->withCount([
            'cup_started',
            'cup_finished',
        ])->first();
        if (empty($course)) return response()->json(['message' => "Такой курс не найден!",], 400);
        return response()->json([
            'message' => env('RESPONSE_SUCCESS'),
            'course' => $course,
        ], 200);
    }

    public function getUsersEmailByLup(Request $request)
    {
        if (empty($request->kk_lup_lesson_id) || empty($request->kk_lup_status)) return response()->json(['message' => "Данные не полные!",], 400);
        $where = ['kk_lup_started_at', 'IS NOT', NULL];
        switch ($request->kk_lup_status) {
            case 'inprocess':
                $where = ['kk_lup_started_at', 'IS NOT', NULL];
                break;
            case 'finished':
                $where = ['kk_lup_finished_at', 'IS NOT', NULL];
                break;
            case 'not_finished':
                $where = ['kk_lup_status', '=', 'inprocess'];
                break;
            default:
                $where = ['kk_lup_started_at', 'IS NOT', NULL];
                break;
        }
        $lups = KK_Lessons_Users_Progress::where(
            [
                ['kk_lup_lesson_id', '=', $request->kk_lup_lesson_id],
                $where
            ]
        )->with(['user' => function ($query) {
            $query->with(['role', 'teather']);
        }])->whereHas('user')->get();

        $users_to_print = new UsersEmailsExport($lups);
        return Excel::download($users_to_print, 'Пользователи.xlsx');
    }
}
