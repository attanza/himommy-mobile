import React, { createContext, useReducer } from "react";

export const SET_TOKEN = "SET_TOKEN";
export const SET_USER = "SET_USER";
export const SHOW_LOADER = "SHOW_LOADER";
export const LOGOUT = "LOGOUT";

export const initialAuthState = {
  loading: false,
  token: "",
  user: {}
};

export const AuthContext = createContext(initialAuthState);

export const authReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_TOKEN:
      return {
        ...state,
        token: payload
      };
    case SET_USER:
      return {
        ...state,
        user: payload
      };

    case SHOW_LOADER:
      return {
        ...state,
        loading: payload
      };

    case LOGOUT:
      return initialAuthState;

    default:
      return state;
  }
};

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  const setToken = payload => {
    dispatch({
      type: SET_TOKEN,
      payload
    });
  };

  const setUser = payload => {
    dispatch({
      type: SET_USER,
      payload
    });
  };

  const showLoader = payload => {
    dispatch({
      type: SHOW_LOADER,
      payload
    });
  };

  const logout = () => {
    dispatch({
      type: LOGOUT
    });
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        user: state.user,
        loading: state.loading,
        setUser,
        setToken,
        showLoader,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
