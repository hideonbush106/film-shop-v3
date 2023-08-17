'use client'

import { Alert, Box, Button, FormControl, Snackbar, TextField, Typography } from '@mui/material'
import ModalLayout from './ModalLayout'
import { Add } from '@mui/icons-material'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import axios from 'axios'
import useSWR from 'swr'
import { Film } from '~/models/Films'
import { useState } from 'react'

interface Props {
  open: boolean
  handleClose: () => void
}

const CreateFilmModal = (props: Props) => {
  const { open, handleClose } = props
  const getFilm = (url: string) =>
    axios
      .get(url, {
        headers: { authorization: process.env.NEXT_PUBLIC_API_KEY }
      })
      .then((res) => res.data)

  const fetcher = (url: string, body: Film) =>
    axios
      .post(url, body, {
        headers: { authorization: process.env.NEXT_PUBLIC_API_KEY }
      })
      .then((res) => res.data)

  const { mutate } = useSWR('/api/films', getFilm)

  const validationSchema = yup.object({
    title: yup.string().required('Please enter a title').max(50, 'Title cannot be more than 100 characters'),
    description: yup
      .string()
      .required('Please enter a description')
      .max(500, 'Description cannot be more than 500 characters'),
    director: yup.string().required('Please enter a director').max(50, 'Director cannot be more than 50 characters'),
    release_date: yup.date().required('Please enter a release date'),
    imdbScore: yup
      .number()
      .required('Please enter an IMDB score')
      .max(10, 'IMDB score cannot be more than 10')
      .min(0, 'IMDB score cannot be less than 0'),
    nations: yup.string().required('Please enter a nation(s)').max(100, 'Nation(s) cannot be more than 100 characters'),
    trailer: yup.string().required('Please enter a trailer URL'),
    image: yup.string().required('Please enter an image URL')
  })

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      director: '',
      release_date: new Date(),
      imdbScore: 0,
      nations: '',
      trailer: '',
      image: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await fetcher('/api/films', values)
        mutate()
        handleClose()
      } catch (error) {
        console.log(error)
      } finally {
        setSubmitting(false)
        formik.resetForm()
      }
    }
  })

  return (
    <>
      <ModalLayout open={open} handleClose={handleClose} overflow='scroll'>
        <Box
          bgcolor={'white'}
          display={'inline-flex'}
          sx={{
            p: {
              xs: 1.5,
              sm: 3
            },
            position: 'sticky',
            top: 0,
            zIndex: 1,
            width: '100%',

            boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
          }}
        >
          <Add fontSize='large' sx={{ mx: 1 }} />
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: {
                xs: '1.5rem',
                sm: '2rem'
              }
            }}
            variant='h4'
          >
            Add new film
          </Typography>
        </Box>
        <form method='POST' onSubmit={formik.handleSubmit}>
          <FormControl sx={{ width: '100%', px: 5, my: 2 }}>
            <TextField
              variant='outlined'
              sx={{ my: 1 }}
              onChange={formik.handleChange}
              value={formik.values.title}
              label='Film Title'
              fullWidth
              name='title'
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
            <TextField
              variant='outlined'
              sx={{ my: 1 }}
              onChange={formik.handleChange}
              value={formik.values.description}
              label='Film Description'
              fullWidth
              name='description'
              error={formik.touched.description && Boolean(formik.errors.description)}
              helperText={formik.touched.description && formik.errors.description}
            />
            <TextField
              variant='outlined'
              sx={{ my: 1 }}
              onChange={formik.handleChange}
              value={formik.values.director}
              label='Film Director'
              fullWidth
              name='director'
              error={formik.touched.director && Boolean(formik.errors.director)}
              helperText={formik.touched.director && formik.errors.director}
            />
            {/* <TextField
            sx={{ my: 1 }}
            onChange={formik.handleChange}
            value={formik.values.release_date}
            type='date'
            label='Film Release Date'
            variant='standard'
            fullWidth
            name='release_date'
            error={formik.touched.release_date && Boolean(formik.errors.release_date)}
            helperText={formik.touched.release_date && formik.errors.release_date}
          /> */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                sx={{ my: 1 }}
                label='Film Release Date'
                format='DD/MM/YYYY'
                onChange={(date) => formik.setFieldValue('release_date', date)}
              />
            </LocalizationProvider>
            <TextField
              variant='outlined'
              sx={{ my: 1 }}
              onChange={formik.handleChange}
              value={formik.values.imdbScore}
              type='number'
              label='Film IMDB Score'
              fullWidth
              name='imdbScore'
              error={formik.touched.imdbScore && Boolean(formik.errors.imdbScore)}
              helperText={formik.touched.imdbScore && formik.errors.imdbScore}
            />
            <TextField
              variant='outlined'
              sx={{ my: 1 }}
              onChange={formik.handleChange}
              value={formik.values.nations}
              label='Film Nation(s)'
              fullWidth
              name='nations'
              error={formik.touched.nations && Boolean(formik.errors.nations)}
              helperText={formik.touched.nations && formik.errors.nations}
            />
            <TextField
              variant='outlined'
              sx={{ my: 1 }}
              onChange={formik.handleChange}
              value={formik.values.trailer}
              label='Film Trailer URL'
              fullWidth
              name='trailer'
              error={formik.touched.trailer && Boolean(formik.errors.trailer)}
              helperText={formik.touched.trailer && formik.errors.trailer}
            />
            <TextField
              variant='outlined'
              sx={{ my: 1 }}
              onChange={formik.handleChange}
              value={formik.values.image}
              label='Film Image URL'
              fullWidth
              name='image'
              error={formik.touched.image && Boolean(formik.errors.image)}
              helperText={formik.touched.image && formik.errors.image}
            />
          </FormControl>
          <Box
            sx={{
              marginTop: 3,
              p: 1.5,
              position: 'sticky',
              bottom: -1,
              zIndex: 1,
              display: 'flex',
              justifyContent: 'end',
              width: '100%',
              boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
            }}
          >
            <Button sx={{ my: 1, mr: 1 }} type='submit'>
              Add
            </Button>
            <Button sx={{ my: 1 }} color='error' variant='outlined' onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </form>
      </ModalLayout>
    </>
  )
}

export default CreateFilmModal
