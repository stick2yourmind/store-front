import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { signInSchema } from '@/schema/auth/signInSchema';
import { sigIn } from '@/app/(auth)/signin/signIn.service';
import useUserStore from '@/store/user.store';
import { customRevalidatePath } from '@/actions/custom-revalidate-path';

interface LoginValues {
  email: string;
  password: string;
}

function useSignIn() {
  const { push } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({ resolver: zodResolver(signInSchema) });

  const signIn = useUserStore((state) => state.signIn);

  const { mutate } = useMutation({
    mutationFn: sigIn,
    onSuccess: () => {
      customRevalidatePath('/profile');
      toast.success('Sign in succesfully');
      signIn();
      push('/');
    },
    onError: (error) => {
      if (error instanceof Error) {
        if (error.message === 'Invalid password or email') {
          return toast.error('Invalid email or password');
        }
      }

      if (error instanceof TypeError) {
        if (error.message === 'NetworkError when attempting to fetch resource.') {
          return toast.error('Server is not reachable');
        }
      }
      return toast.error('An error has ocurred');
    },
  });

  const onSignIn = async ({ email, password }: LoginValues) => {
    mutate({ email, password });
  };

  return {
    onSignIn,
    mutate,
    register,
    handleSubmit,
    errors,
  };
}
export default useSignIn;
