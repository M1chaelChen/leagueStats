import React from "react";
import { List } from "antd";
import MatchListItem from './matchListItem';

const MatchList = ({ list }) => (
  <List
    itemLayout="horizontal"
    dataSource={list}
    renderItem={item => <MatchListItem item={item} />}
  />
);

export default MatchList;
