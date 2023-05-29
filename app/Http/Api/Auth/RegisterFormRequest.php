<?php

namespace App\Http\Api\Auth;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;
use TimeHunter\LaravelGoogleReCaptchaV3\Validations\GoogleReCaptchaV3ValidationRule;

class RegisterFormRequest extends FormRequest
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
            'kk_user_firstname' => ['required', 'string', 'max:255'],
            'kk_user_lastname' => ['required', 'string', 'max:255'],
            'kk_user_middlename' => ['string', 'max:255'],
            'kk_user_phonenumber' => ['nullable', 'numeric', 'digits:10', 'unique:kk_users'],
            'kk_user_email' => ['required', 'string', 'email', 'max:255', 'unique:kk_users'],

            'kk_user_country' => ['string', 'nullable', 'max:255'],
            'kk_user_sity' => ['string', 'nullable', 'max:255'],
            'kk_user_commune' => ['string', 'nullable', 'max:255'],

            'kk_user_password' => ['required', 'string', 'min:6', 'confirmed'],
            'kk_user_access' => ['string', 'nullable', 'max:255'],
            'kk_user_offline_user' => ['numeric', 'digits:1'],
            'kk_user_role_id' => ['numeric', 'max:11'],
            'kk_user_admin_id' => ['numeric', 'max:11'],
            'kk_user_coordinator_id' => ['numeric', 'max:11'],
            'kk_user_teather_id' => ['numeric', 'max:11'],
            'kk_user_promouter_id' => ['numeric', 'max:11'],

            'kk_user_avatar' => ['string', 'nullable', 'max:255'],

            'kk_user_password_privacy_politic_confirmation' => ['required', 'string'],
            // 'g-recaptcha-response' => [new GoogleReCaptchaV3ValidationRule('registration')]
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
