import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async ({ request, redirect }) => {
  const url = new URL(request.url);
  const scope = url.searchParams.get('scope') || 'repo';
  const clientId = process.env.OAUTH_GITHUB_CLIENT_ID;

  if (!clientId) {
    return new Response('Missing OAUTH_GITHUB_CLIENT_ID environment variable', { status: 500 });
  }

  const githubAuthUrl = new URL('https://github.com/login/oauth/authorize');
  githubAuthUrl.searchParams.set('client_id', clientId);
  githubAuthUrl.searchParams.set('scope', scope);
  githubAuthUrl.searchParams.set('state', Math.random().toString(36).substring(2));

  return redirect(githubAuthUrl.toString(), 302);
};
