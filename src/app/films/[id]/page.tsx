/* eslint-disable @next/next/no-img-element */
'use client'

import { ArrowBack } from '@mui/icons-material'
import { Box, Button, Container, Typography } from '@mui/material'
import axios from 'axios'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import React from 'react'
import useSWR from 'swr'
import ErrorPage from '~/components/ErrorPage'
import Loading from '~/components/Loading'

const FilmDetails = () => {
  const pathname = usePathname()
  const fetcher = (url: string) =>
    axios
      .get(url, {
        headers: { authorization: process.env.NEXT_PUBLIC_API_KEY }
      })
      .then((res) => res.data)

  const router = useRouter()

  const { data, error, isLoading } = useSWR(`/api/films/${pathname.split('/')[2]}`, fetcher)
  if (isLoading) return <Loading />
  if (error) return <ErrorPage />
  if (!data) return <div>No data</div>
  return (
    <Container sx={{ display: 'flex', justifyContent: 'center', marginTop: '2rem', flexWrap: 'wrap-reverse' }}>
      <Box
        sx={{
          marginRight: { sm: '2rem', xs: 0 },
          marginBottom: { sm: 0, xs: '1rem' },
          width: { sm: '35%', xs: '100%' },
          display: 'flex',
          objectFit: 'cover',
          justifyContent: 'center'
        }}
      >
        <img src={data.films.image} alt={data.films.title} />
      </Box>
      <Box sx={{ width: { sm: '60%', xs: '100%' } }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => {
            router.back()
          }}
          color='primary'
        >
          Back
        </Button>
        <Typography variant='h4' component='h1'>
          {data.films.title}
        </Typography>
        <Typography variant='body1'>{data.films.description}</Typography>
        <Typography variant='body2'>Director: {data.films.director}</Typography>
        <Typography variant='body2'>Nations: {data.films.nations}</Typography>
        <Typography variant='body2'>IMDb Rating: {data.films.imdbScore}</Typography>
        <Typography variant='body2' sx={{ marginBottom: '2rem' }}>
          Release Date: {new Date(data.films.release_date).toLocaleDateString('vi-VN')}
        </Typography>
        <iframe
          className='video'
          src={data.films.trailer}
          title='YouTube video player'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          allowFullScreen
          width={'100%'}
          height={'500px'}
        ></iframe>
      </Box>
    </Container>
  )
}

export default FilmDetails
