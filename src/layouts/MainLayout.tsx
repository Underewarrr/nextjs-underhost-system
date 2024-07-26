
import { ReactNode } from "react";
import Navbar from "../components/Navbar";

interface Props {
  children: ReactNode;
}

const MainLayout = ({ children }: Props) => {
  return (
    <div>
      <Navbar />
      <div className="container mt-3">
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
