'use client'

import Link from 'next/link'
import useSWR from 'swr'
import { Film } from '~/models/Films'
const fetcher = async (...args: Parameters<typeof fetch>) => {
  const res = await fetch(...args)
  return res.json()
}
export default function Home() {
  const { data, error, isLoading } = useSWR('/api/films', fetcher)
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error</div>
  if (!data) return <div>No data</div>
  return (
    <>
      <Link href='/news'>News</Link>
      <Link href='/dashboard'>Dashboard</Link>
      {!isLoading &&
        data.films.map((film: Film) => (
          <div key={film._id}>
            <h1>{film.title}</h1>
            <p>{film.description}</p>
          </div>
        ))}
    </>
  )
}
