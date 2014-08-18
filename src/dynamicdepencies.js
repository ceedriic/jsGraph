define([ 'require' ], function( require ) {
	
	return function() {

		this.caching = {};
		this.folderMap = {};

		this.load = function( type, file, callback ) {

			var self = this;

			if( ! this.caching[ type ] ) {
				this.caching[ type ] = {};
			}

			if( Array.isArray( file ) ) {

				file.map( function( file ) {

					self.load( type, file, callback );

				} );
				return;
			}
			
			if( this.folderMap[ type ] ) {

				file = this.folderMap[ type ] + file;
			}

			if( this.caching[ type ][ file ] ) {

				callback( this.caching[ type ][ file ], file );

			} else if( typeof build !== "undefined" && build[ file ]) {

				callback( this.caching[ type ][ file ] = build[ file ], file );

			} else if( typeof require !== "undefined" ) {
				//console.log( "Trying to load file " + file + " of type " + type, this.folderMap );
				require( [ file ], function( instance ) {

					callback( self.caching[ type ][ file ] = instance, file );
				} );
			} else {
				console.warn("Could not load file " + file + " of type " + type );
			}
		}

		this.configure = function( map ) {
			this.folderMap = map || {};
		}

		//return loader;

	};
	
} );