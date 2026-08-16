import type { APIRoute } from 'astro';
import fs from 'node:fs/promises';
import path from 'node:path';

export const prerender = false;

const bioPath = path.join(process.cwd(), 'src', 'content', 'profile', 'bio.json');
const contactPath = path.join(process.cwd(), 'src', 'content', 'profile', 'contact.json');

async function readBio() {
  try {
    const data = await fs.readFile(bioPath, 'utf-8');
    return JSON.parse(data);
  } catch {
    return {};
  }
}

async function writeBio(data: any) {
  await fs.writeFile(bioPath, JSON.stringify(data, null, 2), 'utf-8');
}

export const GET: APIRoute = async () => {
  const bio = await readBio();
  return new Response(JSON.stringify(bio), { status: 200, headers: { 'Content-Type': 'application/json' } });
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const currentBio = await readBio();

    const updatedBio = { ...currentBio, ...body };
    await writeBio(updatedBio);

    return new Response(JSON.stringify({ success: true, bio: updatedBio }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};
