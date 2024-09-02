import { Outlet } from "react-router-dom";
import AppBar from "./appbar/AppBar.tsx";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <AppBar />
      <main className="flex flex-col flex-grow">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
