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
        Schema::create('kk_support_types', function (Blueprint $table) {
            $table->bigIncrements('kk_st_id')->comment('ID записи');
            $table->string('kk_st_name')->nullable(true)->comment('Название');
            $table->timestamp('kk_st_created_at')->useCurrent()->comment('Дата создания');
            $table->timestamp('kk_st_updated_at')->useCurrent()->useCurrentOnUpdate()->comment('Дата обновления');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('kk_support_types');
    }
};