'use client'

import { useInfiniteQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import { useInView } from 'react-intersection-observer'
import { useEffect, useState } from 'react'
import { fetchMovies, searchMovies } from '../lib/tmdb'
import { useDebounce } from 'use-debounce'

interface MovieResponse {
  page: number
  results: Movie[]
  total_pages: number
}

export function MovieList({ initialMovies }: { initialMovies: MovieResponse }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearch] = useDebounce(searchTerm, 500)
  const { ref, inView } = useInView()

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ['movies', debouncedSearch],
    queryFn: ({ pageParam }) => 
      debouncedSearch 
        ? searchMovies(debouncedSearch, pageParam)
        : fetchMovies(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1
      }
      return undefined
    },
    initialData: debouncedSearch ? undefined : {
      pages: [initialMovies],
      pageParams: [1],
    },
  })

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, fetchNextPage])

  return (
    <div className="space-y-6">
      <div className="sticky top-14 z-10 bg-white dark:bg-gray-900 py-4">
        <input
          type="search"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 
                    focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 
                    dark:text-white"
        />
      </div>

      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : data?.pages[0].results.length === 0 ? (
        <div className="text-center">No movies found</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data?.pages.map((page) =>
            page.results.map((movie: Movie) => (
              <Link
                key={movie.id}
                href={`/movies/${movie.id}`}
                className="transform transition duration-300 hover:scale-105"
              >
                <div className="relative aspect-[2/3]">
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    fill
                    className="rounded-lg object-cover"
                    loading="lazy"
                  />
                </div>
                <h2 className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">
                  {movie.title}
                </h2>
              </Link>
            ))
          )}
          <div ref={ref} className="col-span-full text-center">
            {isFetchingNextPage && <div>Loading more...</div>}
          </div>
        </div>
      )}
    </div>
  )
}