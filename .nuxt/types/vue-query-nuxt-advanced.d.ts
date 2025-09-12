
      type PluginHookResult = Awaited<ReturnType<typeof import(".nuxt/internal.vue-query-plugin-hook.mjs").pluginHook>["pluginReturn"]>

      type AddDollarPrefix<T> = {
        [K in keyof T['provide'] as `$${string & K}`]: T['provide'][K]
      }

      declare module '#app' {
        interface NuxtApp extends AddDollarPrefix<PluginHookResult> {}
      }
      export { }