import { useEffect } from "react";
import { useRefreshToken } from "../services/auth.service";
import { useAuthStore } from "../store/useAuthStore";
import AppRoutes from "./app.routes";
import AuthRoutes from "./auth.routes";
import { Spinner } from "../components/Spinner";

export default function Navigation() {

  const { data, isPending } = useRefreshToken();
  const authStatus = useAuthStore(state => state.status);
  const refreshToken = useAuthStore(state => state.setRefreshToken);

  useEffect(() => {
    if (!isPending) {
      refreshToken(data?.token, data?.user);
    }
  }, [data, refreshToken, isPending]);
 


  if (authStatus === 'loading' || isPending) {
    return (<Spinner />)
  }

  return (
    <>
      { (authStatus === 'authenticated') ? <AppRoutes /> : <AuthRoutes /> }
    </>
  )
}