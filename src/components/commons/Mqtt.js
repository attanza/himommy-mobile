import React, { useEffect, useContext } from "react";
import init from "react_native_mqtt";
import { AsyncStorage } from "react-native";
import { MqttContext, AuthContext } from "../../contexts";
import mqttActions from "../../helpers/mqttActions";

const Mqtt = ({ children }) => {
  const { isOpenConnection, topics } = useContext(MqttContext);
  const { setUser } = useContext(AuthContext);

  init({
    size: 10000,
    storageBackend: AsyncStorage,
    defaultExpires: 1000 * 3600 * 24,
    enableCache: true,
    reconnect: true,
    sync: {}
  });

  const client = new Paho.MQTT.Client("mqtt.himommy.org", 443, "");

  const onConnect = () => {
    console.log("topics", topics);
    if (topics.length) {
      console.log("subscribe to topics");
      topics.map(topic => client.subscribe(topic));
    }
  };

  const onConnectionLost = responseObject => {
    if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost:" + responseObject.errorMessage);
    }
  };

  const onMessageArrived = message => {
    mqttActions({ rawMessage: message.payloadString, setUser });
  };

  const initMqtt = () => {
    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;
    client.connect({
      onSuccess: onConnect,
      useSSL: true,
      userName: "himommy_mqtt",
      password: "a583989f551d",
      reconnect: true,
      onFailure: e => {
        console.log("here is the error", e);
      }
    });
  };

  useEffect(() => {
    if (!isOpenConnection) {
      console.log("MQTT connection closed");
    } else {
      initMqtt();
    }
  }, [isOpenConnection]);
  return <>{children}</>;
};

export default Mqtt;
