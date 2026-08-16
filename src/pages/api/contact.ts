import type { APIRoute } from 'astro';
import fs from 'node:fs/promises';
import path from 'node:path';

export const prerender = false;

const jsonPath = path.join(process.cwd(), 'src', 'content', 'profile', 'contact.json');

async function readContact() {
  try {
    const data = await fs.readFile(jsonPath, 'utf-8');
    return JSON.parse(data);
  } catch {
    return { title: '', email: '', location: '', socialLinks: [] };
  }
}

async function writeContact(data: any) {
  await fs.writeFile(jsonPath, JSON.stringify(data, null, 2), 'utf-8');
}

export const GET: APIRoute = async () => {
  const data = await readContact();
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const currentData = await readContact();

    const updatedData = {
      ...currentData,
      ...body,
    };

    await writeContact(updatedData);

    return new Response(JSON.stringify({ success: true, contact: updatedData }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};
