import { Link } from '@remix-run/react';
import { ROUTES } from '~/utils/constants';

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <header className="bg-white border-b border-gray-100 px-4">
        <nav className="container flex justify-between items-center py-4">
          <h1 className="text-2xl font-bold">Draw</h1>
          <ul className="flex space-x-8">
            <li>
              <Link
                to={ROUTES.HOME}
                className="text-black hover:text-purple-900 transition-colors font-normal"
              >
                Home
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className="h-full">{children}</main>
      <footer className="bg-white border-t border-gray-100 w-full">
        <div className="flex items-center p-4 w-full">
          <p className="container text-gray-600">
            Draw &copy; {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </>
  );
};

export default MainLayout;
