import React, { createContext, useReducer } from "react";

export const SET_REGISTER = "SET_REGISTER";

export const initialTocologistState = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  password: ""
};

export const RegisterContext = createContext(initialTocologistState);

const reduceRegisterState = (state, payload) => {
  const { firstName, lastName, phone, email, password } = payload;
  const newSate = Object.assign({}, state);
  if (firstName && firstName !== "") newSate.firstName = firstName;
  if (lastName && lastName !== "") newSate.lastName = lastName;
  if (phone && phone !== "") newSate.phone = phone;
  if (email && email !== "") newSate.email = email;
  if (password && password !== "") newSate.password = password;
  return newSate;
};

export const authReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_REGISTER:
      return reduceRegisterState(state, payload);

    default:
      return state;
  }
};

const RegisterContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialTocologistState);

  const setRegisterData = payload => {
    dispatch({
      type: SET_REGISTER,
      payload
    });
  };

  return (
    <RegisterContext.Provider
      value={{
        firstName: state.firstName,
        lastName: state.lastName,
        phone: state.phone,
        email: state.email,
        password: state.password,
        setRegisterData
      }}
    >
      {children}
    </RegisterContext.Provider>
  );
};

export default RegisterContextProvider;
