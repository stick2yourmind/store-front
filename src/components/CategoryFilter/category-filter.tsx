'use client';

import { Listbox, Popover, Transition } from '@headlessui/react';
import Link from 'next/link';
import { Fragment, useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

export interface ICategoryFilter {
  categories: ICategory[];
}

export default function CategoryFilter({ categories }: ICategoryFilter) {
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(null);
  return (
    <div className="z-10 max-w-sm">
      <Listbox value={selectedCategory} onChange={setSelectedCategory}>
        <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md  sm:text-sm">
          {selectedCategory?.name || 'Category:'}
        </Listbox.Button>
        <Listbox.Options className="absolute mt-1 flex flex-col bg-white">
          {categories.map((category) => (
            <Listbox.Option key={category.id} value={category} className="flex">
              <Link
                href={`?category=${category.id}`}
                className="w-full cursor-pointer px-4 py-2 transition-all hover:bg-neutral-200/50"
              >
                {category.name}
              </Link>
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  );
}
