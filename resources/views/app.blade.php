<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Книга Книг</title>

    <link rel="icon" type="image/x-icon" href="{{ asset('/assets/img/favicon.svg') }}">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
    <script src="https://widget.cloudpayments.ru/bundles/cloudpayments.js"></script>
    @vite('resources/css/app.css')

</head>

<body>
    <div id="app"></div>
    <script>
        let csrfToken = "{{ csrf_token() }}"
    </script>
    
    @viteReactRefresh
    @vite('resources/js/app.js')
</body>

</html>