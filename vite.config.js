import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:8080',
                changeOrigin: true,
                secure: false,
                ws: true,
                configure: (proxy, _options) => {
                    proxy.on('error', (err, req, res) => {
                        console.log('proxy error:', err);
                    });
                    proxy.on('proxyReq', (proxyReq, req, res) => {
                        console.log('Sending request to:', req.method, req.url);
                    });
                    proxy.on('proxyRes', (proxyRes, req, res) => {
                        console.log('Received response from:', proxyRes.statusCode, req.url);
                    });
                },
            },
        },
    },
    plugins: [
        vue(),
        vueDevTools(),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        },
    },
})
