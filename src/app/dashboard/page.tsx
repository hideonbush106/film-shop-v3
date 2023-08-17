'use client'

/* eslint-disable @next/next/no-img-element */
import { Box, Typography } from '@mui/material'
import React from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import ErrorPage from '~/components/ErrorPage'
import Loading from '~/components/Loading'
import axios from 'axios'
import useSWR from 'swr'
import CreateFilm from '~/components/button/CreateFilm'
import EditFilm from '~/components/button/EditFilm'
import DeleteFilm from '~/components/button/DeleteFilm'

const Dashboard = () => {
  const fetcher = (url: string) =>
    axios
      .get(url, {
        headers: { authorization: process.env.NEXT_PUBLIC_API_KEY }
      })
      .then((res) => res.data)
  const { data, error, isLoading } = useSWR('/api/films', fetcher)

  const columns: GridColDef[] = [
    {
      headerAlign: 'center',
      field: 'image',
      headerName: 'Image',
      width: 250,
      renderCell: (params) => <img src={params.value} alt='film' width='100%' />
    },
    { headerAlign: 'center', field: 'title', headerName: 'Title', width: 325 },
    {
      headerAlign: 'center',
      align: 'center',
      field: 'release_date',
      headerName: 'Release Date',
      width: 150,
      renderCell: (params) => new Date(params.value).toLocaleDateString('vi-VN')
    },
    { headerAlign: 'center', align: 'center', field: 'nations', headerName: 'Nation(s)', width: 150 },
    {
      headerAlign: 'center',
      align: 'center',
      field: 'imdbScore',
      headerName: 'IMBD Score',
      width: 150
    },
    { field: 'description', headerName: 'Description', width: 500 },
    {
      headerAlign: 'center',
      align: 'center',
      field: 'trailer',
      headerName: 'Trailer',
      width: 100,
      renderCell: (param) => (
        <a target='_blank' rel='noreferrer' href={param.value}>
          Link
        </a>
      )
    },
    {
      headerAlign: 'center',
      align: 'center',
      field: 'action',
      headerName: 'Action',
      width: 220,
      renderCell: (param) => (
        <>
          <EditFilm film={param.row} />
          <DeleteFilm film={param.row} />
        </>
      )
    }
  ]

  const films = data?.films

  if (isLoading) return <Loading />
  if (error) return <ErrorPage />
  if (!data) return <div>No data</div>

  return (
    <Box sx={{ p: 5 }}>
      <Typography align='center' variant='h4' sx={{ mb: 5 }}>
        Film Management
      </Typography>
      <CreateFilm />
      <DataGrid
        getRowId={(row) => row._id}
        initialState={{
          pagination: { paginationModel: { pageSize: 5 } }
        }}
        pageSizeOptions={[5, 10, 25]}
        rowHeight={150}
        rows={films}
        columns={columns}
      />
    </Box>
  )
}

export default Dashboard
