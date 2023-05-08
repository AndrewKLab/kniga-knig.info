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
        Schema::create('kk_organizations_users', function (Blueprint $table) {
            $table->bigIncrements('kk_ou_id')->comment('ID записи');
            $table->foreignId('kk_ou_organization_id')->nullable(true)->index('kk_ou_organization_id')->comment('ID Организации')->references('kk_organization_id')->on('kk_organizations')->onUpdate('cascade')->onDelete('cascade');
            $table->foreignId('kk_ou_user_id')->nullable(true)->index('kk_ou_user_id')->comment('ID Пользователя')->references('kk_user_id')->on('kk_users')->onUpdate('cascade')->onDelete('cascade');
            $table->timestamp('kk_ou_created_at')->useCurrent()->comment('Дата создания');
            $table->timestamp('kk_ou_updated_at')->useCurrent()->useCurrentOnUpdate()->comment('Дата обновления');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('kk_organizations_users');
    }
};
