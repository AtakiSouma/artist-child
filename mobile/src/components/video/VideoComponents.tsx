import * as React from "react";
import { View, StyleSheet, Button } from "react-native";
import { Video, ResizeMode } from "expo-av";
import { appColors } from "../../constants/appColors";
import ButtonComponent from "../button/ButtonComponent";
import { AntDesign } from "@expo/vector-icons";
type Props = {
  videoUrl: string;
};

const VideoComponent = (props: Props) => {
  const { videoUrl } = props;
  const video = React.useRef<Video>(null);
  const [status, setStatus] = React.useState<any>({});

  return (
    <View style={styles.container}>
      <Video
        ref={video}
        style={styles.video}
        source={{
          uri: videoUrl,
        }}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        isLooping
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />
      <View style={styles.buttons}>
        <ButtonComponent
          type="primary"
          styles={{ width: 120, height: 55 }}
          iconFlex="left"
          icon={
            status.isPlaying ? (
              <AntDesign name="pausecircle" size={24} color={appColors.white} />
            ) : (
              <AntDesign name="play" size={24} color={appColors.white} />
            )
          }
          text={status.isPlaying ? "Pause" : "Play"}
          onPress={() =>
            status.isPlaying
              ? video.current?.pauseAsync()
              : video.current?.playAsync()
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: appColors.button,
  },
  video: {
    alignSelf: "center",
    width: 320,
    height: 200,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    color: appColors.primary,
  },
});
export default VideoComponent;
