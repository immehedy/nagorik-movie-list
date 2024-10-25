

import Image from 'next/image'
import { fetchMovie, fetchRecommendations } from '../../lib/tmdb'
import { WatchlistButton } from '@/app/components/WatchlistButton';

export async function generateMetadata(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const movie = await fetchMovie(params?.id)
  return {
    title: movie.title,
    description: movie.overview,
  }
}

export default async function MoviePage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;

  const movie = await fetchMovie(params?.id)

  // Fetch recommendations
  const recommendations = await fetchRecommendations(params?.id); // New line to fetch recommendations



  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0">
        
        <Image
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          fill
          className="object-cover opacity-30"
          priority
        />
        
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/3">
            <div className="relative aspect-[2/3]">
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                fill
                className="rounded-lg object-cover"
                priority
              />
            </div>
          </div>
          
          <div className="w-full md:w-2/3">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {movie.title}
            </h1>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
              {movie.overview}
            </p>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Release Date: {new Date(movie.release_date).toLocaleDateString()}
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Rating: {movie.vote_average.toFixed(1)}/10
              </span>
            </div>
          </div>
        </div>

        <WatchlistButton movie={movie} />
        {/* Recommendations Section */}
      <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Recommendations:</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recommendations.map((rec) => (
              <div key={rec.id} className="relative aspect-[2/3]">
                <Image
                  src={`https://image.tmdb.org/t/p/w500${rec.poster_path}`}
                  alt={rec.title}
                  fill
                  className="rounded-lg object-cover"
                />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{rec.title}</h3>
              </div>
            ))}
          </div>
        </div>
        {/* End of Recommendations Section */}
      </div>

      
    </div>
  )
}