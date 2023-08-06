import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '~/libs/dbConnect'
import Films from '~/models/Films'

export async function GET(request: NextRequest) {
  await dbConnect()
  const id = request.url.slice(request.url.lastIndexOf('/') + 1)

  try {
    const films = await Films.findById(id)
    return NextResponse.json({ message: 'success', films })
  } catch (error) {
    return NextResponse.json({ message: 'error', error })
  }
}
