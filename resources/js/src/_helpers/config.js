const appUrl = import.meta.env.VITE_APP_URL;

export const config = {
    appUrl: appUrl,
    crmUrl: `https://crm.kniga-knig.info`,
    apiUrl: appUrl + '/api',
    images: {
        site: `site`,
        avatars: `avatars`,
        courses : `courses`
    },
    defaultUserAvatar: `unnamed.png`,
    GET: {
        method: 'GET',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'ru-RU,ru;q=0.8,en-US;q=0.5,en;q=0.3',
        },
    },
    POST: {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'ru-RU,ru;q=0.8,en-US;q=0.5,en;q=0.3',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
        }
    }
}