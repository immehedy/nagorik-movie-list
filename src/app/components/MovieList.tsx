'use client'

import { useInfiniteQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react'
import { fetchMovies } from '../lib/tmdb'

interface MovieResponse {
  page: number
  results: Movie[]
  total_pages: number
}

export function MovieList({ initialMovies }: { initialMovies: MovieResponse }) {
  const { ref, inView } = useInView()

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['movies'],
    queryFn: ({ pageParam }) => fetchMovies(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1
      }
      return undefined
    },
    initialData: {
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
  )
}