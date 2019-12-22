import { decorate, observable, action } from "mobx";
import { showMessage } from "react-native-flash-message";

class Store {
  loader = false;
  user = {};
  message = {
    text: "",
    type: ""
  };
  registerData = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: ""
  };

  showLoader = val => (this.loader = val);
  setUser = user => (this.user = user);
  showMessage = message => {
    showMessage({
      message: message.text,
      type: message.type,
      icon: message.type
    });
  };
  setRegisterData = data => {
    const newRegisterData = { ...this.registerData, ...data };
    this.registerData = newRegisterData;
  };
}

decorate(Store, {
  loader: observable,
  showLoader: action,
  user: observable,
  setUser: action,
  message: observable,
  showMessage: action,
  registerData: observable,
  setRegisterData: action
});

export default new Store();
