import { getToken } from "../helpers/tokenHelper";

const checkAuth = async history => {
  const token = await getToken();
  if (token == null) history.push("/auth/login");
};

export default checkAuth;
