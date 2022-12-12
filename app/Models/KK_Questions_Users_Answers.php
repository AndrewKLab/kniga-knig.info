<?php

namespace App\Models;

use App\Models\KK_Courses;
use Illuminate\Database\Eloquent\Model;
use App\Classes\RequestHelper;

class KK_Questions_Users_Answers extends Model
{
    protected $table = 'kk_questions_users_answers';
    protected $primaryKey = 'kk_qua_id';

    const CREATED_AT = 'kk_qua_created_at';
    const UPDATED_AT = 'kk_qua_updated_at';

    protected $fillable = [
        'kk_qua_user_id',
        'kk_qua_lup_id',
        'kk_qua_question_id',
        'kk_qua_answer_id',
        'kk_qua_text',
        'kk_qua_correct',
    ];


}
