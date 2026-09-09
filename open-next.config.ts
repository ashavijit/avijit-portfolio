import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

/**
 * Every route here is prerendered at build time — there is no ISR and no
 * on-demand rendering. Serving the prerendered payloads straight out of the
 * assets bundle keeps the server function from ever re-rendering a page, which
 * matters because the blog reads its .mdx files off disk and Workers has no
 * filesystem at runtime.
 */
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
});
