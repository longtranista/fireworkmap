
export function codeAddress (address, success, failure) {
  var geocoder = new window.google.maps.Geocoder()

  geocoder.geocode({address: address}, function (results, status) {
    if (status === window.google.maps.GeocoderStatus.OK) {
      success && success(results[0].geometry.location)
    } else {
      failure && failure()
    }
  })
}
