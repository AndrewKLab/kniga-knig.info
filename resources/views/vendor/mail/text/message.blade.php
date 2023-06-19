<x-mail::layout>
    {{-- Header --}}
    <x-slot:header>
        <x-mail::header :url="config('app.url')"> </x-mail::header>
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
            <p>Вы получили это письмо, поскольку зарегистрированы на <a href="{{ config('app.url') }}" target="_blank">kniga-knig.info</a></p>
            <p>Для отписки перейдите по <a href="{{ config('app.url') }}" target="_blank">ссылке</a></p>
            <img src="{{ 'https://kniga-knig.info/assets/img/site/лого КНИГА КНИГ-02 (2).svg' }}">
            © Медиахолдинг "Надежда" г. Тула, ул. Станиславского, д. 48
        </x-mail::footer>
    </x-slot:footer>
</x-mail::layout>
