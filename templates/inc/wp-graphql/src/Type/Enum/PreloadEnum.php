<?php
namespace WPGraphQL\Type;

register_graphql_enum_type( 'PreloadEnum', [
  'description' => __( 'Preload type of media widget', 'wp-graphql' ),
  'values' => array( 'AUTO', 'METADATA', 'NONE' )
] );