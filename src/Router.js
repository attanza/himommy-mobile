import { Provider } from "mobx-react";
import React from "react";
import FlashMessage from "react-native-flash-message";
import { BackButton, NativeRouter, Route, Switch } from "react-router-native";
import Loader from "./components/commons/Loader";
import Mqtt from "./components/commons/Mqtt";
import {
  AuthContextProvider,
  MqttContextProvider,
  RegisterContextProvider,
  TocologistContextProvider
} from "./contexts";
import {
  LandingScreen,
  LoginRegisterScreen,
  LoginScreen,
  RegisterOneScreen,
  RegisterThreeScreen,
  RegisterTwoScreen,
  ReservationScreen,
  SplashScreen,
  TocologistDetailScreen,
  TocologistsScreen,
  UserHomeScreen,
  UserProfileScreen
} from "./screens";
import store from "./store";
import catchError from "./helpers/catchError";
global.catchError = catchError;
const Router = () => {
  return (
    <Provider store={store}>
      <Loader></Loader>
      <NativeRouter>
        <BackButton>
          <Switch>
            <Route exact path="/" component={SplashScreen} />
            <Route exact path="/landing" component={LandingScreen} />

            <Route
              exact
              path="/auth/loginRegister"
              component={LoginRegisterScreen}
            />
            <Route exact path="/auth/login" component={LoginScreen} />

            {/* REGISTER */}
            <Route exact path="/register/one" component={RegisterOneScreen} />
            <Route exact path="/register/two" component={RegisterTwoScreen} />
            <Route
              exact
              path="/register/three"
              component={RegisterThreeScreen}
            />

            {/* USER */}
            <Route exact path="/user" component={UserHomeScreen} />
            <Route exact path="/user/profile" component={UserProfileScreen} />
            <Route
              exact
              path="/user/tocologists"
              component={TocologistsScreen}
            />
            <Route
              exact
              path="/user/tocologists/:id"
              component={TocologistDetailScreen}
            />
            <Route
              exact
              path="/user/tocologists/:id/reservation"
              component={ReservationScreen}
            />
          </Switch>
        </BackButton>
      </NativeRouter>

      <FlashMessage
        position="center"
        duration={3000}
        style={{ textAlign: "center" }}
      />
    </Provider>
  );
};

export default Router;
