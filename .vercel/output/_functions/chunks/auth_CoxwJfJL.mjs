import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
//#region src/pages/api/auth.ts
var auth_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	prerender: () => false
});
var GET = async ({ request, redirect }) => {
	const scope = new URL(request.url).searchParams.get("scope") || "repo";
	const clientId = process.env.OAUTH_GITHUB_CLIENT_ID;
	if (!clientId) return new Response("Missing OAUTH_GITHUB_CLIENT_ID environment variable", { status: 500 });
	const githubAuthUrl = new URL("https://github.com/login/oauth/authorize");
	githubAuthUrl.searchParams.set("client_id", clientId);
	githubAuthUrl.searchParams.set("scope", scope);
	githubAuthUrl.searchParams.set("state", Math.random().toString(36).substring(2));
	return redirect(githubAuthUrl.toString(), 302);
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/auth@_@ts
var page = () => auth_exports;
//#endregion
export { page };
