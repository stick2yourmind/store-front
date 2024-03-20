'use client';

import { useEffect } from 'react';

import Button from '@/components/ui/Button';
import { inter } from '@/lib/fonts';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className={`${inter.className} flex grow flex-col items-center justify-center gap-4`}>
      <h2 className="text-xl">Something went wrong!</h2>
      <Button
        className="border-0 bg-orange-600 transition-transform hover:scale-105 hover:bg-orange-600"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </Button>
    </div>
  );
}
