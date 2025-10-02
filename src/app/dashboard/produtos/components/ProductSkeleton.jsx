export default function ProductSkeleton() {
  return (
    <div className="p-6 space-y-6">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <div>
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-2"></div>
          <div className="h-4 w-64 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
      </div>

      {/* Filters Skeleton */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="h-10 flex-1 bg-gray-200 rounded animate-pulse"></div>
        <div className="flex gap-2">
          <div className="h-10 w-20 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-10 w-24 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-10 w-28 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>

      {/* Products Skeleton */}
      <div className="grid gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="border rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex gap-4">
                <div className="w-20 h-20 bg-gray-200 rounded animate-pulse"></div>
                <div className="flex-1">
                  <div className="h-6 w-48 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-4 w-full bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
              <div className="text-right">
                <div className="h-6 w-20 bg-gray-200 rounded animate-pulse mb-1"></div>
                <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
            
            <div className="flex justify-between items-center pt-4 border-t">
              <div className="flex gap-2">
                <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-8 w-20 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}