import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import "./head.scss";
import { Menu, Affix } from "antd";
import {clusterList} from "@/api";

const { SubMenu } = Menu;

class Header extends Component {
  state = {
    subMenu: [
      {
        clusterName: "集群1",
        link: "/cluster?cluster_name=cluster1",
      },
      {
        clusterName: "集群2",
        link: "/cluster?cluster_name=cluster2",
      },
      {
        clusterName: "集群3",
        link: "/cluster?cluster_name=cluster3",
      },
      {
        clusterName: "集群4",
        link: "/cluster?cluster_name=cluster4",
      },
    ],
    selectedIndex: -1,
  };

  componentDidMount() {
    clusterList().then(res => {
      console.log(res)
    })
  }

  selectNav(index) {
    this.setState({
      selectedIndex: index,
    });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let { subMenu } = prevState,
      {
        location: { search, pathname },
      } = nextProps;
    if (pathname === "/cluster") {
      let selectedIndex = subMenu.findIndex(item => {
        return item.link === `${pathname}${search}`;
      });
      return { selectedIndex };
    }
    return null;
  }

  render() {
    let { subMenu, selectedIndex } = this.state;
    return (
      <Affix offsetTop={0}>
        <Menu mode="horizontal" className="head_nav">
          <Menu.Item key="logo" className="main_title">
            <NavLink to="/home" exact>
              <span>LOGO</span>
              <span style={{ fontSize: "22px" }}>流式数据引擎处理</span>
            </NavLink>
          </Menu.Item>
          <SubMenu
            popupClassName="cluster_drop_menu"
            title={
              <span className="submenu-title-wrapper">
                <span className="icon-cluster data_flow_icon"></span>
                <span>集群</span>
              </span>
            }
          >
            {subMenu.map((item, index) => {
              let { clusterName, link } = item;
              return (
                <Menu.Item
                  key={clusterName}
                  onClick={() => this.selectNav(index)}
                >
                  <NavLink
                    to={link}
                    exact
                    className={selectedIndex === index ? "selected" : ""}
                  >
                    {clusterName}
                  </NavLink>
                </Menu.Item>
              );
            })}
          </SubMenu>
          <Menu.Item key="username" style={{ float: "right" }}>
            <a
              href="https://ant.design"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="icon-user data_flow_icon"></span>
              <span style={{ fontSize: "14px" }}>用户名</span>
            </a>
          </Menu.Item>
          <Menu.Item key="message" style={{ float: "right" }}>
            <a
              href="https://ant.design"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="icon-warning data_flow_icon"></span>
              <span>消息</span>
            </a>
          </Menu.Item>
        </Menu>
      </Affix>
    );
  }
}

export default withRouter(Header);
