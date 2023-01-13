import React, { useRef } from "react";
import { Text, FlatList, Image, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideo } from "../../redux/VideoScreenSliceReducer";
import { useDebouncedCallback } from "use-debounce";
import styled from "styled-components/native";
import { ResizeMode } from "expo-av";
import VideoPlayer from "expo-video-player";

export default function VideoScreen() {
  const actionDispatcher = useDispatch();
  const { videoList, loading } = useSelector(
    (state) => state.VideoScreenSlice
  );

  const debounced = useDebouncedCallback((value) => {
    actionDispatcher(fetchVideo(value));
  }, 1000);

  const Item = ({ title }) => (
    <VideoParent>
      <VideoPlayer
      style={{height:200,width:600}}
        videoProps={{
          shouldPlay: false,
          resizeMode: ResizeMode.CONTAIN,
          source: {
          uri: title,
          },
        }}
      />
    </VideoParent>
  );
  return (
    <Container>
      <InputParent>
        <Text style={styles.title}>Search Videos</Text>
        <Input
          style={{ height: 40 }}
          placeholder=" Search"
          onChangeText={(newText) => debounced(newText)}
        />
      </InputParent>
      {videoList.length === 0 && (
        <View style={styles.notFoundResultParent}>
          <Text style={styles.notFoundResultText}>No result found</Text>
        </View>
      )}
      {loading ? (
        <View style={styles.loadingParent}>
          <Text style={styles.loadingText}>loading...</Text>
        </View>
      ) : (
        <ListContainer>
          <FlatList
            data={videoList || []}
            renderItem={({ item }) => <Item title={item.link} />}
            keyExtractor={(item) => item.id}
          />
        </ListContainer>
      )}
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: white;
`;
const ListContainer = styled.View`
  flex: 0.9;
  background-color: white;
`;
const InputParent = styled.View`
  flex: 0.2;
  background-color: white;
  align-items: center;
  justify-content: center;
`;

const Input = styled.TextInput`
  border: 1px solid #ccc;
  width: 90%;
  border-radius: 10;
`;

const VideoParent = styled.View`
  width:95%;
  margin:2%
  border:1px solid #c3c3c3;
  border-radius: 10;
`;
const styles = StyleSheet.create({
  imgPng: {
    height: 200,
    borderRadius: 10,
  },
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  loadingText: {
    fontSize: 20,
  },
  loadingParent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    paddingBottom: 10,
  },
  notFoundResultText: {
    fontSize: 20,
  },
  notFoundResultParent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
