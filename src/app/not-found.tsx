'use client';

import Link from 'next/link';
import { inter } from '@/lib/fonts';
import Button from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className={`${inter.className} flex grow flex-col items-center justify-center gap-4`}>
      <h2 className="text-xl">Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/">
        <Button className="border-0 bg-[color:#14b8a6] transition-transform hover:scale-105 hover:bg-[color:#14b8a6]">
          Home
        </Button>
      </Link>
    </div>
  );
}
