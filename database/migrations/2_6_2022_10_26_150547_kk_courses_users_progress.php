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
        Schema::create('kk_courses_users_progress', function (Blueprint $table) {
            $table->bigIncrements('kk_cup_id')->comment('ID записи');
            $table->foreignId('kk_cup_user_id')->index('kk_cup_user_id')->comment('ID Пользователя')->references('kk_user_id')->on('kk_users')->onUpdate('cascade')->onDelete('cascade');
            $table->foreignId('kk_cup_course_id')->index('kk_cup_course_id')->comment('ID Курса')->references('kk_course_id')->on('kk_courses')->onUpdate('cascade')->onDelete('cascade');
            $table->string('kk_cup_status')->nullable(true)->comment('Статус');
            $table->integer('kk_cup_assessment')->nullable(true)->comment('Оценка');
            $table->timestamp('kk_cup_started_at')->useCurrent()->comment('Дата страта');
            $table->timestamp('kk_cup_finished_at')->nullable(true)->comment('Дата финиша');
            $table->timestamp('kk_cup_created_at')->useCurrent()->comment('Дата создания');
            $table->timestamp('kk_cup_updated_at')->useCurrent()->useCurrentOnUpdate()->comment('Дата обновления');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('kk_courses_users_progress');
    }
};