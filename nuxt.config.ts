// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  pages: true,
  modules: [
    'nuxt-icon',
    '@nuxtjs/supabase',
    '@pinia/nuxt',
    "@vite-pwa/nuxt",
    "@nuxt/ui"
  ],
  supabase: {
    redirect: false
  },
  runtimeConfig: {
    public: {
      bucketUrl: process.env.BUCKET_URL
    }
  },
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false }
})