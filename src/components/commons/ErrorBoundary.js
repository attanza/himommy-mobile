import React, { Component } from "react";
import { Text, View } from "react-native";

export default class ErrorBoundary extends Component {
  componentDidCatch(error, info) {
    console.log("error", error);
    console.log("info", info);
  }
  render() {
    return this.props.children;
  }
}
