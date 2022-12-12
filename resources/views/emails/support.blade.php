@component('mail::message')
@if(!empty($mail->support_type))# Обращение типа "{{$mail->support_type->kk_st_name}}"@endif<br>
@if(!empty($mail->support_type))
<b>Имя:</b> {{$mail->kk_support_name}}<br>
<b>E-mail:</b> {{$mail->kk_support_email}}

<b>Тема:</b> <span>{{$mail->kk_support_subject}}</span><br>
<b>Сообщение:</b><br><span>{{$mail->kk_support_message}}</span>
@endif


Получено с ресурса: {{ config('app.name') }}
@endcomponent