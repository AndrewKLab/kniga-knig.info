<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


use App\Http\Api\Courses\CoursesController;
use App\Http\Api\Courses\CoursesCategoriesController;
use App\Http\Api\Auth\AuthController;
use App\Http\Api\Chats\ChatsController;
use App\Http\Api\Chats\Messages\MessagesController;
use App\Http\Api\Courses\CoursesUsersProgressController;
use App\Http\Api\Courses\Lessons\LessonsController;
use App\Http\Api\Courses\Lessons\LessonsUsersProgressController;
use App\Http\Api\Courses\Lessons\Questions\QuestionsController;
use App\Http\Api\Courses\Lessons\Questions\QuestionsUsersAnswersController;
use App\Http\Api\Notifications\NotificationsController;
use App\Http\Api\SearchContorller;
use App\Http\Api\Settings\ModulesController;
use App\Http\Api\Settings\UsersRolesAccessController;
use App\Http\Api\Settings\UsersRolesController;
use App\Http\Api\Support\SupportContorller;
use App\Http\Api\Users\UsersController;
use App\Http\Api\Auth\GoogleController;
use App\Http\Api\Auth\OdniklassnikiController;
use App\Http\Api\Auth\VKController;
use App\Http\Api\Organizations\OrganizationsController;
use App\Http\Api\Organizations\OrganizationsTypesController;
use App\Http\Api\Organizations\OrganizationsUsersController;
use App\Http\Api\Statistics\StatisticsController;
use App\Http\Api\Users\UsersReviewsController;
use Illuminate\Support\Facades\Broadcast;

// Broadcast::routes(['middleware' => ['auth:sanctum']]);
// Route::post('/lessons/questions/remove', [QuestionsController::class, 'remove'])->middleware('checkAccess:Вопросы,delete');

// if (request()->hasHeader('X-Tenant')) {
//     Broadcast::routes(['middleware' => ['auth:sanctum', InitializeTenancyByRequestData::class]]);
// } else {
//     Broadcast::routes(['middleware' => ['auth:sanctum']]);
// }

// Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
//     return (int) $user->id === (int) $id;
// });
// require base_path('routes/channels.php');

Route::post('/auth/registration', [AuthController::class, 'registration'])->name('registration');
Route::post('/auth/login', [AuthController::class, 'login'])->name('login');
Route::post('/auth/password/forgot', [AuthController::class, 'forgotPassword'])->name('forgotPassword');
Route::post('/auth/password/verify/pin', [AuthController::class, 'verifyPinPassword'])->name('verifyPinPassword');
Route::post('/auth/password/reset', [AuthController::class, 'resetPassword'])->name('resetPassword');

Route::get('/auth/google/url', [GoogleController::class, 'authUrl']);
Route::get('/auth/google/callback', [GoogleController::class, 'authCallback']);
Route::get('/auth/vkontakte/url', [VKController::class, 'authUrl']);
Route::get('/auth/vkontakte/callback', [VKController::class, 'authCallback']);
Route::get('/auth/odnoklassniki/url', [OdniklassnikiController::class, 'authUrl']);
Route::get('/auth/odnoklassniki/callback', [OdniklassnikiController::class, 'authCallback']);


Route::get('/courses/getAll', [CoursesController::class, 'getAll']);


Route::get('/courses/getAllByCategotyId', [CoursesController::class, 'getAllByCategotyId']);
// Route::get('/courses/cutImageText', [CoursesController::class, 'cutImageText'])->name('cutImageText');

Route::get('/courses_categories/getAll', [CoursesCategoriesController::class, 'getAll']);
Route::get('/courses_categories/getOneByCategoryId', [CoursesCategoriesController::class, 'getOneByCategoryId']);
Route::get('/courses/getOneByCourseId', [CoursesController::class, 'getOneByCourseId']);

Route::get('/lessons/getFirstByCourseId', [LessonsController::class, 'getFirstByCourseId']);
Route::get('/lessons/getOneByLessonId', [LessonsController::class, 'getOneByLessonId']);



Route::get('/search', [SearchContorller::class, 'search']);
Route::post('/support/create', [SupportContorller::class, 'create']);

