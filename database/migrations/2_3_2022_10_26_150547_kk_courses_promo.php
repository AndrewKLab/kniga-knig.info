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
        Schema::create('kk_courses_promo', function (Blueprint $table) {
            $table->bigIncrements('kk_cp_id')->comment('ID записи');
            $table->foreignId('kk_cp_course_id')->index('kk_cp_course_id')->comment('ID Курса')->references('kk_course_id')->on('kk_courses')->onUpdate('cascade')->onDelete('cascade');
            $table->string('kk_cp_name')->nullable(true)->comment('Название');
            $table->string('kk_cp_sub_name')->nullable(true)->comment('Доп. Название');
            $table->longText('kk_cp_description')->nullable(true)->comment('Описание');
            $table->string('kk_cp_image')->nullable(true)->comment('Изображение');
            $table->tinyInteger('kk_cp_published')->default(0)->comment('Опубликованная запись');
            $table->timestamp('kk_cp_created_at')->useCurrent()->comment('Дата создания');
            $table->timestamp('kk_cp_updated_at')->useCurrent()->useCurrentOnUpdate()->comment('Дата обновления');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('kk_courses_promo');
    }
};
