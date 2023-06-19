<!DOCTYPE html>
<html lang="en">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Диплом об окончании курса</title>

    <style>
        @page {
            margin: 0px;
        }       
        body {
            font-family: 'Montserrat';
            font-style: normal;
            margin: 0;
            color: #000000;
            font-weight: 400;
        }

        .diplom_container {

            position: relative;
            display: block;
            width: 665px;
            height: 92.4%;
            margin: auto;
            padding: 85px 65px 0px 65px;
        }

        .diplom_bg {
            height: 100%;
            width: 100%;
            position: absolute;
            top: 0;
            left: 0;
            z-index: -1;
        }

        .diplom_title {
            font-weight: 400;
            font-size: 70px;
            line-height: 70px;
            margin: 15px 0px;
        }

        .diplom_text {
            font-size: 34px;
            line-height: 40px;
        }

        .diplom_course_name {
            font-size: 38px;
            line-height: 50px;
        }

        .diplom_user_name {
            font-weight: 700;
            font-size: 38px;
            line-height: 46px;
            text-align: right;
        }

        .diplom_regalies {
            width: 100%;
            height: 72px;
            background-color: #fff;
            margin-bottom: 20px;
        }

        .diplom_regalies_text_container {
            padding: 5px 10px;
            width: 522px;
            float: right;
        }

        .diplom_regalies_text {
            font-weight: 400;
            font-size: 22px;
            line-height: 22px;
            width: 50%;
        }

        .diplom_footer {
            width: 100%;
            font-size: 21px;
            line-height: 26px;
            height: 72px;
        }
    </style>
</head>

<body>
    @php
        Carbon\Carbon::setlocale(config('app.locale'));
    @endphp
    <div class="diplom_container">

        <img class="diplom_bg" width="100%" height="100%" src="{{ 'data:image/png;base64,' . base64_encode(file_get_contents(public_path('assets/img/site/bg.png'))) }}" />
        <div style="margin-bottom: 130px;">
            <h1 class="diplom_title">диплом</h1>
            <div class="diplom_text" style="margin-bottom: 15px;">об окончании курса</div>
            <div class="diplom_course_name">«{{ $course->kk_course_name }}»</div>
        </div>
        <div style="margin-bottom: 100px;">
            <div class="diplom_text" style="text-align: right; margin-bottom: 15px; width: 100%;">награждается</div>
            <div class="diplom_user_name">{{ $user->kk_user_lastname }}<br>{{ $user->kk_user_firstname }}</div>
        </div>
        <div class="diplom_regalies">
            <img width="72px" height="100%" src="{{ 'data:image/png;base64,' . base64_encode(file_get_contents(public_path('assets/img/site/icon.png'))) }}" style="float: left;">
            <div class="diplom_regalies_text_container">
                <div class="diplom_regalies_text" style="float: left; text-align: center;">директор РТЦ<br>«Голос надежды»</div>
                <div class="diplom_regalies_text" style="float: right;">Рустем<br>Мухаметвалеев</div>
            </div>
        </div>
        <div class="diplom_footer">
            <div style="width: 72px; height: 72px; float: left;"></div>
            <div class="diplom_regalies_text_container">
                <div style="float: left; text-align: center; width: 50%; margin-top: 18px;">{{ Carbon\Carbon::now()->translatedFormat('d F Y') }}</div>
                <div style="float: right; width: 50%;">
                    <img width="100px" height="100%" src="{{ 'data:image/png;base64,' . base64_encode(file_get_contents(public_path('assets/img/site/mark.png'))) }}">
                </div>
            </div>
        </div>
    </div>
</body>

</html>
