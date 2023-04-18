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
        Schema::create('kk_users', function (Blueprint $table) {
            $table->bigIncrements('kk_user_id')->nullable(true)->comment('ID записи');
            $table->foreignId('kk_user_role_id')->nullable(true)->index('kk_user_role_id')->comment('ID Роли Пользователя');
            $table->foreignId('kk_user_admin_id')->nullable(true)->index('kk_user_admin_id')->comment('ID Администратора');
            $table->foreignId('kk_user_coordinator_id')->nullable(true)->index('kk_user_coordinator_id')->comment('ID Координатора');
            $table->foreignId('kk_user_pastor_id')->nullable(true)->index('kk_user_pastor_id')->comment('ID Пастора');
            $table->foreignId('kk_user_teather_id')->nullable(true)->index('kk_user_teather_id')->comment('ID Учителя');
            $table->foreignId('kk_user_promouter_id')->nullable(true)->index('kk_user_promouter_id')->comment('ID Сеятеля');
            $table->tinyInteger('kk_user_active')->default(1)->comment('Опубликованная запись');
            $table->tinyInteger('kk_user_offline_user')->default(0)->comment('Оффлайн пользователь');
            $table->tinyInteger('kk_user_remember_token')->default(0)->comment('Запомнить меня');
            $table->string('kk_user_firstname')->nullable(true)->comment('Имя');
            $table->string('kk_user_lastname')->nullable(true)->comment('Фамилия');
            $table->string('kk_user_middlename')->nullable(true)->comment('Отчетво');
            $table->bigInteger('kk_user_phonenumber')->comment('Номер телефона');
            $table->string('kk_user_email')->nullable(true)->comment('E-mail');
            $table->string('kk_user_country')->nullable(true)->comment('Страна');
            $table->string('kk_user_sity')->nullable(true)->comment('Город');
            $table->string('kk_user_commune')->nullable(true)->comment('Община');
            $table->string('kk_user_password', 2048)->comment('Пароль');
            $table->string('kk_user_access')->default('limited')->comment('Доступ к курсам');
            $table->string('kk_user_avatar')->nullable(true)->comment('Аватар');

            $table->timestamp('kk_user_email_verified_at')->nullable(true)->comment('Дата верификации Email');
            $table->timestamp('kk_user_created_at')->useCurrent()->comment('Дата создания');
            $table->timestamp('kk_user_updated_at')->useCurrent()->useCurrentOnUpdate()->comment('Дата обновления');

            // $table->string('name');
            // $table->string('email')->unique();
            // $table->timestamp('email_verified_at')->nullable();
            // $table->string('password');
            // $table->rememberToken();
            // $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('kk_users');
    }
};
