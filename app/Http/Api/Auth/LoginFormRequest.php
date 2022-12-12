<?php

namespace App\Http\Api\Auth;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;
use TimeHunter\LaravelGoogleReCaptchaV3\Validations\GoogleReCaptchaV3ValidationRule;

class LoginFormRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'kk_user_email_or_kk_user_phone' => ['required', 'string', 'max:255',],
            'kk_user_password' => ['required', 'string'],
            'g-recaptcha-response' => [new GoogleReCaptchaV3ValidationRule('login')]
        ];
    }

    public function failedValidation(Validator $validator)
    {

       throw new HttpResponseException(response()->json([
         'success'   => false,
         'message'   => 'Ошибка валидации!',
         'data'      => $validator->errors()
       ],400));
    }  
}
