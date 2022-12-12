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
        Schema::create('kk_questions_answers', function (Blueprint $table) {
            $table->bigIncrements('kk_qa_id')->comment('ID записи');
            $table->foreignId('kk_qa_question_id')->index('kk_qa_lesson_id')->comment('ID Вопроса')->references('kk_question_id')->on('kk_questions')->onUpdate('cascade')->onDelete('cascade');
            $table->string('kk_qa_text')->comment('Текст');
            $table->tinyInteger('kk_qa_correct')->default(0)->comment('Верный ответ');
            $table->timestamp('kk_qa_created_at')->useCurrent()->comment('Дата создания');
            $table->timestamp('kk_qa_updated_at')->useCurrent()->useCurrentOnUpdate()->comment('Дата обновления');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('kk_questions_answers');
    }
};