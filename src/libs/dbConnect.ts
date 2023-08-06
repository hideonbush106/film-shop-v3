import mongoose, { Mongoose } from 'mongoose'

const MONGODB_URI: string = process.env.MONGODB_URI || ''

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local')
}

interface CachedConnection {
  conn: Mongoose | null
  promise: Promise<Mongoose> | null
}

declare global {
  var mongoose: CachedConnection
}

if (!global.mongoose) {
  global.mongoose = { conn: null, promise: null }
}

async function dbConnect(): Promise<Mongoose> {
  if (global.mongoose.conn) {
    return global.mongoose.conn
  }

  if (!global.mongoose.promise) {
    const opts = {
      bufferCommands: false
    }

    global.mongoose.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
      console.log('Connected to MongoDB')
      return mongooseInstance
    })
  }

  try {
    global.mongoose.conn = await global.mongoose.promise
  } catch (e) {
    global.mongoose.promise = null
    throw e
  }

  return global.mongoose.conn
}

export default dbConnect
