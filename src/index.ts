/**
 * A helper function to easily create singleton instances
 * @param init the init function to (re-)create the singleton instance
 * @param matcher an optional function that internally calls the `init` function when returning `true`
 * @returns The singleton instance
 */
export const singleton = <T>(
   init: () => T,
   matcher?: (instance: T) => boolean
): (() => T) => {
   let instance: T | undefined

   return () => {
      if (instance === undefined) {
         instance = init()
      } else if (matcher) {
         if (matcher(instance)) instance = init()
      }

      return instance
   }
}

/**
 * A helper function to easily create async singleton instances
 * @param init the init function to (re-)create the singleton instance
 * @param matcher an optional function that internally calls the `init` function when returning `true`
 * @returns The singleton instance
 */
export const singletonAsync = <T>(
   init: () => Promise<T>,
   matcher?: (instance: T) => Promise<boolean>
): (() => Promise<T>) => {
   let instance: T | undefined

   return async () => {
      if (instance === undefined) {
         instance = await init()
      } else if (matcher) {
         if (await matcher(instance)) instance = await init()
      }

      return instance
   }
}
