// code referenced from the document of Baidu Map
let map = new BMapGL.Map("map")
let point = new BMapGL.Point(116.331398,39.897445)
map.centerAndZoom(point,12)

let geolocation = new BMapGL.Geolocation()
let scaleCtrl = new BMapGL.ScaleControl()
map.addControl(scaleCtrl)
let zoomCtrl = new BMapGL.ZoomControl()
map.addControl(zoomCtrl)

geolocation.getCurrentPosition(function(r){
    if(this.getStatus() == BMAP_STATUS_SUCCESS){
        let mk = new BMapGL.Marker(r.point);
        map.addOverlay(mk)
        map.panTo(r.point)
        console.log('Your location：' + r.point.lng + ',' + r.point.lat)
    }
    else {
        console.log('Error in grabbing the location.')
    }        
});