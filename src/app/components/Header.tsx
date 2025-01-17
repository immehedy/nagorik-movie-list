import { ThemeToggle } from './ThemeToggle'
import Link from 'next/link'

export function Header() {
  return (
    <header className="fixed top-0 w-full bg-gray-900 dark:bg-white z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link 
            href="/"
            className="text-red-400 text-2xl font-bold"
          >
            Nagorik Tech
          </Link>
          <div className='flex items-center gap-x-8'>
          <Link href="/watchlist" className='dark:text-gray-700 text-white font-bold transform transition duration-300 hover:scale-105'>WatchList</Link>
          <ThemeToggle />
          </div>
          
        </div>
      </nav>
    </header>
  )
}