<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('kk_lessons_users_progress', function (Blueprint $table) {
            $table->bigIncrements('kk_lup_id')->comment('ID записи');
            $table->foreignId('kk_lup_cup_id')->index('kk_lup_cup_id')->comment('ID Проходимого курса')->references('kk_cup_id')->on('kk_courses_users_progress')->onUpdate('cascade')->onDelete('cascade');
            $table->foreignId('kk_lup_user_id')->index('kk_lup_user_id')->comment('ID Пользователя');
            $table->foreignId('kk_lup_course_id')->index('kk_lup_course_id')->comment('ID Курса');
            $table->foreignId('kk_lup_lesson_id')->index('kk_lup_lesson_id')->comment('ID Урока');
            $table->string('kk_lup_status')->nullable(true)->comment('Статус');
            $table->integer('kk_lup_assessment')->nullable(true)->comment('Оценка');
            $table->tinyInteger('kk_lup_checked')->default(0)->comment('Урок проверен ');
            $table->timestamp('kk_lup_started_at')->useCurrent()->comment('Дата страта');
            $table->timestamp('kk_lup_finished_at')->nullable(true)->comment('Дата финиша');
            $table->timestamp('kk_lup_created_at')->useCurrent()->comment('Дата создания');
            $table->timestamp('kk_lup_updated_at')->useCurrent()->useCurrentOnUpdate()->comment('Дата обновления');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('kk_lessons_users_progress');
    }
};