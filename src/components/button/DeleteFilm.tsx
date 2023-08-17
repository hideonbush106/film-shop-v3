import { Button, IconButton, useMediaQuery, useTheme } from '@mui/material'
import { useState } from 'react'
import { Delete } from '@mui/icons-material'
import DeleteFilmModal from '../modal/DeleteFilmModal'
import { Film } from '~/models/Films'

interface Props {
  film: Film
}

const DeleteFilm = (props: Props) => {
  const { film } = props
  const theme = useTheme()
  const xs = useMediaQuery(theme.breakpoints.down('xs'))
  const sm = useMediaQuery(theme.breakpoints.down('sm'))
  const [open, setOpen] = useState(false)
  const handleClose = () => {
    setOpen(false)
  }
  return (
    <>
      {xs || sm ? (
        <IconButton color='error' size='large' sx={{ m: 1 }} onClick={() => setOpen(true)}>
          <Delete />
        </IconButton>
      ) : (
        <Button sx={{ mx: 0.5 }} variant='outlined' color='error' onClick={() => setOpen(true)}>
          Delete
        </Button>
      )}
      <DeleteFilmModal open={open} handleClose={handleClose} film={film} />
    </>
  )
}

export default DeleteFilm
