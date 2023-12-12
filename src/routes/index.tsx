import { useAuthStore } from "../shared/store/useAuthStore";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";

export default function Routes() {
  const user = useAuthStore(state => state.user);
  console.log({user});
  return (
    <>
      {user?.id ? <PrivateRoutes /> : <PublicRoutes />}
    </>
  )
}