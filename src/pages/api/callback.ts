import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const clientId = process.env.OAUTH_GITHUB_CLIENT_ID;
  const clientSecret = process.env.OAUTH_GITHUB_CLIENT_SECRET;

  if (!code) {
    return new Response('Missing authorization code', { status: 400 });
  }

  if (!clientId || !clientSecret) {
    return new Response('Missing GitHub OAuth credentials', { status: 500 });
  }

  try {
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

    const data = await tokenResponse.json();

    if (data.error) {
      return new Response(`GitHub OAuth Error: ${data.error_description || data.error}`, { status: 400 });
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
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
      },
    });
  } catch (err: any) {
    return new Response(`Authentication error: ${err.message}`, { status: 500 });
  }
};
