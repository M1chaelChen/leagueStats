import React from 'react';
import { List, Avatar } from "antd";
import moment from 'moment';

const MatchListItem = ({ item }) => {
  const avatarUrl = `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${item.championId}.png`;
  const duration = moment.utc(item.gameDuration*1000).format('HH:mm:ss');
  // calculate KDA
  const { kills, deaths, assists } = item.stats;

  const KDA = ((kills + assists) / deaths).toFixed(2);

  return (
    <List.Item>
      <List.Item.Meta
        avatar={
          <Avatar
            src={avatarUrl}
          />
        }
        title={<div>{item.championName} (lv.{item.stats.champLevel})</div>}
        description={
          <div>
            <div>Length: {duration} KDA: {KDA} </div>
          </div>
        }
      />
      <div>{item.stats.win ? "VICTORY" : "DEFEAT"}</div>
    </List.Item>
  )
};

export default MatchListItem;