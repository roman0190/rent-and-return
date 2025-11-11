import type { ReactNode } from "react";

const ProtectedLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <div>Proceted Header</div>
      {children}
      <div>Shared Footer</div>
    </div>
  );
};

export default ProtectedLayout;
