import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { videoService } from "../services/videoService";

export const fetchVideo = createAsyncThunk("GET_VIDEO", async (Payload) => {
  return videoService(Payload);
});
const initialState = {
  videoList: [],
  loading: false,
  error: null,
};
export const VideoScreenSlice = createSlice({
  name: "VideoScreenSlice",
  initialState: initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideo.fulfilled, (state, action) => {
        state.error = null;
        state.videoList = action.payload;
        state.loading = false;
      })
      .addCase(fetchVideo.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.videoList = initialState;
      })
      .addCase(fetchVideo.rejected, (state, action) => {
        state.loading = false;
        state.error = 'something went wrong';
        state.videoList = initialState;
      });
  },
});

export const { videoDataReducer } = VideoScreenSlice.actions;

export const videoData = (state) => state.reducer;
export default VideoScreenSlice.reducer;