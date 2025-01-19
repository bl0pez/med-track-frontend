import { useEffect } from "react";
import { useRefreshToken } from "../services/auth.service";
import { useAuthStore } from "../store/useAuthStore";
import AppRoutes from "./app.routes";
import AuthRoutes from "./auth.routes";

export default function Navigation() {

  const { refetch, data } = useRefreshToken();
  const authStatus = useAuthStore(state => state.status);
  const refreshToken = useAuthStore(state => state.setRefreshToken);

  useEffect(() => {
    refetch();
    refreshToken(data?.token, data?.user);
  }, [data, refreshToken, refetch]);
 


  if (authStatus === 'loading') {
    return (
      <div>
        Loading...
      </div>
    )
  }

  return (
    <>
      { (authStatus === 'authenticated') ? <AppRoutes /> : <AuthRoutes /> }
    </>
  )
}