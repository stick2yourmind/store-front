import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import useUserStore from '@/store/user.store';
import useCartStore from '@/store/cart.store';
import { signOut } from '@/components/Navbar/signOut.service';
import { customRevalidatePath } from '@/actions/custom-revalidate-path';

function useNavbar() {
  const cartLength = useCartStore((state) => state.cart).length || null;
  const { push } = useRouter();
  const signInState = useUserStore((state) => state.signIn);
  const signOutState = useUserStore((state) => state.signOut);
  const { isLogged: isLoggedState } = useUserStore((state) => state.user);
  const { mutate } = useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      toast.success('Sign out succesfully');
      signOutState();
      customRevalidatePath('/');
      push('/');
    },
    onError: (error) => {
      if (error instanceof TypeError) {
        if (error.message === 'NetworkError when attempting to fetch resource.') {
          return toast.error('Server is not reachable');
        }
      }
      return toast.error('An error has ocurred');
    },
  });

  return {
    signInState,
    signOutState,
    isLoggedState,
    mutate,
    cartLength,
  };
}

export default useNavbar;
