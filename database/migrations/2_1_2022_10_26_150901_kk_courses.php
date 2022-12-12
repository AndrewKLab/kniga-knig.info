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
        Schema::create('kk_courses', function (Blueprint $table) {
            $table->bigIncrements('kk_course_id')->comment('ID записи');
            $table->foreignId('kk_course_categoty_id')->index('kk_course_categoty_id')->comment('ID Категории курса');
            $table->foreignId('kk_course_autor_id')->index('kk_course_autor_id')->comment('ID Автора');
            $table->tinyInteger('kk_course_published')->default(1)->comment('Опубликованная запись');
            $table->string('kk_course_name')->nullable(true)->comment('Название');
            $table->longText('kk_course_description')->nullable(true)->comment('Описание');
            $table->string('kk_course_image')->nullable(true)->comment('Изображение');
            $table->timestamp('kk_course_created_at')->useCurrent()->comment('Дата создания');
            $table->timestamp('kk_course_updated_at')->useCurrent()->useCurrentOnUpdate()->comment('Дата обновления');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('kk_courses');
    }
};