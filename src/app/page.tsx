import { Suspense } from 'react'
import { fetchMovies } from './lib/tmdb'
import { MovieList } from './components/MovieList'

export const revalidate = 3600 // ISR - revalidate every hour

export default async function Home() {
  const initialMovies = await fetchMovies()
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Popular Movies
      </h1>
      <Suspense fallback={<div>Loading...</div>}>
        <MovieList initialMovies={initialMovies} />
      </Suspense>
    </div>
  )
}