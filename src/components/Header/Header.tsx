import Link from 'next/link';
import { cookies } from 'next/headers';
import { SiDedge } from 'react-icons/si';
import Navbar from '../Navbar/Navbar';

function Header() {
  const cookieStore = cookies();
  const token = cookieStore.get('userToken');
  const serializeRole = cookieStore.get('role')?.value;
  const deserializeRole = decodeURIComponent(serializeRole || '');
  const roles = JSON.parse(deserializeRole || '[]');

  return (
    <header className="sticky top-0 z-10 flex w-full items-center justify-between rounded bg-white/30 pb-4 pt-1 backdrop-blur-3xl">
      <Link href="/" className="flex items-center justify-center gap-2 text-4xl">
        <h1>Edge</h1>
        <SiDedge />
      </Link>
      <Navbar isLogged={!!token} roles={roles} />
    </header>
  );
}
export default Header;
