export default defineNuxtPlugin((nuxtApp) => {
  const appConfig = useAppConfig()
  if (appConfig) {
    appConfig.github = undefined
  }
})
