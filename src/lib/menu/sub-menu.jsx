import React from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';
import classNames from 'classnames';
import { Icon } from '../utils';

import baseStyles from './menu.module.scss';
import styles from './sub-menu.module.scss';

class subMenu extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { isCollapsed: true };
  }

  toggle() {
    this.setState({ isCollapsed: !this.state.isCollapsed })
  }

  render() {
    const className = classNames(
      baseStyles.menu,
      styles.menu,
      { [styles.on]: this.state.isCollapsed }
    );

    const dropdownClassName = classNames(
      styles.dropdown,
      { [styles.on]: this.state.isCollapsed }
    );
    const { isCollapsed } = this.state;
    const { MenuItem, SubMenu, items, ...rest } = this.props;

    return (
      <React.Fragment>
        <button
          className={dropdownClassName}
          aria-expanded={isCollapsed}
          onClick={this.toggle}
        >
          <Icon className={styles.icon} name="arrow_drop_down" dark />
        </button>
        <ul className={className} {...rest}>
          {map(items, ({ id, menuItemId, cssClasses, ...r }) => {
            const itemClassName = classNames(
              baseStyles.item,
              styles.item,
              ...cssClasses,
              `menu-item-${menuItemId}`,
            );

            return (
              <li
                id={`menu-item-${menuItemId}`}
                className={itemClassName}
                key={id}
              >
                <MenuItem id={id} {...{ ...r, MenuItem, SubMenu }} />
              </li>
            );
          })}
        </ul>
      </React.Fragment>
    )
  }
}

subMenu.propTypes = {
  SubMenu: PropTypes.func.isRequired,
  MenuItem: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({})),
};

subMenu.defaultProps = {
  items: [],
};

export default subMenu;