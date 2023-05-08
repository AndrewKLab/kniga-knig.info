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
        Schema::create('kk_organizations', function (Blueprint $table) {
            $table->bigIncrements('kk_organization_id')->comment('ID записи');
            $table->foreignId('kk_organization_parrent_id')->nullable(true)->index('kk_organization_parrent_id')->comment('ID Родительской организации');
            $table->foreignId('kk_organization_type_id ')->nullable(true)->index('kk_organization_type_id ')->comment('Тип организации')->references('kk_ot_id')->on('kk_organizations_types')->onUpdate('cascade')->onDelete('cascade');
            $table->string('kk_organization_name')->comment('Название');
            $table->timestamp('kk_organization_created_at')->useCurrent()->comment('Дата создания');
            $table->timestamp('kk_organization_updated_at')->useCurrent()->useCurrentOnUpdate()->comment('Дата обновления');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('kk_organizations');
    }
};
