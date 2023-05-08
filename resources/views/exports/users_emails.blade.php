<table>
    <thead>
        <tr>
            <th>ФИО</th>
            <th>E-mail</th>
            <th>Роль</th>
            <th>ФИО УЧИТЕЛЯ</th>
            <th>EMAIL УЧИТЕЛЯ</th>
            <th>Дата начала прохождения</th>
        </tr>
    </thead>
    <tbody>
        @foreach ($lups as $lup)
            @if (!empty($lup->user))
                <tr>
                    <td>{{ $lup->user->kk_user_lastname }} {{ $lup->user->kk_user_firstname }}</td>
                    <td>{{ $lup->user->kk_user_email }}</td>
                    <td>
                        @if (!empty($lup->user->role))
                            {{ $lup->user->role->kk_role_name }}
                        @endif
                    </td>
                    <td>
                        @if (!empty($lup->user->teather))
                            {{ $lup->user->teather->kk_user_lastname }}
                            {{ $lup->user->teather->kk_user_firstname }}
                        @endif
                    </td>
                    <td>
                        @if (!empty($lup->user->teather))
                            {{ $lup->user->teather->kk_user_email }}
                        @endif
                    </td>
                    <td>{{ Carbon\Carbon::parse($lup->kk_lup_started_at)->format('d.m.Y') }}</td>
                </tr>
            @endif
        @endforeach
    </tbody>
</table>
