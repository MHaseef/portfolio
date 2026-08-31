import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');

  const clientId = 
    process.env.OAUTH_GITHUB_CLIENT_ID || 
    process.env.OAUTH_CLIENT_ID || 
    process.env.GITHUB_CLIENT_ID;

  const clientSecret = 
    process.env.OAUTH_GITHUB_CLIENT_SECRET || 
    process.env.OAUTH_CLIENT_SECRET || 
    process.env.GITHUB_CLIENT_SECRET;

  const redirectUri = process.env.OAUTH_REDIRECT_URI || `${url.protocol}//${url.host}/api/callback`;

  if (!code) {
    return new Response('Missing authorization code parameter.', { status: 400 });
  }

  if (!clientId || !clientSecret) {
    return new Response(
      'Missing OAUTH_GITHUB_CLIENT_ID or OAUTH_GITHUB_CLIENT_SECRET environment variable on Vercel.',
      { status: 500 }
    );
  }

  try {
    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        redirect_uri: redirectUri,
      }),
    });

    const data = await response.json();

    if (data.error) {
      return new Response(`GitHub OAuth Error: ${data.error_description || data.error}`, { status: 400 });
    }

    const token = data.access_token;
    const provider = 'github';

    const content = `
      <!DOCTYPE html>
      <html>
        <head><title>Authorizing...</title></head>
        <body style="font-family: sans-serif; text-align: center; padding: 40px; background: #0B1727; color: #E2E8F0;">
          <h3>✓ Authorization Successful!</h3>
          <p>Redirecting to Command Center...</p>
          <script>
            (function() {
              const token = "${token}";
              const provider = "${provider}";
              const payload = 'authorization:' + provider + ':success:' + JSON.stringify({ token: token, provider: provider });

              if (window.opener) {
                window.opener.postMessage(payload, "*");
                window.opener.postMessage("authorizing:" + provider, "*");
              }
              
              setTimeout(function() {
                window.close();
              }, 400);
            })();
          </script>
        </body>
      </html>
    `;

    return new Response(content, {
      status: 200,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  } catch (err: any) {
    return new Response(`OAuth Callback Server Error: ${err.message}`, { status: 500 });
  }
};
