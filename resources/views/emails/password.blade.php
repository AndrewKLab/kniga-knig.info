@component('mail::message')
    <table style="width:100%; border-collapse:collapse; border-spacing:0; margin:0; border:0;" cellpadding="0" cellspacing="0">
        <tr>
            <td style="padding-left:15px; padding-right:15px; ">
                <table class="r" style="margin: 0 auto;background-color:#ffffff;border-spacing: 0;width:600px;" align="center">
                    <tr>
                        <td style="padding-top:30px;padding-bottom:15px;padding-left:30px;padding-right:30px;">
                            <table valign="top" border="0" cellpadding="0" cellspacing="0" width="100%" style="width: 100%;">
                                <tr>
                                    <td style="text-align: center; padding: 0 0 0;">
                                        <div style="margin-right: auto; font-family: Helvetica Neue, Helvetica, Arial, sans-serif; color:#222222;font-size:28px;font-weight:bold;">
                                            <strong style="background-color: rgb(255, 255, 255); color: rgb(0, 0, 0); font-weight: 500;">
                                                Сброс пароля
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
                                    <td style="text-align: center; padding: 0 0 0;">
                                        <div style="margin-right: auto; font-family: Helvetica Neue, Helvetica, Arial, sans-serif; color:#444444;font-size:20px;line-height:1.45;">
                                            Ваш шестизначный PIN-код
                                            <h4>{{ $pin }}</h4>
                                            <p>Пожалуйста, не делитесь ни с кем своим одноразовым кодом. Вы сделали запрос на сброс пароля.</p>
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
