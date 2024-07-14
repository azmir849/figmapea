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
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('cat_id')->constraint('categories')->onDelete('cascade');
            $table->foreignId('header_id')->constraint('categories')->onDelete('cascade');
            $table->foreignId('filter_id')->constraint('categories')->onDelete('cascade');
            $table->integer('read_time');
            $table->string('image');
            $table->text('title');
            $table->text('slug');
            $table->text('description');

            $table->text('preview_title_1');
            $table->text('preview_title_2');
            $table->text('preview_title_3');
            $table->text('preview_title_4');
            $table->text('preview_title_5');
            $table->text('preview_title_6');
            $table->text('preview_title_7');
            $table->text('preview_title_8');
            $table->text('preview_title_9');
            $table->text('preview_title_10');
            $table->text('preview_title_11');
            $table->text('preview_title_12');

            $table->string('preview_image_1');
            $table->string('preview_image_2');
            $table->string('preview_image_3');
            $table->string('preview_image_4');
            $table->string('preview_image_5');
            $table->string('preview_image_6');
            $table->string('preview_image_7');
            $table->string('preview_image_8');
            $table->string('preview_image_9');
            $table->string('preview_image_10');
            $table->string('preview_image_11');
            $table->string('preview_image_12');

            $table->text('key_f_1');
            $table->text('key_f_2');
            $table->text('key_f_3');
            $table->text('key_f_4');
            $table->text('key_f_5');
            $table->text('key_f_6');
            $table->text('key_f_7');
            $table->text('key_f_8');

            $table->text('file_url');
            $table->text('preview_url');
            $table->text('gif_file');

            $table->text('author_name');
            $table->text('author_url');

            $table->text('others');


            $table->integer('views');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('posts');
    }
};
