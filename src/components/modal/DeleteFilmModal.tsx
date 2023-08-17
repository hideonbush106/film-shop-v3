import React from 'react'
import ModalLayout from './ModalLayout'
import axios from 'axios'
import { Box, Button, Typography } from '@mui/material'
import { Film } from '~/models/Films'
import useSWR, { mutate } from 'swr'
interface Props {
  open: boolean
  handleClose: () => void
  film: Film
}
const DeleteFilmModal = (props: Props) => {
  const { open, handleClose, film } = props
  const getFilm = (url: string) =>
    axios
      .get(url, {
        headers: { authorization: process.env.NEXT_PUBLIC_API_KEY }
      })
      .then((res) => res.data)

  const { mutate } = useSWR('/api/films', getFilm)

  const deleteFilm = (url: string) =>
    axios
      .delete(url, {
        headers: { authorization: process.env.NEXT_PUBLIC_API_KEY }
      })
      .then((res) => res.data)

  return (
    <Box>
      <ModalLayout open={open} handleClose={handleClose}>
        <Box
          display={'inline-flex'}
          sx={{
            p: {
              xs: 1.5,
              sm: 3
            },
            width: '100%'
          }}
        >
          <Typography
            sx={{
              fontWeight: 600,
              color: 'var(--black-color)',
              fontSize: {
                xs: '1.5rem',
                sm: '2rem'
              },
              fontFamily: 'inherit',
              mx: 1
            }}
            variant='h4'
          >
            Delete film
          </Typography>
        </Box>
        <Box
          sx={{
            width: '100%',
            px: {
              xs: 2.5,
              sm: 4
            }
          }}
        >
          <Typography
            sx={{
              color: 'var(--black-color)',
              my: 1.5,
              fontSize: {
                xs: '1.1rem',
                sm: '1.3rem'
              },
              fontFamily: 'inherit'
            }}
            variant='body2'
          >
            {`Are you sure you want to delete "${film.title}"?`}
          </Typography>
        </Box>
        <Box
          sx={{
            p: {
              xs: 1.5,
              sm: 4
            },
            background: 'white',
            display: 'flex',
            justifyContent: 'end',
            width: '100%'
          }}
        >
          <Button
            sx={{ m: 1, mr: 1 }}
            color='error'
            variant='outlined'
            onClick={() => {
              deleteFilm(`api/films/${film._id}`)
              handleClose()
              mutate()
            }}
          >
            Delete
          </Button>
          <Button sx={{ m: 1, mr: 1 }} variant='outlined' onClick={handleClose}>
            Cancel
          </Button>
        </Box>
      </ModalLayout>
    </Box>
  )
}

export default DeleteFilmModal
