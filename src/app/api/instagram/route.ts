import { NextResponse } from 'next/server';

// Basic server-side proxy for Instagram Basic Display API
// Requires IG_ACCESS_TOKEN to be present in environment.
// Token should be a long-lived user token for the target Instagram account.

export async function GET() {
  const accessToken = process.env.IG_ACCESS_TOKEN;
  if (!accessToken) {
    return NextResponse.json(
      { error: 'Missing IG_ACCESS_TOKEN in environment' },
      { status: 400 }
    );
  }

  const url = new URL('https://graph.instagram.com/me/media');
  url.searchParams.set(
    'fields',
    'id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,username'
  );
  url.searchParams.set('access_token', accessToken);
  url.searchParams.set('limit', '12');

  try {
    const res = await fetch(url.toString(), { next: { revalidate: 300 } });
    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json({ error: 'Upstream error', details: text }, { status: 502 });
    }
    const data = await res.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    const err = error as { message?: string } | undefined;
    return NextResponse.json({ error: err?.message ?? 'Unknown error' }, { status: 500 });
  }
}


