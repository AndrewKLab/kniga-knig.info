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
        Schema::create('kk_chats', function (Blueprint $table) {
            $table->bigIncrements('kk_chat_id')->comment('ID записи');
            $table->foreignId('kk_chat_user_one_id')->index('kk_chat_user_one_id')->comment('ID Первого пользователя')->references('kk_user_id')->on('kk_users')->onUpdate('cascade')->onDelete('cascade');
            $table->foreignId('kk_chat_user_two_id')->index('kk_chat_user_two_id')->comment('ID Второго пользователя')->references('kk_user_id')->on('kk_users')->onUpdate('cascade')->onDelete('cascade');
            $table->timestamp('kk_chat_created_at')->useCurrent()->comment('Дата создания');
            $table->timestamp('kk_chat_updated_at')->useCurrent()->useCurrentOnUpdate()->comment('Дата обновления');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('kk_chats');
    }
};