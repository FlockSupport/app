import { Layout, Menu } from 'antd';
import React from 'react';
import '../App.css';
import {
  TagsOutlined,
  PhoneOutlined,
  MailOutlined,
  MessageOutlined,
  StockOutlined
} from '@ant-design/icons';
import Ticket from './Ticket'


const { Header, Sider, Content } = Layout;
const divStyle = {
  display: 'flex',
  alignItems: 'center',
  padding:'10'
};


class SideBar extends React.Component {
  state = {
    collapsed: true,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<TagsOutlined />}>
              nav 1
            </Menu.Item>
            <Menu.Item key="2" icon={<MailOutlined />}>
              nav 2
            </Menu.Item>
            <Menu.Item key="3" icon={<PhoneOutlined />}>
              nav 3
            </Menu.Item>
            <Menu.Item key="4" icon={<MessageOutlined />}>
              nav 4
            </Menu.Item>
            <Menu.Item key="5" icon={<StockOutlined />}>
              nav 5
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            <h1>Flock</h1>
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,                                                                                                                                                                           
              minHeight: 850,
            }}
          >
            <div style={divStyle}>
            <Ticket />
            &nbsp;
            &nbsp;
            <Ticket />
            </div>
            <br />
            <div style={divStyle}>
            <Ticket />
            &nbsp;
            &nbsp;
            <Ticket />
            </div>
            
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default SideBar