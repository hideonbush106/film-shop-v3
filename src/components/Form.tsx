'use client'

import React from 'react'
import * as yup from 'yup'
import { useFormik } from 'formik'

const validationSchema = yup.object({
  title: yup.string().required('Please enter a title').max(100, 'Title cannot be more than 100 characters'),
  description: yup
    .string()
    .required('Please enter a description')
    .max(500, 'Description cannot be more than 500 characters'),
  director: yup.string().required('Please enter a director').max(100, 'Director cannot be more than 100 characters'),
  release_date: yup.date().required('Please enter a release date'),
  imdbScore: yup
    .number()
    .required('Please enter an IMDB score')
    .min(0, 'IMDB score cannot be less than 0')
    .max(10, 'IMDB score cannot be more than 10'),
  nation: yup.string().required('Please enter a nation').max(100, 'Nation cannot be more than 100 characters'),
  trailer: yup
    .string()
    .url('Please enter a valid YouTube URL')
    .matches(/^https:\/\/www\.youtube\.com\/embed\/[a-zA-Z0-9_-]{11}$/)
})

const Form = () => {
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      director: '',
      release_date: '',
      imdbScore: '',
      nation: '',
      trailer: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2))
    }
  })
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor='title'>Title</label>
        <input
          id='title'
          name='title'
          type='text'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.title}
        />
        {formik.touched.title && formik.errors.title ? <div>{formik.errors.title}</div> : null}
        <label htmlFor='description'>Description</label>
        <input
          id='description'
          name='description'
          type='text'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.description}
        />
        {formik.touched.description && formik.errors.description ? <div>{formik.errors.description}</div> : null}
        <label htmlFor='director'>Director</label>
        <input
          id='director'
          name='director'
          type='text'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.director}
        />
        {formik.touched.director && formik.errors.director ? <div>{formik.errors.director}</div> : null}
        <label htmlFor='release_date'>Release Date</label>
        <input
          id='release_date'
          name='release_date'
          type='date'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.release_date}
        />
        {formik.touched.release_date && formik.errors.release_date ? <div>{formik.errors.release_date}</div> : null}
        <label htmlFor='imdbScore'>IMDB Score</label>
        <input
          id='imdbScore'
          name='imdbScore'
          type='number'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.imdbScore}
        />
        {formik.touched.imdbScore && formik.errors.imdbScore ? <div>{formik.errors.imdbScore}</div> : null}
        <label htmlFor='nation'>Nation</label>
        <input
          id='nation'
          name='nation'
          type='text'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.nation}
        />
        {formik.touched.nation && formik.errors.nation ? <div>{formik.errors.nation}</div> : null}
        <label htmlFor='trailer'>Trailer</label>
        <input
          id='trailer'
          name='trailer'
          type='text'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.trailer}
        />
        {formik.touched.trailer && formik.errors.trailer ? <div>{formik.errors.trailer}</div> : null}
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default Form
