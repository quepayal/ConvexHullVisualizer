import * as React from 'react';
import { GestureResponderEvent, Pressable, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { Text, View } from '../components/Themed';
import { RootState } from '../redux';
import { setCoordinates } from '../redux/ConvexHullManagement/ConvexHullReducer';

interface ICorrdinate {
  abscissa: number;
  ordinate: number;
}

export default function TabOneScreen() {
  const dispatch = useDispatch();
  const coordinates = useSelector(
    (state: RootState) => state.convexHullReducer.coordinates
  );

  const onPress = (evt: GestureResponderEvent) => {
    const currCoordinate: ICorrdinate = {
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

  return (
    <Pressable style={styles.container} onPress={onPress}>
      {coordinates.map((coordinate: ICorrdinate, idx: number) => {
        const styles = StyleSheet.create({
          circle: {
            position: 'absolute',
            height: 30,
            width: 30,
            borderRadius: 30,
            backgroundColor: 'orange',
            left: coordinate.abscissa,
            top: coordinate.ordinate,
          },
        });

        return (
          <View style={styles.circle} key={`coord-${idx}`} pointerEvents='none'>
          </View>
        );
      })}
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
