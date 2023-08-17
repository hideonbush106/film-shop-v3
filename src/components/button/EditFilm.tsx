import { Edit } from '@mui/icons-material'
import { Button, IconButton, useMediaQuery, useTheme } from '@mui/material'
import React, { useState } from 'react'
import EditFilmModal from '../modal/EditFilmModal'
import { Film } from '~/models/Films'

interface Props {
  film: Film
}

const EditFilm = (props: Props) => {
  const { film } = props
  const [open, setOpen] = useState(false)
  const theme = useTheme()
  const xs = useMediaQuery(theme.breakpoints.down('xs'))
  const sm = useMediaQuery(theme.breakpoints.down('sm'))
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      {xs || sm ? (
        <IconButton size='large' sx={{ m: 1 }} onClick={() => setOpen(true)}>
          <Edit />
        </IconButton>
      ) : (
        <Button sx={{ mx: 0.5 }} onClick={() => setOpen(true)}>
          Edit
        </Button>
      )}
      <EditFilmModal open={open} handleClose={handleClose} film={film} />
    </>
  )
}
export default EditFilm
