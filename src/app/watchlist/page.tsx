import { getWatchlist } from '../actions/watchlist'
import Link from 'next/link'

export default async function WatchlistPage() {
  const watchlist = await getWatchlist();

  if (watchlist.length === 0) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">My Watchlist</h1>
        <p>Your watchlist is empty.</p>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold mb-4">My Watchlist</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {watchlist.map((movie) => (
          <div key={movie.id} className="border rounded-lg p-4">
            <Link href={`/movies/${movie.id}`}>
              <img 
                src={`https://image.tmdb.org/t/p/w500${movie.poster}`} 
                alt={movie.title} 
                className="w-full h-48 object-cover rounded-lg mb-2"
              />
              <h2 className="font-semibold">{movie.title}</h2>
              <p className="text-sm text-gray-500">
                Added {new Date(movie.addedAt).toLocaleDateString()}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}