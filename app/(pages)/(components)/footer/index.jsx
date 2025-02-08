import { Link } from '~/components/link';
import Logo from '~/components/svartalheim.svg';

export function Footer() {
  return (
    <footer className='flex flex-col dt:flex-row items-center dt:items-start justify-between p-page uppercase '>
      <Link href='https://svartalheim.dev/' className='link'>
        <Logo className='sw-148 text-black' />
      </Link>
      <div>
        <span className=''>made with ❤️ by svartalheim</span>
      </div>
    </footer>
  );
}
