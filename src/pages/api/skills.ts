import type { APIRoute } from 'astro';
import fs from 'node:fs/promises';
import path from 'node:path';

export const prerender = false;

const jsonPath = path.join(process.cwd(), 'src', 'content', 'profile', 'skills.json');

async function readSkills() {
  try {
    const data = await fs.readFile(jsonPath, 'utf-8');
    return JSON.parse(data);
  } catch {
    return { skills: [] };
  }
}

async function writeSkills(data: any) {
  await fs.writeFile(jsonPath, JSON.stringify(data, null, 2), 'utf-8');
}

export const GET: APIRoute = async () => {
  const data = await readSkills();
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const currentData = await readSkills();
    const list = currentData.skills || [];

    if (body.reorder) {
      currentData.skills = body.reorder;
      await writeSkills(currentData);
      return new Response(JSON.stringify({ success: true, skills: currentData.skills }), { status: 200 });
    }

    if (body.name) {
      const idx = list.findIndex((item: any) => item.name.toLowerCase() === body.name.toLowerCase());
      if (idx !== -1) {
        list[idx] = { ...list[idx], ...body };
      } else {
        list.push({
          id: `skill_${Date.now()}`,
          is_published: true,
          ...body,
        });
      }
    }

    currentData.skills = list;
    await writeSkills(currentData);

    return new Response(JSON.stringify({ success: true, skills: currentData.skills }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};

export const DELETE: APIRoute = async ({ request }) => {
  try {
    const { searchParams } = new URL(request.url);
    const name = searchParams.get('name');
    if (!name) return new Response(JSON.stringify({ error: 'Missing name' }), { status: 400 });

    const currentData = await readSkills();
    currentData.skills = (currentData.skills || []).filter((item: any) => item.name.toLowerCase() !== name.toLowerCase());
    await writeSkills(currentData);

    return new Response(JSON.stringify({ success: true, skills: currentData.skills }), { status: 200 });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};
