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
  const { title, description, director, release_date, imdbScore, nations, trailer, image } = await request.json()
  try {
    const body = {
      title,
      description,
      director,
      release_date,
      imdbScore,
      nations,
      trailer,
      image
    }
    const film = await Films.create(body)
    return NextResponse.json({ message: 'success', film }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ message: 'error', error }, { status: 500 })
  }
}
