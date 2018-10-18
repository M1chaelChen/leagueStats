import React, { Component } from "react";
import { Layout, Input } from "antd";

import * as API from '../../config/api';
import { request } from '../../lib/utils';

const { Header, Content, Footer } = Layout;

class MainLayout extends Component {
  state = {
    latestMatchesData: []
  }

  handleSearch = async (value) => {
    const { latestMatchesData } = await request({
      url: API.FETCH_MATCH_HISTORY(value),
      method: 'GET'
    });

    this.setState({ latestMatchesData });
    console.log(latestMatchesData);
  }

  render() {
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
            Content
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>Created by Michael Chen</Footer>
      </Layout>
    );
  }
}

export default MainLayout;
