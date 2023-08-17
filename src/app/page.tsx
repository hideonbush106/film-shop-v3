'use client'

import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import useSWR from 'swr'
import Loading from '~/components/Loading'
import ErrorPage from '~/components/ErrorPage'
import { Film } from '~/models/Films'
import { Info } from '@mui/icons-material'
import { useRouter } from 'next/navigation'
import axios from 'axios'

export default function Home() {
  const fetcher = (url: string) =>
    axios
      .get(url, {
        headers: { authorization: process.env.NEXT_PUBLIC_API_KEY }
      })
      .then((res) => res.data)

  const router = useRouter()

  const { data, error, isLoading } = useSWR('/api/films', fetcher)
  if (isLoading) return <Loading />
  if (error) return <ErrorPage />
  if (!data) return <div>No data</div>
  return (
    <Grid
      container
      spacing={3}
      sx={{ marginTop: '0', marginBottom: '5rem', padding: '2rem', justifyContent: 'center' }}
    >
      {data.films &&
        data.films.map((film: Film) => (
          <Grid xs={12} sm={6} lg={3} item key={film._id}>
            <Card sx={{ height: 900 }}>
              <CardMedia sx={{ height: 700 }} image={film.image} title={film.title} />
              <CardContent>
                <Typography gutterBottom variant='h5' component='div'>
                  {film.title}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  Nation: {film.nations}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  Release Date: {new Date(film.release_date).toLocaleDateString('vi-VN')}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant='outlined'
                  startIcon={<Info />}
                  onClick={() => {
                    router.push(`/films/${film._id}`)
                  }}
                >
                  Detail
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
    </Grid>
  )
}
