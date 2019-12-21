import { storeUser } from "../helpers/tokenHelper";

export default ({ rawMessage, setUser }) => {
  const message = JSON.parse(rawMessage);
  console.log("message", message);
  if (message.topic === "profile") {
    storeUser(message.data);
    setUser(message.data);
  }
  return true;
};
