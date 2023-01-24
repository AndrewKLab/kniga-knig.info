import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/css/app.css',
                'resources/js/app.js',
                'resources/js/crm.js',
            ],
            refresh: true,
        }),
        react(),
    ],
    // server: {
    //     port: 3000,
    //     https: true,
    //     hmr: {
    //         host: "kniga-knig-dev.info",
    //         port: 3001,
    //         protocol: "wss",
    //     },
    // },
});
