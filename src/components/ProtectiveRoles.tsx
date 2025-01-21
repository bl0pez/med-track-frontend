import { FC, useMemo } from "react";
import { Role } from "../interfaces";
import { useAuthStore } from "../store/useAuthStore";

interface Props {
  roles: Role[];
  children: React.ReactNode;
}

export const ProtectiveRoles: FC<Props> = ({ children, roles }) => {
  const user = useAuthStore((state) => state.user);

  const isAuthorized = useMemo(() => {
    if (!user) return false;

    return roles.some((role) => user.roles.includes(role));
  }, [roles, user]);

  return isAuthorized ? <>{children}</> : null;
};
