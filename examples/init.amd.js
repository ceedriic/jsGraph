
requirejs.config({

	baseUrl: '../',
	paths: {
		'jquery': './lib/components/jquery/dist/jquery.min'
	}
});

require( [ 'jquery', './dist/jsgraph', './examples/series' ] , function( $, Graph, series ) {

	window.contour = series.contour;
	window.series = series.numeric;

	window.Graph = Graph;

	var options = {};

	require( [ './examples/loadexamples'] );
	
} );