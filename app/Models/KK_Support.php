<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class KK_Support extends Model
{
    protected $table = 'kk_support';
    protected $primaryKey = 'kk_support_id';

    const CREATED_AT = 'kk_support_created_at';
    const UPDATED_AT = 'kk_support_updated_at'; 

    protected $fillable = [
        'kk_support_user_id',
        'kk_support_type_id',
        'kk_support_name',
        'kk_support_email',
        'kk_support_message',
    ];
}
