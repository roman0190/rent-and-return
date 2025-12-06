import Header from "@/components/layout/protected/Header";
import type { ReactNode } from "react";

const PublicLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      {children}
    </div>
  );
};

export default PublicLayout;
