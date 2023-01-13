import { combineReducers, configureStore,getDefaultMiddleware } from "@reduxjs/toolkit";
import VideoScreenSlice from "./VideoScreenSliceReducer";

const reducer = combineReducers({
  VideoScreenSlice,
});

const store = configureStore({
  reducer:reducer,

});

export default store;
