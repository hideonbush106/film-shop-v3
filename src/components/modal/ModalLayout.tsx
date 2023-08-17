import { Modal, useTheme } from '@mui/material'
import { Box } from '@mui/material'
import React from 'react'

interface ModalLayoutProps {
  children: React.ReactNode
  open: boolean
  handleClose: () => void
  overflow?: 'scroll' | 'hidden'
}

const ModalLayout = (props: ModalLayoutProps) => {
  const { open, handleClose, overflow } = props

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {
      xs: '95vw',
      md: '60vw',
      lg: '40vw'
    },
    bgcolor: 'white',
    boxShadow: 24,
    maxHeight: {
      xs: '100vh',
      md: '80vh'
    }
  }
  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style} component={'div'} style={{ overflowY: overflow }}>
          {React.Children.map(props.children, (child) =>
            React.cloneElement(child as React.ReactElement<any>, { handleClose })
          )}
        </Box>
      </Modal>
    </>
  )
}

export default ModalLayout
