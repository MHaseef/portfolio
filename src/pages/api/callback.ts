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

export const GET: APIRoute = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const code = url.searchParams.get('code');
    const clientId = getEnv('OAUTH_GITHUB_CLIENT_ID');
    const clientSecret = getEnv('OAUTH_GITHUB_CLIENT_SECRET');

    if (!code) {
      return new Response(
        JSON.stringify({ error: 'Missing Code', message: 'No authorization code provided by GitHub.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!clientId || !clientSecret) {
      return new Response(
        JSON.stringify({
          error: 'Configuration Error',
          message: 'OAUTH_GITHUB_CLIENT_ID or OAUTH_GITHUB_CLIENT_SECRET environment variable is missing on Vercel.',
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
      }),
    });

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      return new Response(
        JSON.stringify({ error: 'GitHub Token Exchange Failed', details: errorText }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const data = await tokenResponse.json();

    if (data.error) {
      return new Response(
        JSON.stringify({ error: 'GitHub OAuth Error', details: data.error_description || data.error }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const token = data.access_token;
    const provider = 'github';

    const htmlResponse = `<!DOCTYPE html>
<html>
<head>
  <title>Authorizing Decap CMS...</title>
</head>
<body>
  <p>Authorizing with GitHub... Please wait.</p>
  <script>
    (function() {
      function receiveMessage(e) {
        console.log("receiveMessage", e);
        window.opener.postMessage(
          'authorization:${provider}:success:${JSON.stringify({ token, provider })}',
          e.origin
        );
      }
      window.addEventListener("message", receiveMessage, false);
      window.opener.postMessage("authorizing:${provider}", "*");
    })();
  </script>
</body>
</html>`;

    return new Response(htmlResponse, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
      },
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        error: 'Callback Server Error',
        message: error?.message || 'An unexpected error occurred during GitHub callback handling.',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
