<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Classes\RequestHelper;
use Illuminate\Support\Facades\Auth;

class KK_Chats_Messages extends Model
{
    protected $table = 'kk_chats_messages';
    protected $primaryKey = 'kk_cm_id';

    const CREATED_AT = 'kk_cm_created_at';
    const UPDATED_AT = 'kk_cm_updated_at'; 

    protected $fillable = [
        'kk_cm_chat_id',
        'kk_cm_send_from_user_id',
        'kk_cm_send_to_user_id',
        'kk_cm_message',
        'kk_cm_files',
        'kk_cm_read_status',
    ];

}
