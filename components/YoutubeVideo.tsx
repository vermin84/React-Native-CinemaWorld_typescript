import { Linking, StyleSheet, Text, TouchableOpacity, View, Platform } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";

type YoutubeVideoProps = {
  videoUrl?: string;
};

function extractYoutubeId(url?: string) {
  if (!url) return undefined;
  const match = url.match(/(?:v=|\/embed\/|\.be\/)([^&?]+)/);
  return match ? match[1] : undefined;
}

const isOldAndroid = Platform.OS === 'android' && Platform.Version < 29; // Android 10 и ниже

export default function YoutubeVideo({ videoUrl }: YoutubeVideoProps) {
  const videoId = extractYoutubeId(videoUrl);

  if (isOldAndroid) {
    if (!videoId) return null;
    return (
      <TouchableOpacity
        style={{ alignItems: "center", padding: 16 }}
        onPress={async () => {
          try {
            const url = `https://youtube.com/watch?v=${videoId}`;
            const supported = await Linking.canOpenURL(url);
            if (supported) {
              await Linking.openURL(url);
            } else {
              alert('Не удалось открыть ссылку');
            }
          } catch {
            alert('Ошибка открытия YouTube');
          }
        }}>
        <Text style={{ color: "blue", textDecorationLine: 'underline' }}>Смотреть трейлер на YouTube</Text>
      </TouchableOpacity>
    );
  }

  if (!videoId) return null;

  return (
    <View style={styles.playerWrapper}>
      <YoutubePlayer
        height={200}
        play={false}
        videoId={videoId}
        webViewProps={{
          allowsFullscreenVideo: false,
          javaScriptEnabled: true,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  playerWrapper: {
    marginHorizontal: 5,
    marginVertical: 15,
    width: '100%',
    aspectRatio: 16 / 9,
    justifyContent: 'center',
    flexGrow: 1
  }
});
