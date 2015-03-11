mapStyle = require('./mapStyle')

module.exports = ( $scope, $filter, $http, $q, $window ) ->
  httpOpt =
    method: 'get'
    url: '/javascripts/test.json'

  _self = this

  incetanceModels = ( data, status ) ->
    for i in [ 0..data.length-1 ]
      # 座標をNumber化
      # @todo
      # DB側で数値として返す
      data[i].cordinateX  = Number( data[i].cordinateX )
      data[i].cordinateY  = Number( data[i].cordinateY )

      # 座標をgoogle-maps が読めるようにプロパティを修正
      # @todo
      # DB側のプロパティ名を修正する
      data[i].longitude   = data[i].cordinateX
      data[i].latitude    = data[i].cordinateY

      # 複数のマーカーを表示するにはユニークなIDが必要
      data[i].id          = i

    $scope.events = data
    $scope.valChange = ( centerLat, centerLong )->
      $scope.map.center.latitude =  centerLat
      $scope.map.center.longitude =  centerLong
      $scope.centerLat = ''
      $scope.centerLong = ''
    return

  getUserGeoLocation = () ->
    d = $q.defer()

    success = ( pos ) ->
      $scope.pos = pos
      d.resolve(pos)
      return

    err = ( err ) ->
      d.reject( err )
      return

    window.navigator.geolocation.getCurrentPosition( success, err, {} )

    return d.promise

  renderMaps = ( pos ) ->
    d = $q.defer()
    $scope.map =
      center:
        latitude : $scope.pos.coords.latitude
        longitude: $scope.pos.coords.longitude
      zoom: 10
      deviceHeight:
        'height': Number( $window.innerHeight ) + "px"
      events:
        tilesloaded: ( map ) ->
          $scope.$apply ->
            console.log 'map'
            styledMap = new google.maps.StyledMapType( mapStyle, {
                name: "Styled Map"
            })
            map.mapTypes.set( 'map_style', styledMap )
            map.setMapTypeId( 'map_style')
            d.resolve()
            return
          return
      scrollFlg:
        scrollwheel: false

    return d.promise

  $http( httpOpt )
    .success( incetanceModels )
    .then( getUserGeoLocation )
    .then( renderMaps )
    .then ->
      console.log( 'all promise is done.' )
      return

  return
