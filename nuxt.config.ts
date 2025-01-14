// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    modules: [
        '@pinia/nuxt',
        'bootstrap-vue-3/nuxt',
    ],
    css: [
        'bootstrap/dist/css/bootstrap.css'
    ]
})
