import { ButtonHTMLAttributes, ReactNode } from 'react';
import cn from '@/lib/tailwind-merge';
import { VariantProps, cva } from 'class-variance-authority';

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: ReactNode;
}

function Button({ children, className, variant, variantSize, ...props }: ButtonProps) {
  return (
    <button {...props} className={cn(buttonVariants({ variant, variantSize, className }))}>
      {children}
    </button>
  );
}
export default Button;

const buttonBaseClass = 'w-full rounded-md';
const styleClasses = {
  primary: 'border-2 border-solid border-secondary-800 bg-primary-900 text-neutral-100 hover:bg-neutral-800',
  secondary:
    'border-2 border-solid border-secondary-800 bg-neutral-100 text-primary-900 hover:bg-neutral-800',
};
const sizeClasses = {
  sm: 'px-1 py-0 text-sm',
  md: 'px-2 py-0 text-base',
  lg: 'px-3 py-2 text-xl',
};

const buttonVariants = cva(buttonBaseClass, {
  variants: {
    variant: styleClasses,
    variantSize: sizeClasses,
  },
  defaultVariants: {
    variant: 'primary',
    variantSize: 'md',
  },
});
