import { createAction, createReducer, PayloadAction } from '@reduxjs/toolkit';

interface ICoordinate {
  abscissa: number;
  ordinate: number;
}

interface IConvexHullState {
  coordinates: ICoordinate[];
}

const initialState = {
  coordinates: [],
} as IConvexHullState;

export const setCoordinates = createAction<ICoordinate>(
  'convexHull/setCoordinates'
);
export const resetCoordinates = createAction('convexHull/resetCoordinates');

export const convexHullReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCoordinates, (state, action: PayloadAction<ICoordinate>) => {
      if (action.payload) {
        const currCoordinate: ICoordinate = action.payload;
        state.coordinates.push(currCoordinate);
      }
    })
    .addCase(resetCoordinates, (state, action: PayloadAction) => {
      state.coordinates = [];
    })
    .addDefaultCase((state, action) => {});
});
