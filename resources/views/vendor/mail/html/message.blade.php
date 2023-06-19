<x-mail::layout>
    {{-- Header --}}
    <x-slot:header>
        <x-mail::header :url="config('app.url')">
            <table style="width:100%; border-collapse:collapse; border-spacing:0; margin:0; border:0;" cellpadding="0" cellspacing="0">
                <tr>
                    <td style="padding-left:15px; padding-right:15px; ">
                        <table class="r" style="margin: 0 auto;border-spacing: 0;width:600px;" align="center">
                            <tr>
                                <td style="padding-top:0px;padding-bottom:0px;padding-left:0;padding-right:0;">
                                    <table valign="top" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
                                        <tr>
                                            <td style="height:30px;" height="30px"></td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </x-mail::header>
    </x-slot:header>

    {{-- Body --}}
    {{ $slot }}

    {{-- Subcopy --}}
    @isset($subcopy)
        <x-slot:subcopy>
            <x-mail::subcopy>
                {{ $subcopy }}
            </x-mail::subcopy>
        </x-slot:subcopy>
    @endisset

    {{-- Footer --}}
    <x-slot:footer>
        <x-mail::footer>
            <table style="width:100%; border-collapse:collapse; border-spacing:0; margin:0; border:0;" cellpadding="0" cellspacing="0">
                <tr>
                    <td style="padding-left:15px; padding-right:15px; ">
                        <table class="r" style="margin: 0 auto;border-spacing: 0;width:600px;" align="center">
                            <tr>
                                <td style="padding-top:0px;padding-bottom:0px;padding-left:0;padding-right:0;">
                                    <table valign="top" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
                                        <tr>
                                            <td style="height:30px;" height="30px"></td>
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
                        <table class="r" style="margin: 0 auto;border-spacing: 0;width:600px;" align="center">
                            <tr>
                                <td style="padding-top:45px;padding-bottom:45px;padding-left:30px;padding-right:30px;">
                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="width:100%; margin: 0 auto;table-layout: fixed;">
                                        <tr>
                                            <td>
                                                <table border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto;table-layout: fixed;" align="center">
                                                    <tr>
                                                        <td align="center" style="width: 34px; height: 34px; padding: 0 9px;">
                                                            <a style="text-decoration: none;" href="https://vk.com/knigaknigcourses">
                                                                <img width="34" style="display: block; width: 34px; max-width: 34px;" src="{{ url('https://kniga-knig.info/assets/img/site/t_ico_vk.png') }}">
                                                            </a>
                                                        </td>
                                                        <td align="center" style="width: 34px; height: 34px; padding: 0 9px;">
                                                            <a style="text-decoration: none;" href="https://ok.ru/group/70000002139641">
                                                                <img width="34" style="display: block; width: 34px; max-width: 34px;" src="{{ url('https://kniga-knig.info/assets/img/site/t_ico_ok.png') }}">
                                                            </a>
                                                        </td>
                                                        <td align="center" style="width: 34px; height: 34px; padding: 0 9px;">
                                                            <a style="text-decoration: none;" href="https://www.youtube.com/@knigaknig">
                                                                <img width="34" style="display: block; width: 34px; max-width: 34px;" src="{{ url('https://kniga-knig.info/assets/img/site/t_ico_youtube3.png') }}">
                                                            </a>
                                                        </td>
                                                        <td align="center" style="width: 34px; height: 34px; padding: 0 9px;">
                                                            <a style="text-decoration: none;" href="https://t.me/knigaknigcourses">
                                                                <img width="34" style="display: block; width: 34px; max-width: 34px;" src="{{ url('https://kniga-knig.info/assets/img/site/t_ico_telegram.png') }}">
                                                            </a>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="text-align: center; padding: 50px 0 15px;">
                                                <div style="margin: 0 auto; font-weight: normal; font-family: Helvetica Neue, Helvetica, Arial, sans-serif; color:#222222;font-size:16px;line-height:1.5;">
                                                    Вы получили это письмо, поскольку зарегистрированы на
                                                    kniga-knig.info
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="text-align: center; padding: 0 0 50px;">
                                                <div style="margin: 0 auto; font-weight: normal; font-family: Helvetica Neue, Helvetica, Arial, sans-serif; color:#222222;font-size:16px;line-height:1.4;">
                                                    Для отписки перейдите по <a href="https://kniga-knig.info/?utm_source=email&amp;utm_campaign=reg" style="color: rgb(50, 125, 208);">ссылке</a>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td align="center">
                                                <a style="text-decoration: none;" href="https://kniga-knig.info/?utm_source=email&amp;utm_campaign=reg">
                                                    <img width="60" style="display: block; width: 60px;" src="{{ url('https://kniga-knig.info/assets/img/site/logo_email.png') }}">
                                                </a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="text-align: center; padding: 25px 0 0;">
                                                <div style="margin: 0 auto; font-weight: normal; font-family: Helvetica Neue, Helvetica, Arial, sans-serif; color:#a1a1a1;font-size:14px;line-height:1.5;">
                                                    © Медиахолдинг "Надежда" г. Тула, ул. Станиславского, д. 48
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
        </x-mail::footer>
    </x-slot:footer>
</x-mail::layout>
