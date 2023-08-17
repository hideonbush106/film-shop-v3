import mongoose from 'mongoose'

export interface Film {
  _id?: string
  title: string
  description: string
  director: string
  release_date: Date
  imdbScore: number
  nations: string
  trailer: string
  image: string
}

const filmSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please enter a title'],
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please enter a description'],
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  director: {
    type: String,
    required: [true, 'Please enter a director'],
    maxlength: [100, 'Director cannot be more than 100 characters']
  },
  release_date: {
    type: Date,
    required: [true, 'Please enter a release date']
  },
  imdbScore: {
    type: Number,
    required: [true, 'Please enter an IMDB score'],
    min: [0, 'IMDB score cannot be less than 0'],
    max: [10, 'IMDB score cannot be more than 10']
  },
  nations: {
    type: String,
    required: [true, 'Please enter a nation(s)'],
    maxlength: [100, 'Nation(s) cannot be more than 100 characters']
  },
  trailer: {
    type: String,
    required: [true, 'Please enter a trailer URL']
  },
  image: {
    type: String,
    required: [true, 'Please enter an image URL']
  }
})

export default mongoose.models.Film || mongoose.model('Film', filmSchema)
