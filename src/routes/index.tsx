import { useAuthStore } from "../store/useAuthStore";
import AppRoutes from "./app.routes";
import AuthRoutes from "./auth.routes";

export default function Navigation() {

  const authStatus = useAuthStore(state => state.status);

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