Route::middleware('auth:sanctum')->group(function () {
    //     Route::post('/broadcasting/auth', function (Illuminate\Http\Request $req) { 
    //         return Auth::user();
    //    });

    Route::post('/auth/user/edit', [AuthController::class, 'editAuthUser']);
    Route::post('/auth/user/edit/avatar', [AuthController::class, 'editAvatarAuthUser']);
    Route::get('/auth/getAuthUser', [AuthController::class, 'getAuthUser']);
    Route::post('/auth/logout', [AuthController::class, 'logout']);


    Route::post('/courses/add', [CoursesController::class, 'add'])->middleware('checkAccess:Курсы,create');
    Route::post('/courses/edit', [CoursesController::class, 'edit'])->middleware('checkAccess:Курсы,update');
    Route::post('/courses/remove', [CoursesController::class, 'remove'])->middleware('checkAccess:Курсы,delete');

    Route::post('/lessons/add', [LessonsController::class, 'add'])->middleware('checkAccess:Уроки,create');
    Route::post('/lessons/edit', [LessonsController::class, 'edit'])->middleware('checkAccess:Уроки,update');
    Route::post('/lessons/remove', [LessonsController::class, 'remove'])->middleware('checkAccess:Уроки,delete');

    Route::middleware('checkAccess:Уроки,read')->group(function () {
        Route::get('/lessons/getAllByCourseId', [LessonsController::class, 'getAllByCourseId']);
    });

    Route::post('/lessons/questions/add', [QuestionsController::class, 'add'])->middleware('checkAccess:Вопросы,create');
    Route::post('/lessons/questions/edit', [QuestionsController::class, 'edit'])->middleware('checkAccess:Вопросы,update');
    Route::post('/lessons/questions/remove', [QuestionsController::class, 'remove'])->middleware('checkAccess:Вопросы,delete');

    Route::middleware('checkAccess:Вопросы,read')->group(function () {
        Route::get('/lessons/questions/getAllByLessonId', [QuestionsController::class, 'getAllByLessonId'])->name('getAllByLessonId');
    });

    Route::post('/lessons/questions/questions_users_answers/edit', [QuestionsUsersAnswersController::class, 'edit']);

    Route::post('/courses_users_progress/add', [CoursesUsersProgressController::class, 'add']);
    Route::post('/courses_users_progress/edit', [CoursesUsersProgressController::class, 'edit']);
    Route::post('/courses_users_progress/remove', [CoursesUsersProgressController::class, 'remove']);
    Route::get('/courses_users_progress/getAll', [CoursesUsersProgressController::class, 'getAll']);
    Route::get('/courses_users_progress/getOneByCourseId', [CoursesUsersProgressController::class, 'getOneByCourseId']);
    Route::post('/courses_users_progress/update_cup_need_notify', [CoursesUsersProgressController::class, 'update_cup_need_notify']);
    Route::post('/courses_users_progress/send_course_diplom_to_email', [CoursesUsersProgressController::class, 'send_course_diplom_to_email']);
    Route::post('/courses_users_progress/send_course_diplom_order', [CoursesUsersProgressController::class, 'send_course_diplom_order']);
    Route::post('/courses_users_progress/send_reminder', [CoursesUsersProgressController::class, 'send_reminder']);


    Route::post('/lessons_users_progress/add', [LessonsUsersProgressController::class, 'add']);
    Route::post('/lessons_users_progress/edit', [LessonsUsersProgressController::class, 'edit']);
    Route::post('/lessons_users_progress/remove', [LessonsUsersProgressController::class, 'remove']);
    Route::get('/lessons_users_progress/getAllByCupId', [LessonsUsersProgressController::class, 'getAllByCupId']);
    Route::get('/lessons_users_progress/getOneByLessonId', [LessonsUsersProgressController::class, 'getOneByLessonId']);

    Route::get('/chats/getAllByUser', [ChatsController::class, 'getAllByUser']);
    Route::get('/chats/getOneById', [ChatsController::class, 'getOneById']);
    Route::post('/chats/create', [ChatsController::class, 'create']);

    Route::post('/chats/messages/sendMessage', [MessagesController::class, 'sendMessage']);

    Route::post('/users/add', [UsersController::class, 'add'])->middleware('checkAccess:Пользователи,create');
    Route::post('/users/edit', [UsersController::class, 'edit'])->middleware('checkAccess:Пользователи,update');
    Route::post('/users/remove', [UsersController::class, 'remove'])->middleware('checkAccess:Пользователи,delete');

    Route::middleware('checkAccess:Пользователи,full_read')->group(function () {
        Route::get('/users/getAll', [UsersController::class, 'getAll']);
        Route::get('/users/getAllByRoleId', [UsersController::class, 'getAllByRoleId']);
        Route::get('/users/getAllMyUsersByRoleId', [UsersController::class, 'getAllMyUsersByRoleId']);
        Route::get('/users/getAllWithoutUserByRoleId', [UsersController::class, 'getAllWithoutUserByRoleId']);
        Route::get('/users/getOneByUserId', [UsersController::class, 'getOneByUserId']);
    });

    Route::get('/settings/modules/getAll', [ModulesController::class, 'getAll']);
    Route::get('/settings/users_roles/getAll', [UsersRolesController::class, 'getAll']);
    Route::post('/settings/users_roles_access/add', [UsersRolesAccessController::class, 'add']);
    Route::post('/settings/users_roles_access/edit', [UsersRolesAccessController::class, 'edit']);
    Route::post('/settings/users_roles_access/remove', [UsersRolesAccessController::class, 'remove']);

    Route::get('/statistics/users', [StatisticsController::class, 'users'])->middleware('checkAccess:Статистика,read');
    Route::get('/statistics/courses_users_progress', [StatisticsController::class, 'courses_users_progress'])->middleware('checkAccess:Статистика,read');
    Route::get('/statistics/getStatisticByCourse', [StatisticsController::class, 'getStatisticByCourse'])->middleware('checkAccess:Статистика,read');
    Route::get('/statistics/getUsersEmailByLup', [StatisticsController::class, 'getUsersEmailByLup'])->middleware('checkAccess:Статистика,read');

    Route::get('/organizations/getAll', [OrganizationsController::class, 'getAll'])->middleware('checkAccess:Организации,read');
    Route::get('/organizations/getOneById', [OrganizationsController::class, 'getOneById'])->middleware('checkAccess:Организации,read');
    Route::post('/organizations/create', [OrganizationsController::class, 'create'])->middleware('checkAccess:Организации,create');
    Route::post('/organizations/update', [OrganizationsController::class, 'update'])->middleware('checkAccess:Организации,update');
    Route::post('/organizations/delete', [OrganizationsController::class, 'delete'])->middleware('checkAccess:Организации,delete');

    Route::get('/organizations_types/getAll', [OrganizationsTypesController::class, 'getAll'])->middleware('checkAccess:Типы организаций,read');

    Route::post('/organizations_users/create', [OrganizationsUsersController::class, 'create'])->middleware('checkAccess:Члены организаций,create');
    Route::post('/organizations_users/delete', [OrganizationsUsersController::class, 'delete'])->middleware('checkAccess:Члены организаций,delete');

    Route::get('/notifications/getAll', [NotificationsController::class, 'getAll']);
    Route::post('/notifications/markAsReadOneById', [NotificationsController::class, 'markAsReadOneById']);
    Route::post('/notifications/markAsReadAll', [NotificationsController::class, 'markAsReadAll']);
    Route::post('/notifications/sendNotifications', [NotificationsController::class, 'sendNotifications'])->middleware('checkAccess:Уведомления,create');

    Route::get('/users_reviews/getAll', [UsersReviewsController::class, 'getAll'])->middleware('checkAccess:Отзывы пользователей,read');
    Route::get('/users_reviews/getOneById', [UsersReviewsController::class, 'getOneById'])->middleware('checkAccess:Отзывы пользователей,read');
    Route::post('/users_reviews/create', [UsersReviewsController::class, 'create'])->middleware('checkAccess:Отзывы пользователей,create');
    Route::post('/users_reviews/update', [UsersReviewsController::class, 'update'])->middleware('checkAccess:Отзывы пользователей,update');
    Route::post('/users_reviews/delete', [UsersReviewsController::class, 'delete'])->middleware('checkAccess:Отзывы пользователей,delete');
});
