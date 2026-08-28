import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async ({ request, redirect }) => {
  const clientId = 
    process.env.OAUTH_GITHUB_CLIENT_ID || 
    process.env.OAUTH_CLIENT_ID || 
    process.env.GITHUB_CLIENT_ID;
  
  if (!clientId) {
    return new Response(
      'Missing GitHub OAuth Client ID on Vercel. Please add OAUTH_GITHUB_CLIENT_ID (or GITHUB_CLIENT_ID) in Vercel Settings -> Environment Variables.',
      { status: 500, headers: { 'Content-Type': 'text/plain' } }
    );
  }

  const url = new URL(request.url);
  const redirectUri = `${url.protocol}//${url.host}/api/callback`;

  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=repo,user&redirect_uri=${encodeURIComponent(redirectUri)}`;

  return redirect(githubAuthUrl, 302);
};
