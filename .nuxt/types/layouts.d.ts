import type { ComputedRef, MaybeRef } from 'vue'
export type LayoutKey = "center" | "default" | "empty" | "guide" | "main" | "pub2nd" | "service-pvsn" | "service-type" | "service" | "service2"
declare module "../../node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: MaybeRef<LayoutKey | false> | ComputedRef<LayoutKey | false>
  }
}