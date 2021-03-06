import _taggedTemplateLiteral from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteral";

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  query ArchiveQuery(\n      $first: Int,\n      $category: String,\n      $tag: String,\n      $year: Int,\n      $month: Int,\n      $day: Int,\n      $author: String,\n      $search: String\n    ) {\n    posts(\n      first: $first,\n      where: {\n        categoryName: $category,\n        tag: $tag,\n        authorName: $author,\n        dateQuery: { year: $year, month: $month, day: $day },\n        search: $search\n      }\n    ) {\n      nodes {\n        id\n        postId\n        excerpt\n        content\n        date\n        modified\n        title\n        permalink\n        featuredImage {\n          id\n          mediaItemId\n          title\n          altText\n          sourceUrl\n        }\n        tags {\n          nodes {\n            id\n            name\n            slug\n          }\n        }\n        categories {\n          nodes {\n            id\n            name\n            slug\n          }\n        }\n        author {\n          id\n          userId\n          nicename\n          avatar {\n            url\n            foundAvatar\n          }\n        }\n      }\n    }\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

/**
 * Archive Queries
 */
import { gql } from 'apollo-boost';
export var ARCHIVE_QUERY = gql(_templateObject());