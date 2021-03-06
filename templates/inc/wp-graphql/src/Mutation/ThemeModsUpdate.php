<?php

namespace WPGraphQL\Mutation;

use GraphQL\Error\UserError;
use WPGraphQL\Data\ExtraSource;
use WPGraphQL\Data\ThemeModsMutation;

/**
 * Class ThemeModsUpdate
 *
 * @package WPGraphQL\Type\ThemeMods\Mutation
 */
class UpdateThemeMods {
	public static function register_mutation() {
		register_graphql_mutation( 'updateThemeMods', [
			'inputFields'         => self::get_input_fields(),
			'outputFields'        => [
				'themeMods' => [
					'type'    => 'ThemeMods',
					'resolve' => function () {
						return ExtraSource::resolve_theme_mods_data();
					},
				],
			],
			'mutateAndGetPayload' => function ( $input ) {
				/**
				 * Check that the user can manage setting options
				 */
				if ( ! current_user_can( 'edit_theme_options' ) ) {
					throw new UserError(
						__( 'Sorry, you are not allowed to edit theme settings as this user.', 'wp-graphql' )
					);
				}

				$prepared_values = ThemeModsMutation::prepare_theme_mods_values( $input, 'update' );

				/**
				 * Update theme mods
				 */
				$success = ThemeModsMutation::update_theme_mods( $prepared_values );

				/**
				 * Throw an exception if update
				 */
				if ( ! $success ) {
					throw new UserError( __( 'The updates to theme settings failed to save', 'wp-graphql' ) );
				}
			}
		] );
	}

	/**
   * Returns the input_fields definition
   * 
	 * @return mixed|array|null $input_fields
	 */
	private static function get_input_fields() {
    return [
      'background'      => [
        'type'        => 'CustomBackgroundInput',
        'description' => __( 'The theme mod "background" object', 'wp-graphql' ),
      ],
      'backgroundColor'      => [
        'type'        => 'String',
        'description' => __( 'The theme mod "background-color" hex color code', 'wp-graphql' ),
      ],
      'customCssPostId'      => [
        'type'        => 'Int',
        'description' => __( 'The theme mod "custom-css-post-id" post id', 'wp-graphql' ),
      ],
      'customLogo'      => [
        'type'        => 'Int',
        'description' => __( 'The theme mod "custom-logo" attachment id', 'wp-graphql' ),
      ],
      'headerImage'      => [
        'type'        => 'CustomHeaderInput',
        'description' => __( 'The theme mod "header-image" object', 'wp-graphql' ),
      ],
      'navMenuLocations'      => [
        'type'        => 'NavMenuLocationsInput',
        'description' => __( 'The theme mod "nav-menu-locations" object', 'wp-graphql' ),
      ],
    ];
  }
}

UpdateThemeMods::register_mutation();