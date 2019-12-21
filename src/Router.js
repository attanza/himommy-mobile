import React from "react";
import { NativeRouter, Route, Switch, BackButton } from "react-router-native";
import FlashMessage from "react-native-flash-message";
import Loader from "./components/commons/Loader";
import Mqtt from "./components/commons/Mqtt";
import {
  SplashScreen,
  LoginRegisterScreen,
  LoginScreen,
  LandingScreen,
  RegisterOneScreen,
  RegisterTwoScreen,
  RegisterThreeScreen,
  UserHomeScreen,
  UserProfileScreen,
  TocologistDetailScreen,
  TocologistsScreen,
  ReservationScreen
} from "./screens";

import {
  RegisterContextProvider,
  AuthContextProvider,
  TocologistContextProvider,
  MqttContextProvider
} from "./contexts";

const Router = () => {
  return (
    <>
      <AuthContextProvider>
        <RegisterContextProvider>
          <TocologistContextProvider>
            <MqttContextProvider>
              <Mqtt>
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
                      <Route
                        exact
                        path="/register/one"
                        component={RegisterOneScreen}
                      />
                      <Route
                        exact
                        path="/register/two"
                        component={RegisterTwoScreen}
                      />
                      <Route
                        exact
                        path="/register/three"
                        component={RegisterThreeScreen}
                      />

                      {/* USER */}
                      <Route exact path="/user" component={UserHomeScreen} />
                      <Route
                        exact
                        path="/user/profile"
                        component={UserProfileScreen}
                      />
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
              </Mqtt>
            </MqttContextProvider>
          </TocologistContextProvider>
        </RegisterContextProvider>
      </AuthContextProvider>
      <FlashMessage position="center" duration={3000} />
    </>
  );
};

export default Router;
