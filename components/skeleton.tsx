"use client"

export function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse bg-secondary rounded-lg ${className}`} />
}

export function PageSkeleton() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav skeleton */}
      <div className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-md z-50 border-b border-border px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Skeleton className="h-6 w-20" />
          <div className="hidden md:flex space-x-8">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-14" />
            <Skeleton className="h-4 w-12" />
          </div>
        </div>
      </div>

      {/* Hero skeleton */}
      <section className="px-6 pt-32 pb-24">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-16 w-full max-w-md" />
            <Skeleton className="h-16 w-full max-w-sm" />
            <Skeleton className="h-4 w-full max-w-lg" />
            <Skeleton className="h-4 w-full max-w-md" />
            <Skeleton className="h-4 w-64" />
            <div className="flex gap-4 pt-2">
              <Skeleton className="h-14 w-36 rounded-xl" />
              <Skeleton className="h-14 w-40 rounded-xl" />
            </div>
          </div>
          <Skeleton className="w-full max-w-sm mx-auto aspect-[5/6] rounded-2xl" />
        </div>
      </section>

      {/* Journey skeleton */}
      <section className="px-6 py-24 border-y border-border bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <Skeleton className="h-10 w-48 mx-auto mb-16" />
          <div className="grid md:grid-cols-2 gap-16">
            <div className="space-y-4">
              <Skeleton className="h-4 w-24 mb-8" />
              {[1, 2].map(i => <Skeleton key={i} className="h-32 rounded-xl" />)}
            </div>
            <div className="space-y-4">
              <Skeleton className="h-4 w-28 mb-8" />
              {[1, 2].map(i => <Skeleton key={i} className="h-32 rounded-xl" />)}
            </div>
          </div>
        </div>
      </section>

      {/* Skills skeleton */}
      <section className="px-6 py-24">
        <div className="max-w-3xl mx-auto">
          <Skeleton className="h-10 w-40 mx-auto mb-16" />
          <div className="grid md:grid-cols-2 gap-x-16 gap-y-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i}>
                <div className="flex justify-between mb-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-10" />
                </div>
                <Skeleton className="h-1 w-full" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
