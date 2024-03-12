import { DetailedHTMLProps, InputHTMLAttributes, ReactNode } from 'react';
import cn from '@/lib/tailwind-merge';
import { VariantProps, cva } from 'class-variance-authority';
import { FormState, UseFormRegister } from 'react-hook-form';

export interface InputProps
  extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  children?: ReactNode;
  name: string;
  register: UseFormRegister<any>;
  errors: FormState<any>['errors'];
}

function Input({ children, className, variant, variantSize, register, errors, name, ...props }: InputProps) {
  return (
    <>
      <input
        {...props}
        {...register(name)}
        id={name}
        className={cn(inputVariants({ variant, variantSize, className }))}
      >
        {children}
      </input>
      {errors[name]?.message && <p className="text-red-600">{String(errors[name]?.message)}</p>}
    </>
  );
}
export default Input;

const baseClass =
  'w-full rounded bg-secondary-900 p-3 text-sm font-normal text-secondary-200 outline outline-1 outline-secondary-800 hover:bg-neutral-100';
const primaryClass = 'hover:bg-white focus-visible:outline focus-visible:outline-teal-500';
const secondaryClass = 'hover:bg-white focus-visible:outline focus-visible:outline-teal-500';
const smallClass = 'text-sm';
const mediumClass = 'text-base';
const largeClass = 'text-xl';

const inputVariants = cva(baseClass, {
  variants: {
    variant: {
      primary: primaryClass,
      secondary: secondaryClass,
    },
    variantSize: {
      sm: smallClass,
      md: mediumClass,
      lg: largeClass,
    },
  },
  defaultVariants: {
    variant: 'primary',
    variantSize: 'md',
  },
});
