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
      const searchKey = (body.oldName || body.name).toLowerCase();
      const idx = list.findIndex(
        (item: any) =>
          (item.id && body.id && item.id === body.id) ||
          item.name.toLowerCase() === searchKey
      );

      const skillObj = {
        id: body.id || `skill_${Date.now()}`,
        name: body.name,
        category: body.category || 'Languages & Frameworks',
        proficiency: body.proficiency || 'Advanced',
        icon: body.icon || '',
        is_published: body.is_published !== false,
      };

      if (idx !== -1) {
        list[idx] = { ...list[idx], ...skillObj };
      } else {
        list.push(skillObj);
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
    const id = searchParams.get('id');
    if (!name && !id) return new Response(JSON.stringify({ error: 'Missing name or id' }), { status: 400 });

    const currentData = await readSkills();
    currentData.skills = (currentData.skills || []).filter((item: any) => {
      if (id && item.id === id) return false;
      if (name && item.name.toLowerCase() === name.toLowerCase()) return false;
      return true;
    });
    await writeSkills(currentData);

    return new Response(JSON.stringify({ success: true, skills: currentData.skills }), { status: 200 });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};
