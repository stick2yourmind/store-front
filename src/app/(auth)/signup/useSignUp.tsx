import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { signUpSchema } from '@/schema/auth/signUpSchema';
import { signUp } from '@/app/(auth)/signup/signUp.service';
import useUserStore from '@/store/user.store';
import { customRevalidatePath } from '@/actions/custom-revalidate-path';

interface SignUpValues {
  email: string;
  password: string;
  confirmPassword: string;
}

function useSignUp() {
  const { push } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpValues>({ resolver: zodResolver(signUpSchema) });

  const signIn = useUserStore((state) => state.signIn);

  const { mutate } = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      customRevalidatePath('/profile');
      toast.success('Sign in succesfully');
      signIn();
      push('/');
    },
    onError: (error: any) => {
      if (error instanceof Error) {
        if (error.message === 'Invalid password or email') {
          return toast.error('Invalid email or password');
        }
        if (error.message === 'Unique constraint failure: email') {
          return toast.error('Email already taken');
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

  const onSignUp = async ({ email, password }: SignUpValues) => {
    mutate({ email, password });
  };

  return {
    onSignUp,
    mutate,
    register,
    handleSubmit,
    errors,
  };
}
export default useSignUp;
