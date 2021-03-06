import _objectSpread from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/objectSpread";
import _objectWithoutProperties from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties";
import React, { createFactory } from 'react';
import { get } from 'lodash';
import { setDisplayName, wrapDisplayName } from 'recompose';
import { Switch, Route } from 'react-router-dom';
export var mapLoopProps = function mapLoopProps(_ref) {
  var data = _ref.data,
      rest = _objectWithoutProperties(_ref, ["data"]);

  var pageForPostsSlug = get(data, 'allSettings.pageForPosts');
  var pageOnFront = get(data, 'allSettings.pageOnFront');
  var structure = get(data, 'allSettings.permalinkStructure');
  var limit = get(data, 'allSettings.readingSettingsPostsPerPage');
  return _objectSpread({
    pageForPostsSlug: pageForPostsSlug,
    pageOnFront: pageOnFront,
    structure: structure,
    limit: limit
  }, rest);
};
export var defaultRoutes = function defaultRoutes(_ref2) {
  var limit = _ref2.limit,
      pageOnFront = _ref2.pageOnFront,
      postsPath = _ref2.postsPath,
      pageForPostsSlug = _ref2.pageForPostsSlug;
  return function (_ref3) {
    var Archive = _ref3.Archive,
        Page = _ref3.Page,
        Post = _ref3.Post,
        frontChildren = _ref3.frontChildren,
        children = _ref3.children,
        rest = _objectWithoutProperties(_ref3, ["Archive", "Page", "Post", "frontChildren", "children"]);

    return React.createElement(Switch, rest, frontChildren, React.createElement(Route, {
      exact: true,
      path: "/",
      render: function render() {
        if (pageOnFront) {
          return React.createElement(Page, {
            id: pageOnFront
          });
        }

        return React.createElement(Archive, {
          first: limit,
          noHeader: true,
          showContent: true
        });
      }
    }), React.createElement(Route, {
      exact: true,
      path: "/:year(\\d{4})",
      render: function render(_ref4) {
        var params = _ref4.match.params;
        var year = parseInt(params.year, 10);
        return React.createElement(Archive, {
          first: limit,
          where: {
            year: year
          }
        });
      }
    }), React.createElement(Route, {
      exact: true,
      path: "/:year(\\d{4})/:monthnum(\\d{2})/:day(\\d{2})",
      render: function render(_ref5) {
        var params = _ref5.match.params;
        var day = parseInt(params.day, 10);
        var year = parseInt(params.year, 10);
        var month = parseInt(params.monthnum, 10);
        return React.createElement(Archive, {
          first: limit,
          where: {
            month: month,
            year: year,
            day: day
          }
        });
      }
    }), React.createElement(Route, {
      exact: true,
      path: "/:year(\\d{4})/:monthnum(\\d{2})",
      render: function render(_ref6) {
        var params = _ref6.match.params;
        var year = parseInt(params.year, 10);
        var month = parseInt(params.monthnum, 10);
        return React.createElement(Archive, {
          first: limit,
          where: {
            month: month,
            year: year
          }
        });
      }
    }), React.createElement(Route, {
      path: "/category/:category",
      render: function render(_ref7) {
        var params = _ref7.match.params;
        return React.createElement(Archive, {
          first: limit,
          where: params
        });
      }
    }), React.createElement(Route, {
      path: "/tag/:tag",
      render: function render(_ref8) {
        var params = _ref8.match.params;
        return React.createElement(Archive, {
          first: limit,
          where: params
        });
      }
    }), React.createElement(Route, {
      path: "/author/:author",
      render: function render(_ref9) {
        var params = _ref9.match.params;
        return React.createElement(Archive, {
          first: limit,
          where: params
        });
      }
    }), React.createElement(Route, {
      path: "/search/:search",
      render: function render(_ref10) {
        var params = _ref10.match.params;
        return React.createElement(Archive, {
          first: limit,
          where: params
        });
      }
    }), pageForPostsSlug & React.createElement(Route, {
      exact: true,
      path: "/".concat(pageForPostsSlug),
      render: function render() {
        return React.createElement(Archive, {
          first: limit
        });
      }
    }), React.createElement(Route, {
      exact: true,
      path: postsPath,
      render: function render(_ref11) {
        var params = _ref11.match.params;
        var post_id = params.post_id,
            postname = params.postname;
        if (post_id) return React.createElement(Post, {
          postId: post_id
        });
        if (postname) return React.createElement(Post, {
          slug: postname
        });else throw new Error('Post not found');
      }
    }), children, React.createElement(Route, {
      path: "/(.*)",
      render: function render(_ref12) {
        var params = _ref12.match.params;
        return React.createElement(Page, {
          uri: params[0]
        });
      }
    }));
  };
};
export var routesProcessor = function routesProcessor(routesView) {
  return function (BaseComponent) {
    var BaseFactory = createFactory(BaseComponent);

    var RoutesProcessor = function RoutesProcessor(_ref13) {
      var pageForPostsSlug = _ref13.pageForPostsSlug,
          pageOnFront = _ref13.pageOnFront,
          structure = _ref13.structure,
          limit = _ref13.limit,
          Archive = _ref13.Archive,
          Post = _ref13.Post,
          Page = _ref13.Page,
          rest = _objectWithoutProperties(_ref13, ["pageForPostsSlug", "pageOnFront", "structure", "limit", "Archive", "Post", "Page"]);

      if (!structure) {
        throw new Error('Pretty permalinks must be on');
      } // Format post-type path from permalink structure


      var postsPath = structure.replace(/%([A-z]+)%/g, ':$1').replace(/:(monthnum|day|hour|minute|second)/g, ':$1(\\d{2})').replace(/:(post_id)/g, ':$1(\\d{3})').replace(/:(year)/g, ':$1(\\d{4})');
      var Routes = routesView({
        limit: limit,
        pageOnFront: pageOnFront,
        postsPath: postsPath,
        pageForPostsSlug: pageForPostsSlug
      });
      return BaseFactory(_objectSpread({
        Routes: Routes
      }, rest));
    };

    if (process.env.NODE_ENV !== 'production') {
      return setDisplayName(wrapDisplayName(BaseComponent, 'routesProcessor'))(RoutesProcessor);
    }

    return RoutesProcessor;
  };
};