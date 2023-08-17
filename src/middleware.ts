import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const APIKey: string | null = request.headers.get('authorization')
  if (APIKey === process.env.NEXT_PUBLIC_API_KEY) {
    return NextResponse.next()
  } else return new Response('Unauthorized', { status: 401 })
}

export const config = {
  matcher: '/api/:path*'
}
