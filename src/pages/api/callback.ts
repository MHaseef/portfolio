import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');

  const clientId = process.env.OAUTH_CLIENT_ID || process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.OAUTH_CLIENT_SECRET || process.env.GITHUB_CLIENT_SECRET;

  if (!code) {
    return new Response('Missing authorization code parameter.', { status: 400 });
  }

  if (!clientId || !clientSecret) {
    return new Response(
      'Missing OAUTH_CLIENT_ID / OAUTH_CLIENT_SECRET or GITHUB_CLIENT_ID / GITHUB_CLIENT_SECRET environment variables.',
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
        <body>
          <p>Authorizing Decap CMS...</p>
          <script>
            (function() {
              function receiveMessage(e) {
                console.log("OAuth callback receiveMessage:", e);
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
