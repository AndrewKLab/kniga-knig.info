@component('mail::message')
    <table style="width:100%; border-collapse:collapse; border-spacing:0; margin:0; border:0;" cellpadding="0" cellspacing="0">
        <tr>
            <td style="padding-left:15px; padding-right:15px; ">
                <table class="r" style="margin: 0 auto;background-color:#ffffff;border-spacing: 0;width:600px;" align="center">
                    <tr>
                        <td style="padding-top:30px;padding-bottom:15px;padding-left:30px;padding-right:30px;">
                            <table valign="top" border="0" cellpadding="0" cellspacing="0" width="100%" style="width: 100%;">
                                <tr>
                                    <td style="text-align: left; padding: 0 0 0;">
                                        <div style="margin-right: auto; font-family: Helvetica Neue, Helvetica, Arial, sans-serif; color:#222222;font-size:28px;font-weight:bold;">
                                            <strong style="background-color: rgb(255, 255, 255); color: rgb(0, 0, 0); font-weight: 500;">
                                                Запрос на получение диплома курьером
                                            </strong>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
    <table style="width:100%; border-collapse:collapse; border-spacing:0; margin:0; border:0;" cellpadding="0" cellspacing="0">
        <tr>
            <td style="padding-left:15px; padding-right:15px; ">
                <table class="r" style="margin: 0 auto;background-color:#ffffff;border-spacing: 0;width:600px;" align="center">
                    <tr>
                        <td style="padding-top:15px;padding-bottom:15px;padding-left:30px;padding-right:30px;">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="width: 100%;">
                                <tr>
                                    <td style="text-align: left; padding: 0 0 0;">
                                        <div style="margin-right: auto; font-family: Helvetica Neue, Helvetica, Arial, sans-serif; color:#444444;font-size:20px;line-height:1.45;">
                                            <table width="100%" style="width: 100%;">
                                                <tbody>
                                                    <tr>
                                                        <td>Курс:</td>
                                                        <td>{{ $course->kk_course_name }}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Пользователь:</td>
                                                        <td>{{ $user->kk_user_lastname }} {{ $user->kk_user_firstname }}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Email:</td>
                                                        <td>{{ $user->kk_user_email }}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Номер телефона:</td>
                                                        <td>{{ $order->phonenumber }}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Область:</td>
                                                        <td>{{ $order->region }}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Город:</td>
                                                        <td>{{ $order->city }}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Улица:</td>
                                                        <td>{{ $order->street }}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Дом:</td>
                                                        <td>{{ $order->house }}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Номер квартиры:</td>
                                                        <td>{{ $order->apartment }}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
@endcomponent
