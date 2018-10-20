import React from 'react';
import { List, Avatar } from "antd";
import moment from 'moment';

const MatchListItem = ({ item }) => {
  const avatarUrl = `/img/champion/${item.championImg}`;
  const duration = moment.utc(item.gameDuration*1000).format('HH:mm:ss');
  
  const spell1ImgUrl = `/img/spell/${item.spell1Img}`;
  const spell2ImgUrl = `/img/spell/${item.spell2Img}`;

  // calculate KDA
  const { kills, deaths, assists } = item.stats;
  const KDA = ((kills + assists) / deaths).toFixed(2);

  // map item list
  const itemUrlList = [];
  for (let i = 0; i < 7; i ++) {
    const itemNum = item.stats[`item${i}`];
    const itemImgUrl = itemNum !== 0 && `/img/item/${itemNum}.png`
    itemUrlList.push(itemImgUrl)
  }
  const itemList = itemUrlList.map(url => <Avatar key={url} shape="square" src={url} />)

  // calculate creeps per minute
  const creepsPerMin = (item.totalCreeps / (item.gameDuration / 60)).toFixed(2);

  // runes
  const primaryRune = `/img/${item.primaryRune}`;
  const secondaryRune = `/img/${item.secondaryRune}`;

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
            <div>
              <Avatar src={primaryRune} />
              <Avatar src={secondaryRune} />
            </div>
            <Avatar shape="square" src={spell1ImgUrl} />
            <Avatar shape="square" src={spell2ImgUrl} />
            <div>{item.totalCreeps} ({creepsPerMin}) CS</div>
            <div>Length: {duration} KDA: {KDA} </div>
          </div>
        }
      />
      <div style={{ paddingRight: 20 }}>{itemList}</div>
      <div>{item.stats.win ? "VICTORY" : "DEFEAT"}</div>
    </List.Item>
  )
};

export default MatchListItem;