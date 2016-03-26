define( [ 'jquery', '../graph.lru', './graph.plugin', ], function( $, LRU, Plugin ) {

  /**
   * @class PluginTimeSerieManager
   * @implements Plugin
   */
  var PluginTimeSerieManager = function() {

    var self = this;

    this.series = [];
    this.plugins = [];
    this.currentSlots = {};

    this.requestLevels = {};
    this.update = function( noRecalculate, force ) {

      self.series.forEach( function( serie ) {

        self.updateSerie( serie, noRecalculate );

      } );

      if ( !noRecalculate ) {
        self.recalculateSeries( force );
      }
    }

  };

  PluginTimeSerieManager.prototype = new Plugin();

  PluginTimeSerieManager.prototype.defaults = {

    LRUName: "PluginTimeSerieManager",
    intervals: [ 1000, 15000, 60000, 900000, 3600000, 8640000 ],
    maxParallelRequests: 3,
    optimalPxPerPoint: 2,
    nbPoints: 1000,
    url: ""
  }

  /**
   * Init method
   * @private
   * @memberof PluginTimeSerieManager
   */
  PluginTimeSerieManager.prototype.init = function( graph, options ) {
    this.graph = graph;
    LRU.create( this.options.LRUName, 200 );
    this.requestsRunning = 0;

  };

  PluginTimeSerieManager.prototype.setURL = function( url ) {
    this.options.url = url;
    return this;
  }

  PluginTimeSerieManager.prototype.setAvailableIntervals = function() {
    this.options.intervals = arguments;
  }

  PluginTimeSerieManager.prototype.newSerie = function( serieName, serieOptions, serieType, dbElements, noZoneSerie ) {
    var s = this.graph.newSerie( serieName, serieOptions, serieType );

    this.currentSlots[ serieName ] = { 
      min: 0,
      max: 0,
      interval: 0
    };

    s.setInfo( "timeSerieManagerDBElements", dbElements );

    if ( !noZoneSerie ) {
      s._zoneSerie = this.graph.newSerie( serieName + "_zone", {}, "zone" );
    }

    this.series.push( s );
    return s;
  }

  PluginTimeSerieManager.prototype.registerPlugin = function( plugin, event ) {

    var index;
    if ( ( index = this.plugins.indexOf( plugin ) ) > -1 ) {

      for ( var i = 1; i < arguments.length; i++ ) {
        plugin.removeListener( arguments[  i ], this.update );
      }
    }

    for ( var i = 1; i < arguments.length; i++ ) {
      plugin.on( arguments[  i ], this.update );
    }
  }

  PluginTimeSerieManager.prototype.updateSerie = function( serie, noRecalculate ) {

    var self = this;
    var from = serie.getXAxis().getCurrentMin();
    var to = serie.getXAxis().getCurrentMax();
    var priority = 1;

    var optimalInterval = this.getOptimalInterval( to - from );
    var optimalIntervalIndex = this.options.intervals.indexOf( optimalInterval );
    var interval;

    for ( var i = optimalIntervalIndex - 1; i <= optimalIntervalIndex + 1; i++ ) {

      interval = this.options.intervals[ i ];
      var startSlotId = self.computeSlotID( from, interval );
      var endSlotId = self.computeSlotID( to, interval );

      var intervalMultipliers = [
        [ 2, 5, 6 ],
        [ 1, 2, 4 ],
        [ 0, 1, 3 ]
      ];

      intervalMultipliers.forEach( function( multiplier ) {

        var firstSlotId = startSlotId - multiplier[ 0 ] * ( endSlotId - startSlotId );
        var lastSlotId = endSlotId + multiplier[ 0 ] * ( endSlotId - startSlotId );

        var slotId = firstSlotId;

        while ( slotId <= lastSlotId ) {

          if ( self.computeTimeMin( slotId, interval ) > Date.now() ) {
            break;
          }

          self.register( serie, slotId, interval, interval == optimalInterval ? multiplier[ 1 ] : multiplier[ 2 ], true, noRecalculate );
          slotId++;
        }

      } );

    }

    this.processRequests();
  }

  PluginTimeSerieManager.prototype.register = function( serie, slotId, interval, priority, noProcess, noRecalculate ) {

    var id = this.computeUniqueID( serie, slotId, interval );

    var data = LRU.get( this.options.LRUName, id );

    if ( !data || ( this.computeTimeMax( slotId, interval ) > Date.now() && data.timeout < ( Date.now() - ( noRecalculate ? 5000 : 100000 ) ) ) && priority == 1 ) {

      this.request( serie, slotId, interval, priority, id, noProcess );
    }
  }

  PluginTimeSerieManager.prototype.request = function( serie, slotId, interval, priority, slotName, noProcess ) {

    for ( var i in this.requestLevels ) {

      if ( i == priority ) {
        continue;
      }

      if ( this.requestLevels[ i ][ slotName ] ) {

        if ( this.requestLevels[ i ][ slotName ][ 0 ] !== 1 ) { // If the request is not pending

          delete this.requestLevels[ i ][ slotName ];

        } else {
          this.requestLevels[ i ][ slotName ][ 5 ] = priority;
        }

      }
    }

    if ( this.requestLevels[ priority ] && this.requestLevels[ priority ][ slotName ] ) {
      return;
    }

    this.requestLevels[ priority ] = this.requestLevels[ priority ] || {};
    this.requestLevels[ priority ][ slotName ] = [ 0, slotName, serie.getName(), slotId, interval, priority, serie.getInfo( 'timeSerieManagerDBElements' ) ];

    if ( !noProcess ) {
      this.processRequests();
    }
  }

  PluginTimeSerieManager.prototype.processRequests = function() {

    if ( this.requestsRunning >= this.options.maxParallelRequests ) {
      return;
    }

    var self = this,
      currentLevelChecking = 1,
      requestToMake;

    while ( true ) {

      for ( var i in this.requestLevels[ currentLevelChecking ] ) {

        if ( this.requestLevels[ currentLevelChecking ][ i ][ 0 ] == 1 ) { // Running request
          continue;
        }

        requestToMake = this.requestLevels[ currentLevelChecking ][ i ];
        break;
      }

      if ( requestToMake ) {
        break;
      }

      currentLevelChecking++;

      if ( currentLevelChecking > 10 ) {
        return;
      }

    }

    this.requestsRunning++;

    if ( !requestToMake ) {
      return;
    }

    requestToMake[ 0 ] = 1;

    $.ajax( {

      url: this.getURL( requestToMake ),
      method: 'get',
      dataType: 'json'

    } ).done( function( data ) {

      if ( data.status == 1 ) { // Success

        self.requestsRunning--;

        delete self.requestLevels[ currentLevelChecking ][ i ];

        LRU.store( self.options.LRUName, requestToMake[ 1 ], data.data ); // Element 1 is the unique ID
        self.processRequests();

        if ( requestToMake[ 5 ] == 1 && Object.keys( self.requestLevels[ 1 ] ).length == 0 ) {

          self.recalculateSeries( true );
        }
      }

    } );
  }

  PluginTimeSerieManager.prototype.computeTimeMax = function( slotId, interval ) {
    return ( slotId + 1 ) * ( interval * this.options.nbPoints );
  }

  PluginTimeSerieManager.prototype.computeTimeMin = function( slotId, interval ) {
    return ( slotId ) * ( interval * this.options.nbPoints );
  }

  PluginTimeSerieManager.prototype.getURL = function( requestElements ) {

    var url = this.options.url
      .replace( "<measurementid>", requestElements[  2 ] )
      .replace( '<from>', this.computeTimeMin( requestElements[  3 ], requestElements[ 4 ] ) )
      .replace( '<to>', this.computeTimeMax( requestElements[  3 ], requestElements[ 4 ] ) )
      .replace( '<interval>', requestElements[  4 ] );

    var dbElements = requestElements[ 6 ] || {};

    for ( var i in dbElements ) {
      url = url.replace( "<" + i + ">", dbElements[ i ] );
    }

    return url;
  }

  PluginTimeSerieManager.prototype.getOptimalInterval = function( totalspan ) {

    var optimalInterval = ( this.options.optimalPxPerPoint ||  1 ) * totalspan / this.graph.getDrawingWidth(),
      diff = Infinity,
      optimalIntervalAmongAvailable;

    this.options.intervals.forEach( function( interval ) {

      var newDiff = Math.min( diff, Math.abs( interval - optimalInterval ) );
      if ( diff !== newDiff ) {

        optimalIntervalAmongAvailable = interval;
        diff = newDiff;
      }
    } );

    return optimalIntervalAmongAvailable ||  1000;
  }

  PluginTimeSerieManager.prototype.computeUniqueID = function( serie, slotId, interval ) {
    var extra = "";
    var info = serie.getInfo( 'timeSerieManagerDBElements' );
    for ( var i in info ) {
      extra += ";" + i + ":" + info[ i ];
    }

    return serie.getName() + ";" + slotId + ";" + interval + extra;
  }

  PluginTimeSerieManager.prototype.computeSlotID = function( time, interval ) {
    return Math.floor( time / ( interval * this.options.nbPoints ) );
  }

  PluginTimeSerieManager.prototype.computeSlotTime = function( slotId, interval ) {
    return slotId * ( interval * this.options.nbPoints );
  }

  PluginTimeSerieManager.prototype.getZoneSerie = function( serie ) {
    return serie._zoneSerie;
  };

  PluginTimeSerieManager.prototype.updateZoneSerie = function( serieName ) {

    var serie = this.graph.getSerie( serieName );

    if ( !serie ) {
      return;
    }

    if ( !serie._zoneSerie ) {
      return;
    }

    serie._zoneSerie.setXAxis( serie.getXAxis() );
    serie._zoneSerie.setYAxis( serie.getYAxis() );
    serie._zoneSerie.setFillColor( serie.getLineColor() );
    serie._zoneSerie.setLineColor( serie.getLineColor() );
    serie._zoneSerie.setFillOpacity( 0.2 );
    serie._zoneSerie.setLineOpacity( 0.3 );
  };

  PluginTimeSerieManager.prototype.recalculateSeries = function( force ) {

    var self = this;

    this.changed = false;

    this.series.map( function( serie ) {
      self.recalculateSerie( serie, force );
    } );

    /*if ( this.changed ) {
      self.graph._applyToAxes( "scaleToFitAxis", [ this.graph.getXAxis(), false, undefined, undefined, false, true ], false, true );
    }
*/
    this.changed = false;
    //self.graph.autoscaleAxes();

    self.graph.draw();
  }

  PluginTimeSerieManager.prototype.recalculateSerie = function( serie, force ) {

    var from = serie.getXAxis().getCurrentMin(),
      to = serie.getXAxis().getCurrentMax(),
      interval = this.getOptimalInterval( to - from );

    var startSlotId = this.computeSlotID( from, interval );
    var endSlotId = this.computeSlotID( to, interval );

    var data = [];
    var dataMinMax = [];
    var lruData;

    if ( !force && interval == this.currentSlots[ serie.getName() ].interval && this.currentSlots[ serie.getName() ].min <= startSlotId && this.currentSlots[ serie.getName() ].max >= endSlotId ) {
      return;
    }

    startSlotId -= 2;
    endSlotId += 2;

    this.currentSlots[ serie.getName() ].min = startSlotId;
    this.currentSlots[ serie.getName() ].max = endSlotId;
    this.currentSlots[ serie.getName() ].interval = interval;

    var slotId = startSlotId;

    while ( slotId <= endSlotId ) {

      if ( lruData = LRU.get( this.options.LRUName, this.computeUniqueID( serie, slotId, interval ) ) ) {

        data = data.concat( lruData.data.mean );
        dataMinMax = dataMinMax.concat( lruData.data.minmax );

      } else {

        this.recalculateSerieUpwards( serie, slotId, interval, data, dataMinMax )
      }

      slotId++;
    }

    this.changed = true;

    serie.setData( data );

    if ( serie._zoneSerie ) {
      serie._zoneSerie.setData( dataMinMax );
    }
  }

  PluginTimeSerieManager.prototype.setIntervalCheck = function( interval ) {

    if ( this.interval ) {
      clearInterval( this.interval )
    }

    var self = this;

    this.interval = setInterval( function() {
      self.update( true, false );
    }, interval );
  }

  PluginTimeSerieManager.prototype.recalculateSerieUpwards = function( serie, downSlotId, downInterval, data, dataMinMax ) {

    var intervals = this.options.intervals.slice( 0 );
    intervals.sort();

    var nextInterval = intervals[ intervals.indexOf( downInterval ) + 1 ] ||  -1;
    var lruData;
    if ( nextInterval < 0 ) {
      return [];
    }

    var newSlotTime = this.computeSlotTime( downSlotId, downInterval );
    var newSlotTimeEnd = this.computeSlotTime( downSlotId + 1, downInterval );
    var newSlotId = this.computeSlotID( newSlotTime, nextInterval ),
      start = false;

    if ( lruData = LRU.get( this.options.LRUName, this.computeUniqueID( serie, newSlotId, nextInterval ) ) ) {

      for ( var i = 0, l = lruData.data.mean.length; i < l; i += 2 ) {

        if ( lruData.data.mean[ i ] < newSlotTime ) {
          continue;

        } else if ( start === false ) {
          start = i;
        }

        if ( lruData.data.mean[  i ] >= newSlotTimeEnd ) {

          data = data.concat( lruData.data.mean.slice( start, i ) );
          dataMinMax = data.concat( lruData.data.minmax.slice( start, i ) );

          return;
        }
      }
    }

    return this.recalculateSerieUpwards( serie, newSlotId, nextInterval, data, dataMinMax );
  }

  return PluginTimeSerieManager;
} );