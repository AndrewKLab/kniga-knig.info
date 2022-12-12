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
        Schema::create('kk_modules', function (Blueprint $table) {
            $table->bigIncrements('kk_module_id')->comment('ID записи');
            $table->string('kk_module_name')->comment('Название модуля');            
            $table->timestamp('kk_module_created_at')->useCurrent()->comment('Дата создания');
            $table->timestamp('kk_module_updated_at')->useCurrent()->useCurrentOnUpdate()->comment('Дата обновления');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('kk_modules');
    }
};