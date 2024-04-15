// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: "en",
      },
      link: [
        {
          rel: "icon",
          type: "image/svg+xml",
          href: "./assets/meta/favicon.svg",
        },
        {
          rel: "icon",
          type: "image/png",
          href: "./assets/meta/favicon.png",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css?family=Fjalla+One&display=swap",
        },
      ],
    },
  },
  components: ["~/components", "~/components/icons"],
  css: ["~/assets/styles/index.scss"],
  devtools: { enabled: false },
  modules: ["@vueuse/nuxt"],
  nitro: {
    compressPublicAssets: true,
    preset: "vercel",
    serverAssets: [
      {
        baseName: "data",
        dir: "./data",
      },
    ],
  },
});
