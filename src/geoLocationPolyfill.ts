export const getAccurateCurrentPosition = function (
  geolocationSuccess: PositionCallback,
  geolocationError?: PositionErrorCallback | null,
  geoprogress?: (position: GeolocationPosition) => void,
  options?: any
) {
  let lastCheckedPosition: GeolocationPosition,
    locationEventCount = 0,
    watchID: number,
    timerID: NodeJS.Timeout;

  options = options || {};

  const checkLocation: PositionCallback = function (position) {
    lastCheckedPosition = position;
    locationEventCount = locationEventCount + 1;
    // We ignore the first event unless it's the only one received because some devices seem to send a cached
    // location even when maxaimumAge is set to zero
    if (
      position.coords.accuracy <= options.desiredAccuracy &&
      locationEventCount > 1
    ) {
      clearTimeout(timerID);
      navigator.geolocation.clearWatch(watchID);
      foundPosition(position);
    } else {
      geoprogress && geoprogress(position);
    }
  };

  var stopTrying = function () {
    navigator.geolocation.clearWatch(watchID);
    foundPosition(lastCheckedPosition);
  };

  var onError: PositionErrorCallback = function (error) {
    clearTimeout(timerID);
    navigator.geolocation.clearWatch(watchID);
    geolocationError && geolocationError(error);
  };

  var foundPosition = function (position: GeolocationPosition) {
    geolocationSuccess(position);
  };

  if (!options.maxWait) options.maxWait = 20000; // Default 20 seconds
  if (!options.desiredAccuracy) options.desiredAccuracy = 20; // Default 20 meters
  if (!options.timeout) options.timeout = options.maxWait; // Default to maxWait

  options.maximumAge = 0; // Force current locations only
  options.enableHighAccuracy = true; // Force high accuracy (otherwise, why are you using this function?)

  watchID = navigator.geolocation.watchPosition(
    checkLocation,
    onError,
    options
  );
  timerID = setTimeout(stopTrying, options.maxWait); // Set a timeout that will abandon the location loop
};
