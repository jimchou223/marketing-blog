import React, { Component } from "react";
import Link from "next/link";
import styles from "../styles/Navs.module.css";
class DropdownMenu extends Component {
  getMenuItemTitle = (menuItem, index, depthLevel) => {
    return menuItem.title;
  };

  getMenuItemHref = (menuItem, index, depthLevel) => {
    return menuItem.href;
  };

  getMenuItem = (menuItem, depthLevel, index) => {
    let title = this.getMenuItemTitle(menuItem, index, depthLevel);
    let href = this.getMenuItemHref(menuItem, index, depthLevel);

    if (menuItem.submenu && menuItem.submenu.length > 0) {
      return (
        <li key={index}>
          <a href={href}>
          {title} {menuItem.submenu && !menuItem.hasParent ? <i className="fas fa-chevron-down"></i> : <i className="fas fa-chevron-right"></i>}
          </a>
          <DropdownMenu config={menuItem.submenu} submenu={true} />
        </li>
      );
    } else {
      return (
        <Link key={title} href={href}>
          <a>
            <li>{title}</li>
          </a>
        </Link>
      );
    }
  };

  render = () => {
    let { config } = this.props;

    let options = [];
    config.map((item, index) => {
      options.push(this.getMenuItem(item, 0, index));
      return true
    });

    if (this.props.submenu && this.props.submenu === true) return <ul>{options}</ul>;

    return (
      <div className={styles.navWrapper}>
        <ul className={styles.dropdownMenu}>{options}</ul>
      </div>
    );
  };
}

export default DropdownMenu;
