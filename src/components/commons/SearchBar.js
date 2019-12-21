import { EvilIcons, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import DelayInput from "react-native-debounce-input";
import { Box } from "react-native-design-utility";
import { theme } from "../../utils/theme";

class SearchBar extends React.Component {
  state = {
    value: ""
  };

  _clear = () => {
    this._onChangeText("");
  };

  _onChangeText = val => {
    this.setState({ value: val });
    this.props.onSearch(val);
  };

  render() {
    const { value } = this.state;
    return (
      <>
        <Box
          w="100%"
          h={40}
          dir="row"
          shadow={0}
          align="center"
          radius="xl"
          bg="greyLightest"
        >
          <Box w={40} h={40} center>
            <EvilIcons
              name="search"
              size={32}
              color={theme.color.greyLight}
            ></EvilIcons>
          </Box>
          <Box f={1}>
            <DelayInput
              value={value}
              minLength={0}
              onChangeText={this._onChangeText}
              delayTimeout={500}
            />
          </Box>
          {value !== "" && (
            <Box w={40} h={40} center>
              <TouchableOpacity onPress={this._clear}>
                <MaterialIcons
                  name="clear"
                  size={28}
                  color={theme.color.greyLight}
                ></MaterialIcons>
              </TouchableOpacity>
            </Box>
          )}
        </Box>
      </>
    );
  }
}

export default SearchBar;
