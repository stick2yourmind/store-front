import { PRODUCTS_PER_PAGE } from '@/config/pagination.config';

const usePagination = ({
  total,
  currentPage,
  category,
}: {
  total: number;
  currentPage: number;
  category?: string;
}) => {
  const maxPage = Math.ceil(total / PRODUCTS_PER_PAGE);

  const searchParamsPrevious = {
    page: String(currentPage - 1),
    category,
  };
  const searchParamsNext = {
    page: String(currentPage + 1),
    category,
  };
  if (!searchParamsPrevious.category) delete searchParamsPrevious.category;
  if (!searchParamsNext.category) delete searchParamsNext.category;
  const previousPage = `?${new URLSearchParams(searchParamsPrevious as Record<string, string>)}`;
  const nextPage = `?${new URLSearchParams(searchParamsNext as Record<string, string>)}`;

  return { maxPage, previousPage, nextPage };
};
export default usePagination;
