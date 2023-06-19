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
                                                {{ $user->kk_user_firstname }}, вы давно не заходили!
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
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="width:100%;">
                                <tr>
                                    <td style="width:100%; text-align: center;"> <a href="{{ config('app.url') }}/courses/{{ $next_lesson->kk_lesson_course_id }}/{{ $next_lesson->kk_lesson_id }}?cup_need_notify=1" target="_blank"> <img width="540" align="center" style="width: 100%; height: auto;" src="{{ url('https://kniga-knig.info/assets/img/courses/' . $lesson->course->kk_course_image) }}" imgfield="img"> </a> </td>
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
                                            Мы рады, что вы прошли “{{ $lesson->kk_lesson_number }}” урок курса “{{ $lesson->course->kk_course_name }}” в нашей онлайн-школе.
                                            Если вам нужна какая-нибудь помощь или поддержка для продолжения обучения, рады
                                            будем помочь вам любым удобным для вас способом.
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
                        <td style="padding-top:30px;padding-bottom:30px;padding-left:30px;padding-right:30px;">
                            <!-- Workaround: Calculate border radius for Outlook-->
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="width:100%;" style="margin: 0 auto;table-layout: fixed;">
                                <tr>
                                    <td>
                                        <table border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto;" align="center">
                                            <tr>
                                                <td>
                                                    <!--[if mso]> <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="{{ config('app.url') }}/courses/{{ $next_lesson->kk_lesson_course_id }}/{{ $next_lesson->kk_lesson_id }}?cup_need_notify=1" style="height:52px;v-text-anchor:middle;mso-wrap-style:none;mso-position-horizontal:center;" arcsize="36%" stroke="f" fillcolor="#ff9298"> <w:anchorlock/> <center style="text-decoration: none; padding: 15px 30px; font-size: 15px; text-align: center; font-weight: bold; font-family:Helvetica Neue, Helvetica, Arial, sans-serif; width: 100%;color:#ffffff;"> Продолжить обучение </center> </v:roundrect> <![endif]-->
                                                    <!--[if !mso]--> <a style="display: table-cell; text-decoration: none; padding: 15px 30px; font-size: 15px; text-align: center; font-weight: bold; font-family:Helvetica Neue, Helvetica, Arial, sans-serif; width: 100%;color:#ffffff; border:0px solid ; background-color:#ff9298; border-radius: 12px;" href="{{ config('app.url') }}/courses/{{ $next_lesson->kk_lesson_course_id }}/{{ $next_lesson->kk_lesson_id }}?cup_need_notify=1"> Продолжить обучение </a>
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
    @if (count($cups) > 0)
        <table style="width:100%; border-collapse:collapse; border-spacing:0; margin:0; border:0;" cellpadding="0" cellspacing="0">
            <tr>
                <td style="padding-left:15px; padding-right:15px; ">
                    <table class="r" style="margin: 0 auto;background-color:#ffffff;border-spacing: 0;width:600px;" align="center">
                        <tr>
                            <td style="padding-top:10px;padding-left:40px;padding-right:40px;">
                                <table valign="top" border="0" cellpadding="0" cellspacing="0" width="100%" style="width: 100%;">
                                    <tr>
                                        <td style="text-align: left; padding: 0 0 0;">
                                            <div style="margin-right: auto; font-family: Helvetica Neue, Helvetica, Arial, sans-serif; color:#222222;font-size:22px;font-weight:bold;">
                                                <strong style="background-color: rgb(255, 255, 255); color: rgb(0, 0, 0); font-weight: 500;">
                                                    Ваши курсы в процессе прохождения:
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
        @php
            $cup_row = 0;
            if (count($cups) < 2) {
                $cups = [...$cups, (object) ['empty' => true]];
            }
        @endphp
        <table style="width:100%; border-collapse:collapse; border-spacing:0; margin:0; border:0;" cellpadding="0" cellspacing="0">
            <tr>
                <td style="padding-left:15px; padding-right:15px; ">
                    <table class="r" style="margin: 0 auto;background-color:#ffffff;border-spacing: 0;width:600px;" align="center">
                        <tr>
                            <td style="padding-top:5px;padding-bottom:30px;padding-left:30px;padding-right:30px;">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                    @foreach ($cups as $cup)
                                        @php
                                            if ($cup_row < 2) {
                                                $cup_row++;
                                            } else {
                                                $cup_row = 1;
                                            }
                                        @endphp
                                        @if ($cup_row === 1)
                                            <tr>
                                        @endif
                                        <td class="t-emailBlock t-emailAlignCenter" valign="middle" style="text-align: left; padding: 10px; width: 50%;">
                                            @if (!isset($cup->empty))
                                                <img width="540" align="center" style="width: 100%; height: auto; border-top-left-radius: 12px; border-top-right-radius: 12px;" src="{{ url('https://kniga-knig.info/assets/img/courses/' . $cup->course->kk_course_image) }}?cup_need_notify=1" imgfield="img">
                                                <!--[if mso]> <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="{{ config('app.url') }}/courses/{{ $cup->last_finished_lup->kk_lup_course_id }}/{{ $cup->last_finished_lup->kk_lup_lesson_id }}" style="height:52px;v-text-anchor:middle;mso-wrap-style:none;mso-position-horizontal:center;" arcsize="36%" stroke="f" fillcolor="#ff9298"> <w:anchorlock/> <center style="text-decoration: none; padding: 15px 30px; font-size: 15px; text-align: center; font-weight: bold; font-family:Helvetica Neue, Helvetica, Arial, sans-serif; width: 100%;color:#ffffff;"> Продолжить обучение </center> </v:roundrect> <![endif]-->
                                                <!--[if !mso]--> <a style="display: block; text-decoration: none; padding: 15px 0; font-size: 15px; text-align: center; font-weight: bold; font-family:Helvetica Neue, Helvetica, Arial, sans-serif; width: 100%;color:#ffffff; border:0px solid ; background-color:#ff9298; border-bottom-left-radius: 12px; border-bottom-right-radius: 12px;"
                                                    href="{{ config('app.url') }}/courses/{{ $cup->last_finished_lup->kk_lup_course_id }}/{{ $cup->last_finished_lup->kk_lup_lesson_id }}?cup_need_notify=1"> Продолжить обучение
                                                </a>
                                                <!--[endif]-->
                                            @endif
                                        </td>
                                        @if ($cup_row === 2)
                        </tr>
    @endif
    @endforeach
    </table>
    </td>
    </tr>
    </table>
    </td>
    </tr>
    </table>
    @endif
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
                                            Если у вас возникли вопросы или пожелания по улучшению нашей работы, мы
                                            также будем рады принять от вас любые предложения. Вы можете
                                            связаться с нами любым удобным для вас способом.
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
                <table id="recin604765455" class="r" style="margin: 0 auto;background-color:#ffffff;border-spacing: 0;width:600px;" align="center">
                    <tr>
                        <td style="padding-top:45px;padding-bottom:45px;padding-left:30px;padding-right:30px;">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td style="text-align: center; padding: 0 0 50px;">
                                        <div style="margin: 0 auto; font-weight: normal; font-family: Helvetica Neue, Helvetica, Arial, sans-serif; color:#222222;font-size:18px;line-height:1.5;">
                                            <a href="https://wa.me/79156887601" style="color: rgb(8, 8, 8);" target="_blank" rel="noreferrer noopener">Whatsapp</a> | <a href="https://t.me/+79156887601" style="color: rgb(5, 5, 5);" target="_blank" rel="noreferrer noopener">Telegram</a>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="text-align: center; padding: 0 0 25px;">
                                        <div style="margin: 0 auto; font-weight: normal; font-family: Helvetica Neue, Helvetica, Arial, sans-serif; color:#222222;font-size:16px;line-height:1.4;">
                                            горячая линия: 8 (800) 100 18 44, е-mail: <a href="mailto:contact@kniga-knig.info">contact@kniga-knig.info</a>
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
                                        <div style="margin-right: auto; font-family: Helvetica Neue, Helvetica, Arial, sans-serif; color:#444444;font-size:20px;line-height:1.4;">
                                            Желаем вам новых познаний и приятного обучения на портале “Книга
                                            Книг”.</div>
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
                        <td style="padding-top:30px;padding-bottom:30px;padding-left:30px;padding-right:30px;">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td class="t-emailBlock t-emailAlignCenter" valign="middle" style="text-align: left; padding-right: 10px; width: 30%;">
                                        <div style=" font-family: Helvetica Neue, Helvetica, Arial, sans-serif; color:#222222;font-size:16px;">
                                            Директор службы поддержки портала “Книга Книг” </div>
                                    </td>
                                    <td class="t-emailBlock t-emailBlockPadding t-emailAlignCenter" valign="middle" style="text-align: left; padding: 0 10px; width: 40%;"> </td>
                                    <td class="t-emailBlock t-emailBlockPadding t-emailAlignCenter" valign="middle" style="text-align: right; padding-left: 10px; width: 30%;">
                                        <div style=" font-family: Helvetica Neue, Helvetica, Arial, sans-serif; color:#222222;font-size:16px;">
                                            Татьяна Мухаметвалеева.<br /><br /></div>
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
