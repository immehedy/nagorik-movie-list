import MovieCardSkeleton from "./MovieSkeleton";

const MovieSkeletonGrid = () => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
      {[...Array(10)].map((_, index) => (
        <MovieCardSkeleton key={index} />
      ))}
    </div>
  );

  export default MovieSkeletonGrid;