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
        Schema::create('kk_support', function (Blueprint $table) {
            $table->bigIncrements('kk_support_id')->comment('ID записи');
            $table->foreignId('kk_support_user_id')->index('kk_support_user_id')->comment('ID Пользователя');
            $table->foreignId('kk_support_type_id')->index('kk_support_type_id')->comment('ID Типа');
            $table->tinyInteger('kk_cc_published')->comment('Опубликованная запись');
            $table->string('kk_support_name')->nullable(true)->comment('Название');
            $table->string('kk_support_email')->nullable(true)->comment('E-mail');
            $table->string('kk_support_subject')->nullable(true)->comment('Тема');
            $table->longText('kk_support_message')->nullable(true)->comment('Описание');
            $table->timestamp('kk_support_created_at')->useCurrent()->comment('Дата создания');
            $table->timestamp('kk_support_updated_at')->useCurrent()->useCurrentOnUpdate()->comment('Дата обновления');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('kk_support');
    }
};