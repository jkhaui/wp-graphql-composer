import { get, omit } from 'lodash';

// Utils
import { baseComposer, queryComposer } from '../composers'
import { Error, Loading } from '../utils';

// Queries
import { MENU_WHERE_QUERY, MENU_QUERY, MENU_ITEM_QUERY } from './query';

// State and Context
import { menuInitialState, MenuContext } from './context';
import { menuStateManager } from './state-manager';

// Default View Layer Components
import menu from './menu';
import menuItem, { Link } from './menu-item';
import subMenu from './sub-menu';

/**
 * SubMenu Composer
 */
subMenu.compose = baseComposer({
  view: subMenu,
  whileLoading: { view: Loading },
  forError: { view: Error },
  mapper: props => props,
});

const SubMenu = subMenu.compose({});

/**
 * MenuItem Composer
 */
menuItem.compose = queryComposer({
  view: menuItem,
  whileLoading: { view: Loading },
  forError: { view: Error },
  queries: [{
    query: MENU_ITEM_QUERY,
    config: {
      options: ({ id }) => ({ id }),
      skip: ({ noSubMenu }) => !!noSubMenu,
    }
  }],
  sharedMapper: ({ data, ...rest, }) => {
    const items = get(data, 'menuItem.childItems.nodes');
    return { items, ...omit(rest, 'id') };
  },
});

const MenuItem = menuItem.compose({});

/**
 * Menu Composer
 */
menu.compose = queryComposer({
  view: menu,
  MenuItem,
  SubMenu,
  whileLoading: { view: Loading },
  forError: { view: Error },
  queries: [{
    cond: ({ menuId, location, slug }) => !!menuId || !!location || !!slug,
    query: MENU_WHERE_QUERY,
    config: {
      options: ({ menuId, location, slug }) => ({ menuId, location, slug }),
      skip: ({ optional, location, menuId, slug }) => !location && !menuId && !slug && optional ,
    },
    mapper: ({ data, ...rest }) => ({ 
      homeUrl: get(data, 'generalSettings.url'),
      menu: get(data, 'menus.nodes[0]'),
      ...rest
    }),
  }, {
    cond: ({ id }) => !!id,
    query: MENU_QUERY,
    config: {
      options: ({ id }) => ({ id }),
      skip: ({ optional, id }) => !id && optional 
    },
    mapper: ({ data, ...rest }) => ({
      homeUrl: get(data, 'generalSettings.url'),
      menu: get(data, 'menu'),
      ...rest
    }),
  }],
  extraHocs: [menuStateManager],
});

const Menu = menu.compose({});

// Export all imports
export {
  Menu, menu, MenuItem, menuItem,
  SubMenu, subMenu, Link,
  MENU_WHERE_QUERY, MENU_QUERY, MENU_ITEM_QUERY,
  menuInitialState, MenuContext
};

