<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $table = 'posts';
    protected $fillable = [
        'cat_id',
        'header_id',
        'filter_id',
        'read_time',
        'title',
        'slug',
        'description',
        'image',
        'preview_title_1',
        'preview_title_2',
        'preview_title_3',
        'preview_title_4',
        'preview_title_5',
        'preview_title_6',
        'preview_title_7',
        'preview_title_8',
        'preview_title_9',
        'preview_title_10',
        'preview_title_11',
        'preview_title_12',
        'preview_image_1',
        'preview_image_2',
        'preview_image_3',
        'preview_image_4',
        'preview_image_5',
        'preview_image_6',
        'preview_image_7',
        'preview_image_8',
        'preview_image_9',
        'preview_image_10',
        'preview_image_11',
        'preview_image_12',
        'key_f_1',
        'key_f_2',
        'key_f_3',
        'key_f_4',
        'key_f_5',
        'key_f_6',
        'key_f_7',
        'key_f_8',
        'file_url',
        'preview_url',
        'gif_file',
        'author_name',
        'author_url',
        'others',
        'views'
    ];

    public function categorys()
    {
        return $this->belongsTo(Category::class, 'cat_id');
    }
}
