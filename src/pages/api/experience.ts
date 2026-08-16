import type { APIRoute } from 'astro';
import fs from 'node:fs/promises';
import path from 'node:path';

export const prerender = false;

const jsonPath = path.join(process.cwd(), 'src', 'content', 'profile', 'experience.json');

async function readExperience() {
  try {
    const data = await fs.readFile(jsonPath, 'utf-8');
    return JSON.parse(data);
  } catch {
    return { experience: [] };
  }
}

async function writeExperience(data: any) {
  await fs.writeFile(jsonPath, JSON.stringify(data, null, 2), 'utf-8');
}

export const GET: APIRoute = async () => {
  const data = await readExperience();
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const currentData = await readExperience();
    const list = currentData.experience || [];

    if (body.reorder) {
      // Reorder operation: body.reorder is array of reordered items
      currentData.experience = body.reorder;
      await writeExperience(currentData);
      return new Response(JSON.stringify({ success: true, experience: currentData.experience }), { status: 200 });
    }

    if (body.id) {
      // Edit operation
      const idx = list.findIndex((item: any) => item.id === body.id);
      if (idx !== -1) {
        list[idx] = { ...list[idx], ...body };
      } else {
        list.unshift(body);
      }
    } else {
      // Add operation
      const newItem = {
        id: `exp_${Date.now()}`,
        is_published: true,
        ...body,
      };
      list.unshift(newItem);
    }

    currentData.experience = list;
    await writeExperience(currentData);

    return new Response(JSON.stringify({ success: true, experience: currentData.experience }), {
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
    const id = searchParams.get('id');
    if (!id) return new Response(JSON.stringify({ error: 'Missing ID' }), { status: 400 });

    const currentData = await readExperience();
    currentData.experience = (currentData.experience || []).filter((item: any) => item.id !== id);
    await writeExperience(currentData);

    return new Response(JSON.stringify({ success: true, experience: currentData.experience }), { status: 200 });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};
