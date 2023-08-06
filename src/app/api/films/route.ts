import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '~/libs/dbConnect'
import Films from '~/models/Films'
export async function GET() {
  await dbConnect()
  try {
    const films = await Films.find({})
    return NextResponse.json({ message: 'success', films })
  } catch (error) {
    return NextResponse.json({ message: 'error', error })
  }
}

export async function POST(request: NextRequest) {
  await dbConnect()
  try {
    const film = await Films.create(request.body)
    return NextResponse.json({ message: 'success', film })
  } catch (error) {
    return NextResponse.json({ message: 'error', error })
  }
}
