import { StyleSheet, View } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
type YoutubeVideoProps = {
  videoUrl?: string;
};
export default function YoutubeVideo({ videoUrl }: YoutubeVideoProps){
    const videoId = videoUrl?.split("v=")[1]
    
    return <View style={styles.playerWrapper}>
        <YoutubePlayer
        height={400}
        play={false}
        videoId={videoId ?? ''}
      />
    </View>
}

const styles = StyleSheet.create({
    playerWrapper: {
        marginHorizontal: 5,
        marginVertical: 15,
        width: '100%',
        aspectRatio: 16 / 9
    
    }
})