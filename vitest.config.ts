import { fileURLToPath } from 'node:url'
import path from 'path'
import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    dir: 'tests',
    coverage: {
      provider: 'v8',
      ignoreEmptyLines: true,
      reportsDirectory: path.resolve(__dirname, 'tests/coverage'),
      reporter: ['text', 'clover', 'json-summary', 'json']
    },
    environment: 'nuxt',
    environmentOptions: {
      nuxt: {
        rootDir: fileURLToPath(new URL('./', import.meta.url)),
        domEnvironment:
          (process.env.VITEST_DOM_ENV as 'happy-dom' | 'jsdom') ?? 'happy-dom',
        overrides: {
          gtm: {
            enabled: false,
            id: 'GTM-XXXXXXX'
          },
          gtag: {
            enabled: false,
            id: 'G-XXXXXXXX'
          }
        }
      }
    },
    setupFiles: ['./tests/setup.ts'],
    globals: true
  }
})
