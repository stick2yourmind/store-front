import { inter } from '@/lib/fonts';

function Footer() {
  return (
    <footer
      className={`${inter.className} mt-4 flex w-full items-center justify-center rounded-t-md bg-cyan-950 py-2 text-sm text-zinc-50`}
    >
      Copyright &#169; 2024 | Edge - all rights reserved
    </footer>
  );
}
export default Footer;
