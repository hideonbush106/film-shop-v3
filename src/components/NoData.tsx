import { Error, FolderOff } from '@mui/icons-material'
import { Box, Button, CircularProgress, Typography } from '@mui/material'
import useTheme from '@mui/material/styles/useTheme'
import { useRouter } from 'next/navigation'

const NoData = () => {
  const theme = useTheme()
  const router = useRouter()
  return (
    <Box
      height={'90vh'}
      bgcolor={theme.palette.mode === 'dark' ? 'black' : 'white'}
      sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}
    >
      <FolderOff sx={{ fontSize: '200px', color: 'red' }} />
      <Typography variant='h2' sx={{ color: 'red' }}>
        Oops, no data found!
      </Typography>
      <Button
        variant='outlined'
        sx={{ marginTop: '2rem' }}
        onClick={() => {
          router.push('/')
        }}
      >
        Back
      </Button>
    </Box>
  )
}

export default NoData
