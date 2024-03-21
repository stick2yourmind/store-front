'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { IconContext } from 'react-icons';
import { HiOutlineShoppingBag } from 'react-icons/hi2';
import { PiSignInBold, PiSignOutBold } from 'react-icons/pi';
import { RxDashboard } from 'react-icons/rx';
import { FaRegUser } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { FADE_DOWN_VARIANT } from '@/lib/framer-variant';
import useNavbar from '@/components/Navbar/use-navbar';

export interface INavbarProps {
  isLogged: boolean;
  roles: string[];
}

function Navbar({ isLogged, roles }: INavbarProps) {
  const { signInState, signOutState, isLoggedState, mutate, cartLength } = useNavbar();

  useEffect(() => {
    if (isLogged) signInState();
    else signOutState();
  }, [isLogged]);

  return (
    <nav className="flex self-stretch">
      <ol className="flex gap-4 self-stretch">
        {roles.includes('ADMIN') ? (
          <li className="flex items-center justify-center">
            <Link href="/dashboard" className="flex items-center justify-center gap-1 pr-4">
              <RxDashboard className="text-xl" />
            </Link>
          </li>
        ) : null}
        <li className="flex items-center justify-center">
          {isLoggedState ? (
            <>
              <Link href="/profile" className="flex items-center justify-center gap-1 pr-4">
                <h2 className="hidden text-xl sm:block">Profile</h2>
                <FaRegUser className="text-xl" />
              </Link>
              <button onClick={() => mutate()} className="flex items-center justify-center gap-1">
                <h2 className="hidden text-xl sm:block">Sign out</h2>
                <PiSignOutBold className="text-xl" />
              </button>
            </>
          ) : (
            <Link href="/signin" className="flex items-center justify-center gap-1">
              <h2 className="hidden text-xl sm:block">Sign</h2>
              <PiSignInBold className="text-xl" />
            </Link>
          )}
        </li>
        <li className="flex items-center justify-center">
          <Link href="/checkout" className="flex items-center justify-center gap-1">
            <h2 className="hidden text-xl sm:block">checkout</h2>
            <div className="relative flex h-8 w-8 items-center justify-center">
              <IconContext.Provider value={{ style: { scale: '2.5' } }}>
                <HiOutlineShoppingBag className="absolute flex items-center" />
              </IconContext.Provider>
              <motion.span
                variants={FADE_DOWN_VARIANT}
                initial="hidden"
                animate="enter"
                key={cartLength}
                className="absolute mt-3 rounded-full p-1 text-xs"
              >
                {cartLength}
              </motion.span>
            </div>
          </Link>
        </li>
      </ol>
    </nav>
  );
}
export default Navbar;
