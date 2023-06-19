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
        Schema::create('kk_questions', function (Blueprint $table) {
            $table->bigIncrements('kk_question_id')->comment('ID записи');
            $table->foreignId('kk_question_lesson_id')->index('kk_question_lesson_id')->comment('ID Урока')->references('kk_lesson_id')->on('kk_lessons')->onUpdate('cascade')->onDelete('cascade');
            $table->string('kk_question_type')->comment('Тип вопроса');
            $table->string('kk_question_text')->comment('Текст');
            $table->timestamp('kk_question_created_at')->useCurrent()->comment('Дата создания');
            $table->timestamp('kk_question_updated_at')->useCurrent()->useCurrentOnUpdate()->comment('Дата обновления');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('kk_questions');
    }
};