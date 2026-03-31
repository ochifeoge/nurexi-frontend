import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export default function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      {/* Heading Skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-[250px]" />
        <Skeleton className="h-4 w-[350px]" />
      </div>

      {/* StatsGrid Skeleton (Assuming 3-4 cards) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-24 w-full rounded-xl" />
        ))}
      </div>

      {/* Weekly Practice Skeleton */}
      <div className="my-4 space-y-4">
        <div className="space-y-1">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-48" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <Card
              key={i}
              className="h-23 flex items-center justify-center border"
            >
              <div className="flex flex-col items-center gap-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-6 w-6 rounded-full" />
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Activities & Recommended Skeleton */}
      <div className="flex flex-col md:flex-row gap-4">
        <Skeleton className="h-[300px] flex-1 rounded-xl" />
        <Skeleton className="h-[300px] w-full md:w-[350px] rounded-xl" />
      </div>
    </div>
  );
}
