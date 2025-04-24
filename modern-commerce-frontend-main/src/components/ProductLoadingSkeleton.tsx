const ProductLoadingSkeleton = () => {
  return (
    <div className="mx-auto flex w-full flex-col gap-10 py-8 xl:w-[60%]">
      <div className="mt-0 grid gap-8 sm:mt-5 md:grid-cols-2">
        {/* Image Skeleton */}
        <div className="size-[350px] w-full animate-pulse rounded-lg bg-gray-200 md:size-[320px] lg:size-[470px] xl:size-[400px]" />

        {/* Product Information */}
        <div className="flex flex-col items-center gap-4 sm:items-start">
          {/* Title */}
          <div className="h-9 w-3/4 animate-pulse rounded bg-gray-200 text-3xl font-bold" />

          {/* Price */}
          <div className="flex items-center gap-2">
            <div className="h-8 w-24 animate-pulse rounded bg-gray-200 text-2xl font-semibold" />
          </div>

          {/* Quantity Selection */}
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 animate-pulse rounded bg-gray-200" />
            <div className="h-8 w-8 animate-pulse rounded bg-gray-200 text-xl font-semibold" />
            <div className="h-10 w-10 animate-pulse rounded bg-gray-200" />
          </div>

          {/* Add to Cart Button */}
          <div className="mt-4 h-10 w-full animate-pulse rounded bg-gray-200" />
        </div>
      </div>

      {/* Description */}
      <div className="flex w-full flex-col gap-y-3">
        <div className="h-8 w-48 animate-pulse rounded bg-gray-200 text-2xl font-bold text-primary" />
        <div className="text-md h-20 w-full animate-pulse rounded bg-gray-200" />
      </div>
    </div>
  );
};

export default ProductLoadingSkeleton;
