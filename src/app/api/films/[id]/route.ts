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

export async function PUT(request: NextRequest) {
  await dbConnect()
  const id = request.url.slice(request.url.lastIndexOf('/') + 1)
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
    const film = await Films.findByIdAndUpdate(id, body)
    return NextResponse.json({ message: 'success', film }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ message: 'error', error }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  await dbConnect()
  const id = request.url.slice(request.url.lastIndexOf('/') + 1)
  try {
    const film = await Films.findByIdAndDelete(id)
    return NextResponse.json({ message: 'success', film }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ message: 'error', error }, { status: 500 })
  }
}
