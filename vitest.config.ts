import { fileURLToPath } from 'node:url'
import path from 'path'
import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    dir: 'tests',
    coverage: {
      provider: 'v8',
      reportsDirectory: path.resolve(__dirname, 'tests/coverage'), // This ensures an absolute path,
      // you can include other reporters, but 'json-summary' is required, json is recommended
      reporter: ['text', 'json-summary', 'json'],
      // If you want a coverage reports even if your tests are failing, include the reportOnFailure option
      reportOnFailure: false,
      thresholds: {
        lines: 80,
        branches: 80,
        functions: 80,
        statements: 80
      }
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
