import React from 'react';
import { List, Avatar } from "antd";
import moment from 'moment';
import { sum } from 'lodash';

const MatchListItem = ({ item }) => {
  const avatarUrl = `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${item.championId}.png`;
  const duration = moment.utc(item.gameDuration*1000).format('HH:mm:ss');
  
  const spell1ImgUrl = `https://ddragon.leagueoflegends.com/cdn/6.24.1/img/spell/${item.spell1Img}`;
  const spell2ImgUrl = `https://ddragon.leagueoflegends.com/cdn/6.24.1/img/spell/${item.spell2Img}`;

  // calculate KDA
  const { kills, deaths, assists } = item.stats;
  const KDA = ((kills + assists) / deaths).toFixed(2);

  // map item list
  const itemUrlList = [];
  for (let i = 0; i < 7; i ++) {
    const itemNum = item.stats[`item${i}`];
    const itemImgUrl = itemNum !== 0 && `https://ddragon.leagueoflegends.com/cdn/6.24.1/img/item/${itemNum}.png`
    itemUrlList.push(itemImgUrl)
  }
  const itemList = itemUrlList.map(url => <Avatar key={url} shape="square" src={url} />)

  // calculate total creeps
  const totalCreeps = sum(Object.values(item.timeline.creepsPerMinDeltas));
  const creepsPerMin = (totalCreeps / (item.gameDuration / 60)).toFixed(2);

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
            <div>Total Creeps: {totalCreeps}</div>
            <div>Creeps Per Min: {creepsPerMin}</div>
            <Avatar shape="square" src={spell1ImgUrl} />
            <Avatar shape="square" src={spell2ImgUrl} />
          </div>
        }
      />
      <div style={{ paddingRight: 20 }}>{itemList}</div>
      <div>{item.stats.win ? "VICTORY" : "DEFEAT"}</div>
    </List.Item>
  )
};

export default MatchListItem;