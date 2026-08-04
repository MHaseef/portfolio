import type { APIRoute } from 'astro';

export const prerender = false;

function getEnv(key: string): string | undefined {
  if (typeof process !== 'undefined' && process.env && process.env[key]) {
    return process.env[key];
  }
  if (import.meta && import.meta.env && import.meta.env[key]) {
    return import.meta.env[key];
  }
  return undefined;
}

export const GET: APIRoute = async ({ request, redirect }) => {
  try {
    const url = new URL(request.url);
    const scope = url.searchParams.get('scope') || 'repo';
    const clientId = getEnv('OAUTH_GITHUB_CLIENT_ID');

    if (!clientId) {
      return new Response(
        JSON.stringify({
          error: 'Configuration Error',
          message: 'OAUTH_GITHUB_CLIENT_ID environment variable is missing on Vercel.',
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const state = Math.random().toString(36).substring(2, 15);
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${encodeURIComponent(clientId)}&scope=${encodeURIComponent(scope)}&state=${encodeURIComponent(state)}`;

    return redirect(githubAuthUrl, 302);
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        error: 'Auth Initiation Error',
        message: error?.message || 'An unexpected error occurred during auth initiation.',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
