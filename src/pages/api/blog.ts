import type { APIRoute } from 'astro';
import fs from 'node:fs/promises';
import path from 'node:path';

export const prerender = false;

const jsonPath = path.join(process.cwd(), 'src', 'content', 'profile', 'blog.json');

async function readBlog() {
  try {
    const data = await fs.readFile(jsonPath, 'utf-8');
    return JSON.parse(data);
  } catch {
    return { blog: [] };
  }
}

async function writeBlog(data: any) {
  await fs.writeFile(jsonPath, JSON.stringify(data, null, 2), 'utf-8');
}

export const GET: APIRoute = async () => {
  const data = await readBlog();
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const currentData = await readBlog();
    const list = currentData.blog || [];

    if (body.reorder) {
      currentData.blog = body.reorder;
      await writeBlog(currentData);
      return new Response(JSON.stringify({ success: true, blog: currentData.blog }), { status: 200 });
    }

    const itemSlug = body.slug || `blog_${Date.now()}`;
    const idx = list.findIndex((item: any) => item.slug === body.oldSlug || item.slug === itemSlug);

    const postObj = {
      slug: itemSlug,
      title: body.title || 'Untitled Post',
      date: body.date || new Date().toISOString().split('T')[0],
      category: body.category || 'MAPPING',
      readTime: body.readTime || '5 min',
      heroImage: body.heroImage || '',
      excerpt: body.excerpt || '',
      body: body.body || '',
      is_published: body.is_published !== false,
    };

    if (idx !== -1) {
      list[idx] = { ...list[idx], ...postObj };
    } else {
      list.unshift(postObj);
    }

    currentData.blog = list;
    await writeBlog(currentData);

    return new Response(JSON.stringify({ success: true, blog: currentData.blog }), {
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
    const slug = searchParams.get('slug');
    if (!slug) return new Response(JSON.stringify({ error: 'Missing slug' }), { status: 400 });

    const currentData = await readBlog();
    currentData.blog = (currentData.blog || []).filter((item: any) => item.slug !== slug);
    await writeBlog(currentData);

    return new Response(JSON.stringify({ success: true, blog: currentData.blog }), { status: 200 });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};
