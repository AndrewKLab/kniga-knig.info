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
        Schema::create('kk_lessons', function (Blueprint $table) {
            $table->bigIncrements('kk_lesson_id')->comment('ID записи');
            $table->foreignId('kk_lesson_course_id')->index('kk_lesson_course_id')->comment('ID Курса')->references('kk_course_id')->on('kk_courses')->onUpdate('cascade')->onDelete('cascade');
            $table->foreignId('kk_lesson_autor_id')->index('kk_lesson_autor_id')->nullable(true)->comment('ID Автора');
            $table->integer('kk_lesson_number')->comment('Номер');
            $table->tinyInteger('kk_lesson_published')->default(1)->comment('Опубликованная запись');
            $table->string('kk_lesson_name')->nullable(true)->comment('Название');
            $table->longText('kk_lesson_description')->nullable(true)->comment('Описание');
            $table->longText('kk_lesson_text')->nullable(true)->comment('Текст');
            $table->string('kk_lesson_image')->nullable(true)->comment('Изображение');
            $table->string('kk_lesson_audio')->nullable(true)->comment('Аудио');
            $table->string('kk_lesson_video')->nullable(true)->comment('Видео');
            $table->timestamp('kk_lesson_created_at')->useCurrent()->comment('Дата создания');
            $table->timestamp('kk_lesson_updated_at')->useCurrent()->useCurrentOnUpdate()->comment('Дата обновления');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('kk_lessons');
    }
};