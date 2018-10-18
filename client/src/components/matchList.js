import React from "react";
import { List, Avatar } from "antd";

const MatchList = ({ list }) => (
  <List
    itemLayout="horizontal"
    dataSource={list}
    renderItem={item => (
      <List.Item>
        <List.Item.Meta
          avatar={
            <Avatar
              src={`http://ddragon.leagueoflegends.com/cdn/6.24.1/img/profileicon/${
                item.championId
              }.png`}
            />
          }
          title={<div>{item.championId}</div>}
          description="Ant Design, a design language for background applications, is refined by Ant UED Team"
        />
        <div>{item.stats.win ? "VICTORY" : "DEFEAT"}</div>
      </List.Item>
    )}
  />
);

export default MatchList;
