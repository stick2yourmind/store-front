import { PRODUCTS_PER_PAGE } from '@/config/pagination.config';

const usePagination = ({ total, currentPage }: { total: number; currentPage: number }) => {
  const maxPage = Math.ceil(total / PRODUCTS_PER_PAGE);
  const previousPage = `?${new URLSearchParams({ page: String(currentPage - 1) })}`;
  const nextPage = `?${new URLSearchParams({ page: String(currentPage + 1) })}`;

  return { maxPage, previousPage, nextPage };
};
export default usePagination;
