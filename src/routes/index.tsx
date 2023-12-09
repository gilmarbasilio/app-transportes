import { useAuthStore } from "../shared/store/useAuthStore";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";

export default function Routes() {
  // const user = useAuthStore(state => state.user)
  const token = useAuthStore(state => state.token);
  return (
    <>
      {token ? <PrivateRoutes /> : <PublicRoutes />}
    </>
  )
}