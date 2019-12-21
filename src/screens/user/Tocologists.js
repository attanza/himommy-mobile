import React, { Component } from "react";
import { Box, Text } from "react-native-design-utility";
import { FlatList, ActivityIndicator } from "react-native";
import MyLocation from "../../components/user/MyLocation";
import Appbar from "../../components/commons/Appbar";
import TocologistsApi from "../../apis/TocologistsApi";
import TocologistCard from "../../components/user/TocologistCard";
import SearchBar from "../../components/commons/SearchBar";
import checkAuth from "../../hooks/checkAuth";
import catchError from "../../helpers/catchError";

export default class Tocologists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
      page: 1,
      refreshing: false,
      lastPage: 1,
      search: ""
    };
  }
  componentDidMount() {
    checkAuth(this.props.history);
    this.makeRemoteRequest();
  }

  makeRemoteRequest = async () => {
    const { page, search } = this.state;
    this.setState({ loading: true });
    try {
      const resp = await TocologistsApi.getAll(page, search);
      this.setState({
        data: page === 1 ? resp.data : [...this.state.data, ...resp.data],
        loading: false,
        refreshing: false,
        lastPage: resp.meta.lastPage
      });
    } catch (e) {
      catchError(e);
      this.setState({ loading: false });
    }
  };

  renderHeader = () => <Box></Box>;

  renderFooter = () => {
    if (!this.state.loading) return null;
    return (
      <Box w="100%" h={70} center mt="sm">
        <ActivityIndicator size="large"></ActivityIndicator>
      </Box>
    );
  };

  handleRefresh = () => {
    this.setState(
      {
        page: 1,
        refreshing: true,
        search: ""
      },
      () => {
        if (this.state.page <= this.state.total) {
          this.makeRemoteRequest();
        }
      }
    );
  };

  handleLoadMore = () => {
    const { page, lastPage } = this.state;
    if (page <= lastPage) {
      this.setState(
        {
          page: this.state.page + 1
        },
        () => {
          this.makeRemoteRequest();
        }
      );
    }
  };

  onSearch = val => {
    this.setState({ search: val, page: 1 }, () => {
      this.makeRemoteRequest();
    });
  };

  render() {
    const { data, refreshing } = this.state;
    return (
      <>
        <Appbar title="BIDANKU" link="/user"></Appbar>
        <MyLocation></MyLocation>
        <Box px="md">
          <SearchBar onSearch={this.onSearch}></SearchBar>
        </Box>
        <Box
          my="xs"
          style={{ borderBottomWidth: 16, borderBottomColor: "#E9E9E9" }}
        ></Box>

        <Box px="md">
          <FlatList
            data={data}
            renderItem={({ item }) => <TocologistCard item={item} />}
            keyExtractor={item => item.uid}
            ListHeaderComponent={this.renderHeader}
            ListFooterComponent={this.renderFooter}
            refreshing={refreshing}
            onRefresh={this.handleRefresh}
            onEndReached={this.handleLoadMore}
            onEndReachedThreshold={0.5}
            showsVerticalScrollIndicator={false}
          ></FlatList>
        </Box>
      </>
    );
  }
}
