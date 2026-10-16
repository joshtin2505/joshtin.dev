import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')
  const slug = searchParams.get('slug')

  const expectedSecret = process.env.PAYLOAD_SECRET || 'dev-payload-secret-key-at-least-32-chars-long'

  if (secret !== expectedSecret) {
    return new Response('Invalid draft token', { status: 401 })
  }

  const draft = await draftMode()
  draft.enable()

  if (!slug || slug === 'home') {
    redirect('/')
  }

  redirect(`/${slug}`)
}
