import { createAction, createReducer, PayloadAction } from '@reduxjs/toolkit';
import { ICoordinate } from '../../interfaces/container';

interface IConvexHullState {
  coordinates: ICoordinate[];
  convexHullVector: string;
}

const initialState = {
  coordinates: [],
  convexHullVector: '',
} as IConvexHullState;

//Action
export const setCoordinates = createAction<ICoordinate>(
  'convexHull/setCoordinates'
);
export const setConvexHullVector = createAction<ICoordinate[]>(
  'convexHull/setConvexHullVector'
);
export const resetCoordinates = createAction('convexHull/resetCoordinates');

//Reducer
export const convexHullReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCoordinates, (state, action: PayloadAction<ICoordinate>) => {
      if (action.payload) {
        const currCoordinate: ICoordinate = action.payload;
        state.coordinates.push(currCoordinate);
      }
    })
    .addCase(
      setConvexHullVector,
      (state, action: PayloadAction<ICoordinate[]>) => {
        const convexHull: ICoordinate[] = action.payload;
        state.convexHullVector = convexHull
          .map((coord) => `${coord.abscissa},${coord.ordinate}`)
          .join(' ');
      }
    )
    .addCase(resetCoordinates, (state, action: PayloadAction) => {
      state.coordinates = [];
      state.convexHullVector = '';
    })
    .addDefaultCase((state, action) => {});
});
