import React, { FC, useEffect, useLayoutEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import MapView, { Callout, Circle, MapPressEvent, Marker, MarkerDragStartEndEvent } from "react-native-maps";
import tw from "twrnc";
import { LocationType } from "../../models/Place";

type MapProps = {
  pickedLocation: LocationType | undefined;
  onLocationChange?: (newLocation: LocationType) => void;
  allowSelect: boolean;
};

const Map: FC<MapProps> = (props) => {
  const onLocationChangeHandler = (event: MapPressEvent | MarkerDragStartEndEvent) => {
    if (props.onLocationChange) {
      props.onLocationChange({
        latitude: event.nativeEvent.coordinate.latitude,
        longitude: event.nativeEvent.coordinate.longitude,
      });
    }
  };

  return (
    <MapView
      zoomEnabled={props.allowSelect}
      scrollEnabled={props.allowSelect}
      loadingEnabled={true}
      loadingBackgroundColor={tw.color("gray-800")}
      loadingIndicatorColor={tw.color("sky-600")}
      onPress={onLocationChangeHandler}
      style={tw`w-full h-full rounded`}
      initialRegion={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      region={{
        latitude: props.pickedLocation ? props.pickedLocation.latitude : 37.78825,
        longitude: props.pickedLocation ? props.pickedLocation.longitude : -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      {props.pickedLocation && (
        <>
          <Marker
            coordinate={props.pickedLocation}
            pinColor={tw.color("sky-300")}
            draggable={true}
            onDragEnd={onLocationChangeHandler}
          >
            <Callout>
              <Text>{props.allowSelect ? "Your picked location" : "Current Location"}</Text>
            </Callout>
          </Marker>
          <Circle
            center={{
              latitude: props.pickedLocation ? props.pickedLocation.latitude : 37.78825,
              longitude: props.pickedLocation ? props.pickedLocation.longitude : -122.4324,
            }}
            radius={1000}
            strokeColor={tw.color("sky-800")}
            strokeWidth={2}
          />
        </>
      )}
    </MapView>
  );
};
export default Map;
