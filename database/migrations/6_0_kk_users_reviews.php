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
        Schema::create('kk_users_reviews', function (Blueprint $table) {
            $table->bigIncrements('kk_ur_id')->comment('ID записи');
            $table->foreignId('kk_ur_user_id')->index('kk_ur_user_id')->comment('ID Пользователя')->references('kk_user_id')->on('kk_users')->onUpdate('cascade')->onDelete('cascade');
            $table->foreignId('kk_ur_course_id')->nullable(true)->index('kk_ur_course_id')->comment('ID Курса')->references('kk_course_id')->on('kk_courses')->onUpdate('cascade')->onDelete('cascade');
            $table->foreignId('kk_ur_lesson_id')->nullable(true)->index('kk_ur_lesson_id')->comment('ID Урока')->references('kk_lesson_id')->on('kk_lessons')->onUpdate('cascade')->onDelete('cascade');
            $table->tinyInteger('kk_ur_assessment')->default(0)->comment('Верный ответ');
            $table->string('kk_ur_text', 500)->nullable(true)->comment('Отзыв');
            $table->timestamp('kk_ur_created_at')->useCurrent()->comment('Дата создания');
            $table->timestamp('kk_ur_updated_at')->useCurrent()->useCurrentOnUpdate()->comment('Дата обновления');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('kk_users_reviews');
    }
};
