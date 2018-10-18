import React from "react";
import { List, Avatar, Skeleton } from 'antd';

const MatchList = props => (
  <List
    className="demo-loadmore-list"
    itemLayout="horizontal"
    dataSource={props.list}
    renderItem={item => (
      <List.Item actions={[<a>edit</a>, <a>more</a>]}>
        <Skeleton avatar title={false} loading={item.loading} active>
          <List.Item.Meta
            avatar={
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            }
            title={<a href="https://ant.design">{item.name.last}</a>}
            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
          />
          <div>content</div>
        </Skeleton>
      </List.Item>
    )}
  />
);

export default MatchList;
