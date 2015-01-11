
define( function() {

	return [ function( domGraph ) {

			var graphinstance = new Graph( domGraph, {

				dblclick: {
					type: 'plugin',
					plugin: 'graph.plugin.zoom',
					options: {
						mode: 'total'
					}
				},

				plugins: {
					'graph.plugin.zoom': { zoomMode: 'x' }
				},

				pluginAction: {
					'graph.plugin.zoom': { shift: false }
				},


				wheel: {
					type: 'plugin',
					plugin: 'graph.plugin.zoom',
					options: {
						direction: 'y'
					}
				}




			} );

// BEGIN IGNORE ON BUILD
var serieData = [ 

7119.722, 0,
7121.722, 17.7013422,
7122.719, 6.4668278,
7122.725, 57.4358722,
7122.726, 0.6810324,
7122.728, 1.022016,
7123.716, 1.1694498,
7123.722, 20.9830357,
7123.723, 0.2488014,
7123.725, 0.3733729,
7123.726, 3.6739907,
7123.729, 92.8710128,
7123.73, 2.2227296,
7123.732, 3.3554748,
7123.734, 0.0294451,
7124.713, 0.1395634,
7124.719, 3.7945355,
7124.72, 0.0449928,
7124.722, 0.0675201,
7124.723, 1.3422183,
7124.726, 33.9285486,
7124.727, 0.8120294,
7124.729, 1.2258549,
7124.73, 12.0610173,
7124.732, 100,
7124.733, 3.573072,
7124.734, 0.0420877,
7124.735, 5.3620602,
7124.736, 0.127584,
7124.738, 0.0955411,
7124.739, 0.0011329,
7125.71, 0.0123643,
7125.716, 0.4528439,
7125.717, 0.0053695,
7125.719, 0.0080579,
7125.72, 0.2427244,
7125.723, 6.1355794,
7125.724, 0.145989,
7125.726, 0.2190837,
7125.727, 4.4088468,
7125.729, 36.4535003,
7125.73, 1.7603462,
7125.731, 0.0153759,
7125.732, 1.9589204,
7125.733, 19.3223936,
7125.734, 0.454104,
7125.735, 80.1653369,
7125.736, 4.5270563,
7125.737, 0.0761341,
7125.738, 5.7607956,
7125.739, 0.2124086,
7125.74, 0.00243,
7125.741, 0.1544853,
7125.742, 0.0036758,
7125.744, 0.0018311,
7126.713, 0.0401186,
7126.717, 0.028967,
7126.72, 0.7322266,
7126.721, 0.0174225,
7126.723, 0.0261457,
7126.724, 0.7968184,
7126.726, 6.5918355,
7126.727, 0.3879837,
7126.728, 0.0027805,
7126.729, 0.3542477,
7126.73, 7.050447,
7126.731, 0.1658977,
7126.732, 29.279383,
7126.733, 1.6538686,
7126.734, 1.2526997,
7126.735, 2.1188265,
7126.736, 20.786775,
7126.737, 0.7560597,
7126.738, 0.0650006,
7126.739, 52.4193764,
7126.74, 3.1821287,
7126.742, 4.6461395,
7126.743, 0.2255671,
7126.745, 0.1719168,
7126.747, 0.0029608,
7127.71, 0.002814,
7127.714, 0.0025663,
7127.717, 0.0648698,
7127.718, 0.0015435,
7127.72, 0.0023163,
7127.721, 0.0939897,
7127.722, 0.0011034,
7127.723, 0.7866767,
7127.724, 0.0298438,
7127.725, 0.0249399,
7127.726, 0.0422763,
7127.727, 1.2744722,
7127.728, 0.0300007,
7127.729, 5.293691,
7127.73, 0.2990827,
7127.731, 0.4519833,
7127.732, 0.3857913,
7127.733, 7.5793082,
7127.734, 0.2762111,
7127.735, 0.0389345,
7127.736, 19.1498697,
7127.737, 3.1431071,
7127.738, 0.0461924,
7127.739, 1.6973732,
7127.74, 17.5728656,
7127.741, 0.0138452,
7127.742, 27.3454968,
7127.743, 3.211959,
7127.744, 0.0587158,
7127.745, 2.9953307,
7127.746, 0.1779903,
7127.747, 0.0042214,
7127.748, 0.1332877,
7127.749, 0.0063856,
7127.751, 0.003181,
7128.714, 0.0045501,
7128.718, 0.0083268,
7128.72, 0.0696936,
7128.721, 0.0024958,
7128.722, 0.0029763,
7128.723, 0.0037454,
7128.724, 0.1519768,
7128.725, 0.0035803,
7128.726, 0.6317547,
7128.727, 0.0356928,
7128.728, 0.0809228,
7128.729, 0.0454201,
7128.73, 1.3697907,
7128.731, 0.0499495,
7128.732, 0.0105705,
7128.733, 3.463029,
7128.734, 0.928964,
7128.735, 0.0217058,
7128.736, 0.30695,
7128.737, 6.1162325,
7128.738, 0.3763195,
7128.739, 9.978145,
7128.74, 1.1734243,
7128.741, 2.2254809,
7128.742, 1.0938884,
7128.743, 10.8279773,
7128.744, 0.6377218,
7128.745, 12.4570196,
7128.746, 2.0142414,
7128.747, 0.0831417,
7128.748, 1.576373,
7128.749, 0.1484141,
7128.75, 0.0046115,
7128.751, 0.085343,
7128.752, 0.005128,
7128.754, 0.0025545,
7129.717, 0.0048885,
7129.721, 0.013464,
7129.724, 0.0586501,
7129.725, 0.0096574,
7129.726, 0.0040239,
7129.727, 0.1632782,
7129.728, 0.0057892,
7129.729, 0.0016913,
7129.73, 0.4132816,
7129.731, 0.1551541,
7129.732, 0.0030517,
7129.733, 0.0364754,
7129.734, 1.1051483,
7129.735, 0.0824631,
7129.736, 1.803756,
7129.737, 0.2122,
7129.738, 0.808537,
7129.739, 0.1969874,
7129.74, 3.9459045,
7129.741, 0.3657537,
7129.742, 4.5450377,
7129.743, 0.7342658,
7129.744, 1.7439869,
7129.745, 0.6557166,
7129.746, 5.7182552,
7129.747, 0.5297265,
7129.748, 0.0474361,
7129.749, 5.5260563,
7129.75, 0.5166908,
7129.751, 0.0199921,
7129.752, 0.7432207,
7129.753, 0.0640867,
7129.755, 0.0486665,
7129.758, 0.0016357,
7130.721, 0.0039258,
7130.724, 0.0144652,
7130.727, 0.0358363,
7130.728, 0.0177689,
7130.73, 0.0032314,
7130.731, 0.1311234,
7130.732, 0.0117074,
7130.733, 0.215106,
7130.734, 0.0249899,
7130.735, 0.1455129,
7130.736, 0.0233549,
7130.737, 0.7124643,
7130.738, 0.0909218,
7130.739, 0.8209645,
7130.74, 0.1327833,
7130.741, 0.6315266,
7130.742, 0.1375653,
7130.743, 2.0785367,
7130.744, 0.1930724,
7130.745, 0.1558782,
7130.746, 2.0231625,
7130.747, 1.2829028,
7130.748, 0.0795008,
7130.749, 0.2730181,
7130.75, 2.6931165,
7130.751, 0.2279861,
7130.752, 1.7393274,
7130.753, 0.5439814,
7130.754, 0.0090816,
7130.755, 0.2834504,
7130.756, 0.0462971,
7130.757, 0.0011543,
7130.758, 0.0206158,
7130.759, 0.001746,
7131.721, 0.0010146,
7131.724, 0.0025137,
7131.725, 0.0013834,
7131.728, 0.0116166,
7131.73, 0.0190568,
7131.731, 0.0013787,
7131.732, 0.0167768,
7131.733, 0.0020691,
7131.734, 0.0839572,
7131.735, 0.0138683,
7131.737, 0.1135607,
7131.738, 0.112894,
7131.739, 0.0192488,
7131.74, 0.3741058,
7131.741, 0.0349149,
7131.742, 0.0527173,
7131.743, 0.3667902,
7131.744, 0.4336399,
7131.745, 0.0276965,
7131.746, 0.0558636,
7131.747, 0.979791,
7131.748, 0.1991732,
7131.749, 0.637756,
7131.75, 0.1982944,
7131.751, 0.6347456,
7131.752, 0.1047555,
7131.753, 1.0986615,
7131.754, 0.1017067,
7131.755, 0.5538121,
7131.756, 0.2176394,
7131.757, 0.0160515,
7131.758, 0.0994657,
7131.759, 0.0203248,
7131.761, 0.0081664,
7132.727, 0.0013367,
7132.729, 0.0014863,
7132.731, 0.007438,
7132.732, 0.001059,
7132.734, 0.0086567,
7132.735, 0.0134729,
7132.736, 0.0011003,
7132.737, 0.0446462,
7132.738, 0.0031981,
7132.739, 0.0095333,
7132.74, 0.0435545,
7132.741, 0.0760444,
7132.742, 0.0042574,
7132.743, 0.0081121,
7132.744, 0.1764596,
7132.745, 0.0565862,
7132.746, 0.1157823,
7132.747, 0.0340781,
7132.748, 0.2322267,
7132.749, 0.0259914,
7132.75, 0.3752458,
7132.751, 0.134434,
7132.752, 0.0071738,
7132.753, 0.2775968,
7132.754, 0.2768593,
7132.755, 0.0582797,
7132.756, 0.364989,
7132.757, 0.072408,
7132.758, 0.0072134,
7132.759, 0.2134389,
7132.76, 0.0283383,
7132.761, 0.0012624,
7132.762, 0.0355845,
7132.763, 0.0038268,
7132.765, 0.0028657,
7133.732, 0.0011936,
7133.734, 0.0039553,
7133.736, 0.0011377,
7133.737, 0.0034292,
7133.738, 0.0086266,
7133.741, 0.020281,
7133.742, 0.0093566,
7133.743, 0.0135827,
7133.744, 0.0040669,
7133.745, 0.0411652,
7133.746, 0.004889,
7133.747, 0.0673183,
7133.748, 0.0377541,
7133.749, 0.0015804,
7133.75, 0.0500123,
7133.751, 0.0990026,
7133.752, 0.0204217,
7133.753, 0.1306287,
7133.754, 0.0264528,
7133.755, 0.039457,
7133.756, 0.0807454,
7133.757, 0.1143858,
7133.758, 0.0142514,
7133.759, 0.0130001,
7133.76, 0.1291968,
7133.761, 0.0148874,
7133.762, 0.0413187,
7133.763, 0.0265928,
7133.764, 0.002241,
7133.765, 0.0089265,
7133.766, 0.0028994,
7134.738, 0.0017967,
7134.74, 0.0012033,
7134.742, 0.0045874,
7134.744, 0.0080338,
7134.746, 0.004902,
7134.747, 0.005446,
7134.748, 0.0174614,
7134.749, 0.0035811,
7134.75, 0.0236227,
7134.751, 0.0047837,
7134.752, 0.0144148,
7134.753, 0.0151129,
7134.754, 0.0396274,
7134.755, 0.0052064,
7134.756, 0.0058039,
7134.757, 0.0466887,
7134.758, 0.0228997,
7134.759, 0.0161854,
7134.76, 0.0097152,
7134.761, 0.042966,
7134.762, 0.0032611,
7134.763, 0.0320895,
7134.764, 0.0103318,
7134.766, 0.0176964,
7134.768, 0.0023252,
7135.745, 0.0020839,
7135.747, 0.0028192,
7135.749, 0.0026067,
7135.75, 0.001219,
7135.751, 0.0069169,
7135.753, 0.0013648,
7135.754, 0.0084431,
7135.755, 0.0065481,
7135.756, 0.0026606,
7135.757, 0.0013639,
7135.758, 0.0134221,
7135.759, 0.003429,
7135.76, 0.0117232,
7135.761, 0.0037745,
7135.762, 0.0071001,
7135.763, 0.005899,
7135.764, 0.0125982,
7135.765, 0.0013855,
7135.766, 0.0083586,
7135.767, 0.0033436,
7135.769, 0.0039922,
7136.752, 0.0011841,
7136.755, 0.0024272,
7136.757, 0.00212,
7136.759, 0.0025939,
7136.761, 0.0042244,
7136.763, 0.0030536,
7136.765, 0.0024915,
7136.767, 0.0032972,
7136.77, 0.0020028,
7137.764, 0.0012046,
7139.764, 0

];

// END IGNORE ON BUILD

		graphinstance.newSerie("msdata", 
			{ 
				autoPeakPicking: true, 
				autoPeakPickingNb: 10,
				autoPeakPickingFormat: function( val, index ) {  this.set( 'labelColor', ( index == 1 ? 'red' : 'blue') ); return val.toPrecision( 3 ); },
				lineToZero: true 

			}, 'line', function( serie ) {

				serie
					.autoAxis()
					.setData( serieData )
					.XIsMonotoneous();

				graphinstance.redraw();
				graphinstance.drawSeries();
			});
			
		}, 

		"Peak picking (discrete)", 
		[ 
		'Use the <code>peakPicking</code> serie parameter (for serie line) to enable a basic peak picking algorithm. For a discrete serie (with the parameter <code>lineToZero: true</code>), the library will treat every data point as potential peak.',
		
		'The option <code>autoPeakPickingNb</code> (default: 4) is the maximum number of peaks to be selected. The library will select the highest from the whole set.',
		'Use <code>autoPeakPickingMinDistance</code> (default: 10) to set the minimal distance (in px) between two neighbouring peaks.'
		] 
	];


} );
