import { useEffect, useRef } from "react";
import { getToken } from "../helpers/tokenHelper";
import { useHistory } from "react-router-dom";

const useIsAuth = () => {
  const history = useHistory();
  const checkAuth = async () => {
    const token = await getToken();
    if (token == null) history.push("/auth/login");
  };
  useEffect(() => {
    checkAuth();
  }, []);
};
export default useIsAuth;
