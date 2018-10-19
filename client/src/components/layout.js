import React, { Component, Fragment } from "react";
import { Layout, Input } from "antd";

import * as API from "../config/api";
import { request } from "../lib/utils";
import MatchList from "./matchList";
import Loader from "./loader";

const { Header, Content, Footer } = Layout;

class MainLayout extends Component {
  state = {
    latestMatchesData: [],
    isLoading: false,
    isSubmitted: false
  };

  handleSearch = async value => {
    this.setState({ isLoading: true, isSubmitted: true });
    const { latestMatchesData } = await request({
      url: API.FETCH_MATCH_HISTORY(value),
      method: "GET"
    });

    this.setState({ latestMatchesData, isLoading: false });
  };

  render() {
    const { latestMatchesData, isLoading, isSubmitted } = this.state;

    return (
      <Layout>
        <Header className="App-header">League Stats</Header>
        <Content style={{ padding: "50px" }}>
          <Input.Search
            placeholder="Summoner Name"
            enterButton="Search"
            size="large"
            onSearch={this.handleSearch}
          />
          <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
            {isSubmitted ? (
              <Fragment>
                {isLoading ? (
                  <Loader />
                ) : (
                  <MatchList list={latestMatchesData} />
                )}
              </Fragment>
            ) : (
              <p>Enter your summoner name to find game data</p>
            )}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>Created by Michael Chen</Footer>
      </Layout>
    );
  }
}

export default MainLayout;
