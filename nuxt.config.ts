// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css?family=Fjalla+One&display=swap",
        },
      ],
      title: "Wordle Assistant",
    },
  },
  components: ["~/components", "~/components/icons"],
  css: ["~/assets/styles/index.scss"],
  devtools: { enabled: false },
  modules: ["@vueuse/nuxt"],
  nitro: {
    compressPublicAssets: true,
    preset: "bun",
    serverAssets: [
      {
        baseName: "data",
        dir: "./data",
      },
    ],
  },
});
