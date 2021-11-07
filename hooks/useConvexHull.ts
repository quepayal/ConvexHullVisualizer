import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ICoordinate } from '../interfaces/container';
import { RootState } from '../redux';

const getOrientation = (
  startCoord: ICoordinate,
  a: ICoordinate,
  b: ICoordinate
) => {
  const orientation =
    startCoord.abscissa * (a.ordinate - b.ordinate) +
    a.abscissa * (b.ordinate - startCoord.ordinate) +
    b.abscissa * (startCoord.ordinate - a.ordinate);

  if (orientation < 0) return -1; // Clockwise
  // Anti-Clockwise
  if (orientation > 0) return 1;
  else return 0;
};

const areCollinear = (
  a: ICoordinate,
  b: ICoordinate,
  c: ICoordinate
): boolean => {
  return getOrientation(a, b, c) === 0;
};

const helperFunc = (
  a: ICoordinate,
  b: ICoordinate,
  c: ICoordinate,
  includeCollinear: boolean
): boolean => {
  const orientation = getOrientation(a, b, c);
  return orientation < 0 || (includeCollinear && orientation == 0);
};

export default function useConvexHull() {
  const coordinates = useSelector(
    (state: RootState) => state.convexHullReducer.coordinates
  );
  const [includeCollinear, setIncludeCollinear] = useState<boolean>(false);
  const [convexHull, setConvexHull] = useState<ICoordinate[]>([]);

  useEffect(() => {
    let coordinatesVector: ICoordinate[] = [];
    coordinates.forEach((val) =>
      coordinatesVector.push(Object.assign({}, val))
    );
    coordinatesVector.sort((a, b) => {
      if (a.ordinate === b.ordinate) return a.abscissa - b.abscissa;
      else return a.ordinate - b.ordinate;
    });

    const startCoord: ICoordinate = coordinatesVector[0];
    coordinatesVector.sort((a, b) => {
      const orientation = getOrientation(startCoord, a, b);
      if (orientation == 0)
        return (
          (startCoord.abscissa - a.abscissa) *
            (startCoord.abscissa - a.abscissa) +
          (startCoord.ordinate - a.ordinate) *
            (startCoord.ordinate - a.ordinate) -
          (startCoord.abscissa - b.abscissa) *
            (startCoord.abscissa - b.abscissa) +
          (startCoord.ordinate - b.ordinate) *
            (startCoord.ordinate - b.ordinate)
        );
      return orientation;
    });

    if (includeCollinear) {
      let iterator = coordinatesVector.length - 1;
      const backIterator = coordinatesVector.length - 1;
      while (
        iterator >= 0 &&
        areCollinear(
          startCoord,
          coordinatesVector[iterator],
          coordinatesVector[backIterator]
        )
      )
        iterator--;
      const vector: ICoordinate[] = coordinatesVector.slice(iterator + 1);
      vector.reverse();
      coordinatesVector.splice(iterator + 1);
      coordinatesVector.concat(vector);
    }

    let convexHullVector: ICoordinate[] = [];

    for (let iterator = 0; iterator < coordinatesVector.length; iterator++) {
      while (
        convexHullVector.length > 1 &&
        !helperFunc(
          convexHullVector[convexHullVector.length - 2],
          convexHullVector[convexHullVector.length - 1],
          coordinatesVector[iterator],
          includeCollinear
        )
      ) {
        convexHullVector.splice(convexHullVector.length - 1);
      }

      convexHullVector.push(coordinatesVector[iterator]);
      setConvexHull(convexHullVector);
    }
  }, [coordinates, includeCollinear]);

  return convexHull;
}
