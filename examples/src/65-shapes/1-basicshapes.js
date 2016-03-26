define( function() {

	return [ 

    function( domGraph ) {

        var graphinstance = new Graph( domGraph );

        graphinstance.getXAxis().forceMin( 0 );
        graphinstance.getXAxis().forceMax( 100 );

        graphinstance.getYAxis().forceMin( 0 );
        graphinstance.getYAxis().forceMax( 100 );


        graphinstance.newShape({ 
           type: 'arrow', 
           position: [ { x: "60px", y: "80px" }, { dx: "-20px", dy: "-20px" } ],
           strokeColor: 'black',
           strokeWidth: 0,
           locked: false,
           selectable: true

         }).draw();


        graphinstance.newShape({ 
            type: 'rect', 
            position: [ { x: 60, y: 80 },{ x: 20, y: 20 } ],
             strokeColor: 'red',
             strokeWidth: 1,
            fillColor: 'transparent'
        }).draw();

        
        graphinstance.draw();
        



}, "Shapes", 

[
]
]


});


