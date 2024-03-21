import Link from 'next/link';
import { PiArrowCircleRightFill, PiArrowCircleLeftFill } from 'react-icons/pi';
import usePagination from '@/components/Pagination/usePagination';

function Pagination({
  currentPage,
  total,
  category,
}: {
  currentPage: number;
  total: number;
  category?: string;
}) {
  const { maxPage, nextPage, previousPage } = usePagination({ currentPage, total, category });
  return (
    <div className="flex gap-2 self-center p-4">
      {currentPage > 1 ? (
        <Link href={previousPage}>
          <PiArrowCircleLeftFill className="text-4xl" />
        </Link>
      ) : null}

      <span className="text-4xl">{currentPage}</span>

      {currentPage < maxPage ? (
        <Link href={nextPage}>
          <PiArrowCircleRightFill className="text-4xl" />
        </Link>
      ) : null}
    </div>
  );
}
export default Pagination;
