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
        Schema::create('kk_courses_categories', function (Blueprint $table) {
            $table->bigIncrements('kk_cc_id')->comment('ID записи');
            $table->foreignId('kk_cc_autor_id')->index('kk_cc_autor_id')->comment('ID Автора');
            $table->tinyInteger('kk_cc_published')->default(1)->comment('Опубликованная запись');
            $table->string('kk_cc_name')->nullable(true)->comment('Название');
            $table->longText('kk_cc_description')->nullable(true)->comment('Описание');
            $table->string('kk_cc_image')->nullable(true)->comment('Изображение');
            $table->timestamp('kk_cc_created_at')->useCurrent()->comment('Дата создания');
            $table->timestamp('kk_cc_updated_at')->useCurrent()->useCurrentOnUpdate()->comment('Дата обновления');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('kk_courses_categories');
    }
};