'use client';

import Link from 'next/link';
import { inter } from '@/lib/fonts';
import useSignUp from '@/app/(auth)/signup/useSignUp';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

export default function Home() {
  const { handleSubmit, onSignUp, register, errors } = useSignUp();

  return (
    <main
      className={`${inter.className} flex min-w-full max-w-7xl grow items-center justify-center text-gray-100`}
    >
      <form
        className="flex max-w-lg flex-col items-center justify-center gap-2 rounded-lg bg-cyan-950 p-8 shadow-md"
        onSubmit={handleSubmit(onSignUp)}
      >
        <h1 className="text-xl">Sign Up Now!</h1>
        <fieldset className="w-full">
          <label htmlFor="email" className="self-start">
            Enter your email
          </label>
          <Input
            type="text"
            name="email"
            register={register}
            errors={errors}
            placeholder="example@mail.com"
            className="mt-1"
          />
        </fieldset>

        <fieldset className="w-full">
          <label htmlFor="password" className="self-start">
            Enter your password
          </label>
          <Input
            type="password"
            name="password"
            register={register}
            errors={errors}
            placeholder="Choose a password"
            className="mt-1"
          />
        </fieldset>

        <fieldset className="w-full">
          <label htmlFor="confirmPassword" className="self-start">
            Confirm your password
          </label>
          <Input
            type="password"
            name="confirmPassword"
            register={register}
            errors={errors}
            placeholder="Confirm your password"
            className="mt-1"
          />
        </fieldset>

        <Button type="submit" variantSize="lg" className="mt-2 text-sm font-semibold text-gray-50">
          Sign up
        </Button>
        <p className="text-xs font-normal">By registering you accept our Terms and Privacy Policy</p>
        <p className="mt-6 flex gap-1 self-end text-sm font-normal">
          Already have an account?
          <Link href="signin" className="underline">
            Sign in
          </Link>
        </p>
      </form>
    </main>
  );
}
