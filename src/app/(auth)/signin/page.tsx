'use client';

import Link from 'next/link';
import { inter } from '@/lib/fonts';
import useSignIn from '@/app/(auth)/signin/use-sign-in';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

export default function Home() {
  const { handleSubmit, onSignIn, register, errors } = useSignIn();
  return (
    <main
      className={`${inter.className} flex min-w-full max-w-7xl grow items-center justify-center text-gray-100`}
    >
      <form
        className="flex max-w-lg flex-col items-center justify-center gap-2 rounded-lg bg-cyan-950 p-8 shadow-md"
        onSubmit={handleSubmit(onSignIn)}
      >
        <h1 className="text-xl">Sign In</h1>
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

        <Button type="submit" variantSize="lg" className="mt-2 text-sm font-semibold text-gray-50">
          Sign in
        </Button>

        <p className="mt-6 flex gap-1 self-end text-sm font-normal">
          Don&apos;t have an account?
          <Link href="signup" className="underline">
            Sign up
          </Link>
        </p>
      </form>
    </main>
  );
}
