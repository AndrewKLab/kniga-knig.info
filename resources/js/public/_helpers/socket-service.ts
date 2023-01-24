import Echo from 'laravel-echo';

import Pusher from 'pusher-js';
window.Pusher = Pusher;

export const initLaravelEcho = async (token: string) =>{
    window.Echo = new Echo({
        broadcaster: 'pusher',
        key: import.meta.env.VITE_PUSHER_APP_KEY,
        cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
        forceTLS: false,
        wsHost: window.location.hostname,
        wsPort: 6001,
        wssHost: window.location.hostname,
        wssPort: 6001,
        disableStats: true,
        enabledTransports: ['ws', 'wss'],
        auth: {
          withCredentials: true,
          headers: {
            'Authorization': 'Bearer '+token,
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
          }
        }
      });
}

export const subscribeToPrivateChannel = (channel: string, options? : object) =>{
    if(options){
        if(options.withInit && options.token) initLaravelEcho(options.token)
    }
    return window.Echo.private(channel)
}
export const unsubscribeFromChannel = (channel: string) =>{
    return window.Echo.leave(channel)
}

