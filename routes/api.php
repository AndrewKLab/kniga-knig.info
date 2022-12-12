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
use App\Http\Api\SearchContorller;
use App\Http\Api\Settings\ModulesController;
use App\Http\Api\Settings\UsersRolesAccessController;
use App\Http\Api\Settings\UsersRolesController;
use App\Http\Api\Support\SupportContorller;
use App\Http\Api\Users\UsersController;

Route::post('/auth/registration', [AuthController::class, 'registration'])->name('registration');
Route::post('/auth/login', [AuthController::class, 'login'])->name('login');
Route::post('/auth/password/forgot', [AuthController::class, 'forgotPassword'])->name('forgotPassword');
Route::post('/auth/password/verify/pin', [AuthController::class, 'verifyPinPassword'])->name('verifyPinPassword');
Route::post('/auth/password/reset', [AuthController::class, 'resetPassword'])->name('resetPassword');


Route::get('/courses/getAll', [CoursesController::class, 'getAll'])->name('getAll');


Route::get('/courses/getAllByCategotyId', [CoursesController::class, 'getAllByCategotyId'])->name('getAllByCategotyId');
// Route::get('/courses/cutImageText', [CoursesController::class, 'cutImageText'])->name('cutImageText');

Route::get('/courses_categories/getAll', [CoursesCategoriesController::class, 'getAll'])->name('getAll');
Route::get('/courses_categories/getOneByCategoryId', [CoursesCategoriesController::class, 'getOneByCategoryId'])->name('getOneByCategoryId');
Route::get('/courses/getOneByCourseId', [CoursesController::class, 'getOneByCourseId'])->name('getOneByCourseId');

Route::get('/lessons/getFirstByCourseId', [LessonsController::class, 'getFirstByCourseId'])->name('getFirstByCourseId');



Route::get('/search', [SearchContorller::class, 'search'])->name('search');

Route::post('/support/create', [SupportContorller::class, 'create'])->name('create');

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/auth/user/edit', [AuthController::class, 'editAuthUser'])->name('editAuthUser');
    Route::post('/auth/user/edit/avatar', [AuthController::class, 'editAvatarAuthUser'])->name('editAvatarAuthUser');
    Route::get('/auth/getAuthUser', [AuthController::class, 'getAuthUser'])->name('getAuthUser');
    Route::post('/auth/logout', [AuthController::class, 'logout'])->name('logout');


    Route::post('/courses/add', [CoursesController::class, 'add'])->name('add')->middleware('checkAccess:Курсы,create');
    Route::post('/courses/edit', [CoursesController::class, 'edit'])->name('edit')->middleware('checkAccess:Курсы,update');
    Route::post('/courses/remove', [CoursesController::class, 'remove'])->name('remove')->middleware('checkAccess:Курсы,delete');
   
    Route::post('/lessons/add', [LessonsController::class, 'add'])->name('add')->middleware('checkAccess:Уроки,create');
    Route::post('/lessons/edit', [LessonsController::class, 'edit'])->name('edit')->middleware('checkAccess:Уроки,update');
    Route::post('/lessons/remove', [LessonsController::class, 'remove'])->name('remove')->middleware('checkAccess:Уроки,delete');

    Route::middleware('checkAccess:Уроки,read')->group(function () {
        Route::get('/lessons/getAllByCourseId', [LessonsController::class, 'getAllByCourseId'])->name('getAllByCourseId');
        Route::get('/lessons/getOneByLessonId', [LessonsController::class, 'getOneByLessonId'])->name('getOneByLessonId');
    });

    Route::post('/lessons/questions/add', [QuestionsController::class, 'add'])->name('add')->middleware('checkAccess:Вопросы,create');
    Route::post('/lessons/questions/edit', [QuestionsController::class, 'edit'])->name('edit')->middleware('checkAccess:Вопросы,update');
    Route::post('/lessons/questions/remove', [QuestionsController::class, 'remove'])->name('remove')->middleware('checkAccess:Вопросы,delete');

    Route::middleware('checkAccess:Вопросы,read')->group(function () {
        Route::get('/lessons/questions/getAllByLessonId', [QuestionsController::class, 'getAllByLessonId'])->name('getAllByLessonId');
    });

    Route::post('/courses_users_progress/add', [CoursesUsersProgressController::class, 'add'])->name('add');
    Route::post('/courses_users_progress/edit', [CoursesUsersProgressController::class, 'edit'])->name('edit');
    Route::post('/courses_users_progress/remove', [CoursesUsersProgressController::class, 'remove'])->name('remove');
    Route::get('/courses_users_progress/getAll', [CoursesUsersProgressController::class, 'getAll'])->name('getAll');
    Route::get('/courses_users_progress/getOneByCourseId', [CoursesUsersProgressController::class, 'getOneByCourseId'])->name('getOneByCourseId');


    Route::post('/lessons_users_progress/add', [LessonsUsersProgressController::class, 'add'])->name('add');
    Route::post('/lessons_users_progress/edit', [LessonsUsersProgressController::class, 'edit'])->name('edit');
    Route::post('/lessons_users_progress/remove', [LessonsUsersProgressController::class, 'remove'])->name('remove');
    Route::get('/lessons_users_progress/getAllByCupId', [LessonsUsersProgressController::class, 'getAllByCupId'])->name('getAllByCupId');
    Route::get('/lessons_users_progress/getOneByLessonId', [LessonsUsersProgressController::class, 'getOneByLessonId'])->name('getOneByLessonId');

    Route::get('/chats/getAllByUser', [ChatsController::class, 'getAllByUser'])->name('getAllByUser');
    Route::get('/chats/getOneById', [ChatsController::class, 'getOneById'])->name('getOneById');

    Route::post('/chats/messages/sendMessage', [MessagesController::class, 'sendMessage'])->name('sendMessage');

    Route::post('/users/add', [UsersController::class, 'add'])->name('add')->middleware('checkAccess:Пользователи,create');
    Route::post('/users/edit', [UsersController::class, 'edit'])->name('edit')->middleware('checkAccess:Пользователи,update');
    Route::post('/users/remove', [UsersController::class, 'remove'])->name('remove')->middleware('checkAccess:Пользователи,delete');

    Route::middleware('checkAccess:Пользователи,full_read')->group(function () {
        Route::get('/users/getAllByRoleId', [UsersController::class, 'getAllByRoleId'])->name('getAllByRoleId');
        Route::get('/users/getAllMyUsersByRoleId', [UsersController::class, 'getAllMyUsersByRoleId'])->name('getAllMyUsersByRoleId');
        Route::get('/users/getAllWithoutUserByRoleId', [UsersController::class, 'getAllWithoutUserByRoleId'])->name('getAllWithoutUserByRoleId');
        Route::get('/users/getOneByUserId', [UsersController::class, 'getOneByUserId'])->name('getOneByUserId');
    });

    Route::get('/settings/modules/getAll', [ModulesController::class, 'getAll'])->name('getAll');
    Route::get('/settings/users_roles/getAll', [UsersRolesController::class, 'getAll'])->name('getAll');
    Route::post('/settings/users_roles_access/add', [UsersRolesAccessController::class, 'add'])->name('add');
    Route::post('/settings/users_roles_access/edit', [UsersRolesAccessController::class, 'edit'])->name('edit');
    Route::post('/settings/users_roles_access/remove', [UsersRolesAccessController::class, 'remove'])->name('remove');
});
