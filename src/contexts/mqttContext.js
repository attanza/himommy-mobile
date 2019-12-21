import React, { createContext, useReducer } from "react";

export const SET_CONNECTION = "SET_CONNECTION";

export const initialMqttState = {
  isOpenConnection: false,
  topics: []
};

export const MqttContext = createContext(initialMqttState);

const reduceRegisterState = (state, payload) => {
  const { isOpenConnection, topics } = payload;
  if (topics.length === 0) {
    return initialMqttState;
  } else {
    return { isOpenConnection, topics };
  }
};

export const mqttReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_CONNECTION:
      return reduceRegisterState(state, payload);

    default:
      return state;
  }
};

const MqttContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(mqttReducer, initialMqttState);

  const setConnection = payload => {
    dispatch({
      type: SET_CONNECTION,
      payload
    });
  };

  return (
    <MqttContext.Provider
      value={{
        isOpenConnection: state.isOpenConnection,
        topics: state.topics,
        setConnection
      }}
    >
      {children}
    </MqttContext.Provider>
  );
};

export default MqttContextProvider;
