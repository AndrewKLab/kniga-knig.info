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
        Schema::create('kk_users_roles', function (Blueprint $table) {
            $table->bigIncrements('kk_role_id')->comment('ID записи');
            $table->integer('kk_role_level')->nullable(true)->comment('Уровень Роли');
            $table->string('kk_role_type')->comment('Тип Роли');
            $table->string('kk_role_name')->comment('Имя Роли');
            $table->timestamp('kk_role_created_at')->useCurrent()->comment('Дата создания');
            $table->timestamp('kk_role_updated_at')->useCurrent()->useCurrentOnUpdate()->comment('Дата обновления');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('kk_users_roles');
    }
};