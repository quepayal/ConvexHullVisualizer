import * as React from 'react';
import { useEffect } from 'react';
import {
  Dimensions,
  GestureResponderEvent,
  Pressable,
  StyleSheet,
} from 'react-native';
import Svg, { Polygon, Polyline } from 'react-native-svg';
import { useDispatch, useSelector } from 'react-redux';
import { View } from '../components/Themed';
import useConvexHull from '../hooks/useConvexHull';
import { ICoordinate } from '../interfaces/container';
import { RootState } from '../redux';
import { setCoordinates } from '../redux/ConvexHullManagement/ConvexHullReducer';

export default function TabOneScreen() {
  const dispatch = useDispatch();
  const coordinates = useSelector(
    (state: RootState) => state.convexHullReducer.coordinates
  );

  const onPress = (evt: GestureResponderEvent) => {
    const currCoordinate: ICoordinate = {
      abscissa: Math.trunc(evt.nativeEvent.locationX),
      ordinate: Math.trunc(evt.nativeEvent.locationY),
    };
    const index = coordinates.findIndex(
      (coordinate) =>
        coordinate.abscissa == currCoordinate.abscissa &&
        coordinate.ordinate == currCoordinate.ordinate
    );
    if (index === -1) dispatch(setCoordinates(currCoordinate));
  };

  const convexHull = useConvexHull();
  const convexHullVector = convexHull
    .map((coord) => `${coord.abscissa},${coord.ordinate}`)
    .join(' ');

  useEffect(() => {
    convexHull.map((coord: ICoordinate) => {
      console.log(coord.abscissa, ':', coord.ordinate);
    });
  }, [convexHull]);

  return (
    <Pressable style={styles.container} onPress={onPress}>
      {coordinates.map((coordinate: ICoordinate, idx: number) => {
        const styles = StyleSheet.create({
          circle: {
            position: 'absolute',
            height: 10,
            width: 10,
            borderRadius: 10,
            backgroundColor: 'orange',
            left: coordinate.abscissa,
            top: coordinate.ordinate,
          },
        });

        return (
          <View
            style={styles.circle}
            key={`coord-${idx}`}
            pointerEvents='none'
          ></View>
        );
      })}
      <Svg height='100%' width='100%'>
        <Polyline
          points={convexHullVector}
          fill='none'
          stroke={'blue'}
          strokeWidth='2'
        />
      </Svg>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
