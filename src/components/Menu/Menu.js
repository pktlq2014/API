import React, { Component } from 'react';
// custom: dùng link, không custom thì dùng navlink
import {Route, Link} from 'react-router-dom';
const menus = [
  {
    name : 'Trang Chủ',
    to : '/',
    exact: true
  },
  {
    name: 'Quản Lý Sản Phẩm',
    to: '/product-list',
    exact: false
  }
];
const MenuLink = ({label, to, activeOnlyWhenExact}) =>{
  return (
    <Route
      path={to}
      exact={activeOnlyWhenExact}
      children={({match}) => {
        var active = match ? 'active' : '';
        return (
          <li className={active}>
            <Link to={to}>
              {label}
            </Link>
          </li>
        );
      }}
    />
  );
}
class Menu extends Component {
  showMenus = (menus) =>{
    var result = null;
    if(menus.length > 0){
      result = menus.map((menu, index) =>{
        return (
          <MenuLink
            key={index}
            label={menu.name}
            to={menu.to}
            activeOnlyWhenExact={menu.exact}
          />
        );
      });
    }
    return result;
  }
  render() {
    return (
      <div>
        <div className="navbar navbar-default">
          <a className="navbar-brand">Call API</a>
          <ul className="nav navbar-nav">
            {/* <li className="active">
              <a>Trang Chủ</a>
            </li>
            <li>
              <a>Quản Lý Sản Phẩm</a>
            </li> */}
            {this.showMenus(menus)}
          </ul>
        </div>
      </div>
    );
  }
}

export default Menu;
