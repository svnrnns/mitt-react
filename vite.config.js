import dts from "vite-plugin-dts";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const PACKAGE_NAME = "mitt-react";
/**
 * Vite configuration for building the mitt-react library.
 *
 * This configuration sets up Vite to build a distributable React library
 * that can be consumed via both ES Modules and CommonJS.
 *
 * @see https://vitejs.dev/guide/build.html#library-mode
 */
export default defineConfig({
  /**
   * Plugins used in the build process.
   *
   * @property {Plugin} react - Enables React support including JSX transformation
   *                            and Fast Refresh during development.
   * @property {Plugin} dts - Generates TypeScript declaration files (.d.ts) from
   *                          source code. The `insertTypesEntry` option automatically
   *                          adds a "types" field to package.json exports.
   */
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      outDir: "dist",
      entryRoot: "src",
    }),
  ],

  build: {
    /**
     * Library mode configuration.
     *
     * Configures Vite to build as a library rather than an application.
     * This changes the output to be consumable as an npm package.
     */
    lib: {
      /**
       * Entry point for the library.
       * All public exports should be re-exported from this file.
       */
      entry: "src/index.ts",

      /**
       * Custom filename generator for output bundles.
       * - ES Module format: mitt-react.js
       * - CommonJS format: mitt-react.cjs
       *
       * @param {string} format - The output format ('es' or 'cjs')
       * @returns {string} The generated filename
       */
      fileName: (format) => `${PACKAGE_NAME}.${format === "es" ? "js" : "cjs"}`,

      /**
       * Output formats to generate:
       * - "es": ES Modules (import/export) - for modern bundlers and browsers
       * - "cjs": CommonJS (require/module.exports) - for Node.js and legacy bundlers
       */
      formats: ["es", "cjs"],
    },

    /**
     * Rollup-specific options.
     * Vite uses Rollup under the hood for production builds.
     */
    rollupOptions: {
      /**
       * External dependencies that should NOT be bundled.
       *
       * React and ReactDOM are marked as external because:
       * 1. They are peer dependencies - consumers provide their own version
       * 2. Bundling React would cause version conflicts and duplicate React instances
       * 3. It significantly reduces the library bundle size
       */
      external: ["react", "react-dom"],

      output: {
        /**
         * Global variable names for external dependencies.
         *
         * When the library is used via a <script> tag (UMD/IIFE),
         * these mappings tell Rollup which global variables correspond
         * to the external dependencies.
         *
         * Example: When code imports 'react', it will reference window.React
         */
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
