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
                                            <strong style="font-weight: 500; color: rgb(0, 0, 0); background-color: rgb(255, 255, 255);">
                                                {{ $user->kk_user_firstname }}, поздравляем!
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
            <td style="padding-left:15px; padding-right:15px;">
                <table class="r" style="margin: 0 auto;background-color:#ffffff;border-spacing: 0;width:600px;" align="center">
                    <tr>
                        <td style="padding-top:15px;padding-bottom:15px;padding-left:30px;padding-right:30px;">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="width:100%;">
                                <tr>
                                    <td style="width:100%; text-align: center;">
                                        <a href="{{config('app.url')}}/?utm_source=email&amp;utm_campaign=reg" target="_blank">
                                            <img width="540" align="center" style="width: 100%; height: auto;" src="{{ url('https://kniga-knig.info/assets/img/site/rustem_email.png') }}" imgfield="img">
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
    <table id="rec600468178" style="width:100%; border-collapse:collapse; border-spacing:0; margin:0; border:0;" cellpadding="0" cellspacing="0" data-record-type="329">
        <tr>
            <td style="padding-left:15px; padding-right:15px; ">
                <table id="recin600468178" class="r" style="margin: 0 auto;background-color:#ffffff;border-spacing: 0;width:600px;" align="center">
                    <tr>
                        <td style="padding-top:15px;padding-bottom:15px;padding-left:30px;padding-right:30px;">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="width: 100%;">
                                <tr>
                                    <td style="text-align: left; padding: 0 0 0;">
                                        <div style="margin-right: auto; font-family: Helvetica Neue, Helvetica, Arial, sans-serif; color:#444444;font-size:20px;line-height:1.45;">
                                            Мы рады, что вы зарегистрировались в нашей онлайн-школе по
                                            изучению Библии. Мы делаем все возможное для того, чтобы наши
                                            курсы понравились вам и помогли вам больше понимать Священное
                                            Писание.<br /><br /> Желаем вам новых познаний и приятного
                                            обучения на портале “Книга Книг”.</div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
    @include('vendor.mail.html.autor')
    <table style="width:100%; border-collapse:collapse; border-spacing:0; margin:0; border:0;" cellpadding="0" cellspacing="0">
        <tr>
            <td style="padding-left:15px; padding-right:15px; ">
                <table class="r" style="margin: 0 auto;background-color:#ffffff;border-spacing: 0;width:600px;" align="center">
                    <tr>
                        <td style="padding-top:30px;padding-bottom:30px;padding-left:30px;padding-right:30px;">
                            <!-- Workaround: Calculate border radius for Outlook-->
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="width:100%;" style="margin: 0 auto;table-layout: fixed;">
                                <tr>
                                    <td>
                                        <table border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto;" align="center">
                                            <tr>
                                                <td>
                                                    <!--[if mso]> <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="{{config('app.url')}}/courses?utm_source=email&amp;utm_campaign=reg" style="height:52px;v-text-anchor:middle;mso-wrap-style:none;mso-position-horizontal:center;" arcsize="36%" stroke="f" fillcolor="#ff9298"> <w:anchorlock/> <center style="text-decoration: none; padding: 15px 30px; font-size: 15px; text-align: center; font-weight: bold; font-family:Helvetica Neue, Helvetica, Arial, sans-serif; width: 100%;color:#ffffff;"> Пройти курсы </center> </v:roundrect> <![endif]-->
                                                    <!--[if !mso]--> <a style="display: table-cell; text-decoration: none; padding: 15px 30px; font-size: 15px; text-align: center; font-weight: bold; font-family:Helvetica Neue, Helvetica, Arial, sans-serif; width: 100%;color:#ffffff; border:0px solid ; background-color:#ff9298; border-radius: 12px;" href="{{config('app.url')}}/courses?utm_source=email&amp;utm_campaign=reg">
                                                        Пройти курсы </a>
                                                    <!--[endif]-->
                                                </td>
                                            </tr>
                                        </table>
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
