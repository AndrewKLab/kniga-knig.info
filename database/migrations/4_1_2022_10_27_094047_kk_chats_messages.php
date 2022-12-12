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
        Schema::create('kk_chats_messages', function (Blueprint $table) {
            $table->bigIncrements('kk_cm_id')->comment('ID записи');
            $table->foreignId('kk_cm_chat_id')->index('kk_cm_id')->comment('ID Чата')->references('kk_chat_id')->on('kk_chats')->onUpdate('cascade')->onDelete('cascade');
            $table->foreignId('kk_cm_send_from_user_id')->index('kk_cm_send_from_user_id')->comment('ID Отправившего сообщение пользователя');
            $table->foreignId('kk_cm_send_to_user_id')->index('kk_cm_send_to_user_id')->comment('ID Получившего сообщение пользователя');
            $table->longText('kk_cm_message')->nullable(true)->comment('Текст сообщения');
            $table->longText('kk_cm_files')->nullable(true)->comment('Файлы сообщения');
            $table->tinyInteger('kk_cm_read_status')->default(0)->comment('Прочитанное сообщение');
            $table->timestamp('kk_cm_created_at')->useCurrent()->comment('Дата создания');
            $table->timestamp('kk_cm_updated_at')->useCurrent()->useCurrentOnUpdate()->comment('Дата обновления');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('kk_chats_messages');
    }
};