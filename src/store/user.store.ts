import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface IUserState {
  isLogged: boolean;
}

interface UserState {
  user: IUserState;
  signIn: () => void;
  signOut: () => void;
}

const initialUserState: IUserState = { isLogged: false };

const useUserStore = create<UserState>()(
  devtools((set, get) => ({
    user: initialUserState,
    signIn: () => {
      set({ user: { isLogged: true } });
    },
    signOut: () => {
      set({ user: { isLogged: false } });
    },
  })),
);

export default useUserStore;
