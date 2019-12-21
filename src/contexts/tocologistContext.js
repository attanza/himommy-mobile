import React, { createContext, useReducer } from "react";

export const POPULATE_TOCOLOGISTS = "POPULATE_TOCOLOGISTS";
export const SET_TOCOLOGIST = "SET_TOCOLOGIST";
export const SET_PAGINATION = "SET_PAGINATION";
export const SET_TOCOLOGIST_SERVICE = "SET_TOCOLOGIST_SERVICE";

export const initialTocologistState = {
  page: 1,
  limit: 10,
  total: 0,
  lastPage: 1,
  tocologists: [],
  tocologist: {},
  tocologistService: {}
};

export const TocologistContext = createContext(initialTocologistState);

export const authReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case POPULATE_TOCOLOGISTS:
      return {
        ...state,
        tocologists: state.tocologists.concat(payload)
      };

    case SET_PAGINATION:
      return {
        ...state,
        page: payload.page,
        limit: payload.limit,
        total: payload.total,
        lastPage: payload.lastPage
      };

    case SET_TOCOLOGIST:
      return {
        ...state,
        tocologist: payload
      };

    case SET_TOCOLOGIST_SERVICE:
      return {
        ...state,
        tocologistService: payload
      };

    default:
      return state;
  }
};

const TocologistContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialTocologistState);

  const populateTocologists = payload => {
    dispatch({
      type: POPULATE_TOCOLOGISTS,
      payload
    });
  };

  const setPagination = payload => {
    dispatch({
      type: SET_PAGINATION,
      payload
    });
  };

  const setTocologist = payload => {
    dispatch({
      type: SET_TOCOLOGIST,
      payload
    });
  };

  const setTocologistService = payload => {
    dispatch({
      type: SET_TOCOLOGIST_SERVICE,
      payload
    });
  };

  return (
    <TocologistContext.Provider
      value={{
        page: state.page,
        limit: state.limit,
        total: state.total,
        lastPage: state.lastPage,
        tocologists: state.tocologists,
        tocologist: state.tocologist,
        tocologistService: state.tocologistService,
        populateTocologists,
        setPagination,
        setTocologist,
        setTocologistService
      }}
    >
      {children}
    </TocologistContext.Provider>
  );
};

export default TocologistContextProvider;
