import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <div>Auth Header</div>
      {children}
      <div>Shared Footer</div>
    </div>
  );
};

export default AuthLayout;
