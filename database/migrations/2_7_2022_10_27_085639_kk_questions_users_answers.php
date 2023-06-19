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
        Schema::create('kk_questions_users_answers', function (Blueprint $table) {
            $table->bigIncrements('kk_qua_id')->comment('ID записи');
            $table->foreignId('kk_qua_user_id')->index('kk_qua_user_id')->comment('ID Пользователя');
            $table->foreignId('kk_qua_lup_id')->index('kk_qua_lup_id')->comment('ID Проходимого урока')->references('kk_lup_id')->on('kk_lessons_users_progress')->onUpdate('cascade')->onDelete('cascade');
            $table->foreignId('kk_qua_question_id')->index('kk_qua_question_id')->comment('ID Вопроса')->references('kk_question_id')->on('kk_questions')->onUpdate('cascade')->onDelete('cascade');
            $table->foreignId('kk_qua_answer_id')->index('kk_qua_answer_id')->comment('ID Ответа')->references('kk_qa_id')->on('kk_questions_answers')->onUpdate('cascade')->onDelete('cascade');;
            $table->string('kk_qua_text')->nullable(true)->comment('Текстовый ответ');
            $table->tinyInteger('kk_qua_correct')->default(0)->comment('Верный ответ');
            $table->timestamp('kk_qua_created_at')->useCurrent()->comment('Дата создания');
            $table->timestamp('kk_qua_updated_at')->useCurrent()->useCurrentOnUpdate()->comment('Дата обновления');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('kk_questions_users_answers');
    }
};