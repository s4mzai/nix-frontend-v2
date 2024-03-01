import SideNavigation from "@/components/SideNavigation/sideNavigation";
import { Spinner } from "@/components/Spinner";
import { Suspense } from "react";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-row w-screen">
      <div className="mr-[60px] z-40 ">
        <SideNavigation />
      </div>
      <main className="flex-grow bg-[var(--bg-color)] p-4">
        <Suspense
          fallback={
            <div className="flex items-center justify-center h-screen">
              <Spinner size="md" />
            </div>
          }
        >
          {children}
        </Suspense>
      </main>
    </div>
  );
};

export default Layout;
