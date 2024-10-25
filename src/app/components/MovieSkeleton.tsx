const MovieCardSkeleton = () => (
    <div className="w-full">
      <div className="space-y-3">
        {/* Poster skeleton */}
        <div className="aspect-[2/3] w-full bg-gray-200 animate-pulse rounded-t-lg" />
        
        <div className="space-y-2">
          {/* Title skeleton */}
          <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
          
          {/* Description skeleton */}
          <div className="space-y-2">
            <div className="h-3 bg-gray-200 rounded animate-pulse" />
            <div className="h-3 bg-gray-200 rounded animate-pulse w-5/6" />
          </div>
        </div>
      </div>
    </div>
  );

  export default MovieCardSkeleton