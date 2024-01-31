import SideNavigation from '../components/SideNavigation/sideNavigation';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--bg-color)]">
      <main className="flex-grow container mx-auto my-4">
        <SideNavigation />
        {children}
      </main>
      <footer className="bg-gray-200 text-gray-700 p-4">
        <p>DTU TIMES TODO footer </p>
      </footer>
    </div>
  );
};

export default Layout;
