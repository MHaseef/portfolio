import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import react from '@astrojs/react';
import decapCmsOauth from 'astro-decap-cms-oauth';

export default defineConfig({
  output: 'server',
  adapter: vercel({
    webAnalytics: { enabled: false },
  }),
  integrations: [react(), decapCmsOauth()],
});


