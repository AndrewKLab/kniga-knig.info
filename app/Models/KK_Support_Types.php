<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class KK_Support_Types extends Model
{
    protected $table = 'kk_support_types';
    protected $primaryKey = 'kk_st_id';

    const CREATED_AT = 'kk_st_created_at';
    const UPDATED_AT = 'kk_st_updated_at'; 

    protected $fillable = [
        'kk_st_name',
    ];
}
