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
        Schema::create('kk_users_roles_access', function (Blueprint $table) {
            $table->bigIncrements('kk_ura_id')->comment('ID записи');
            $table->foreignId('kk_ura_role_id')->index('kk_ura_role_id')->comment('ID Роли')->references('kk_role_id')->on('kk_users_roles')->onUpdate('cascade')->onDelete('cascade');
            $table->foreignId('kk_ura_module_id')->index('kk_ura_module_id')->comment('ID Модуля')->references('kk_module_id')->on('kk_modules')->onUpdate('cascade')->onDelete('cascade');

            $table->tinyInteger('kk_ura_create_access')->default(0)->comment('Доступ на создание');
            $table->tinyInteger('kk_ura_read_access')->default(1)->comment('Доступ на чтение');
            $table->tinyInteger('kk_ura_full_read_access')->default(0)->comment('Доступ на полное чтение');
            $table->tinyInteger('kk_ura_update_access')->default(0)->comment('Доступ на обновление');
            $table->tinyInteger('kk_ura_delete_access')->default(0)->comment('Доступ на удаление');
            
            $table->timestamp('kk_ura_created_at')->useCurrent()->comment('Дата создания');
            $table->timestamp('kk_ura_updated_at')->useCurrent()->useCurrentOnUpdate()->comment('Дата обновления');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('kk_users_roles_access');
    }
};