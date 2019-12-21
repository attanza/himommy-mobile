import { removeToken } from "./tokenHelper";

export default async (user, history) => {
  if (user && user.role === "user") {
    history.push("/user");
  } else if (user.role === "tocologist") {
    history.push("/tocologist");
  } else {
    console.log("check user role: not belong to any role");
    await removeToken();
    history.push("/auth/login");
  }
};
