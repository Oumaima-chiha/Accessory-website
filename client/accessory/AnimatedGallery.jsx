import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const AnimatedGallery = ({ images }) => {
  const scrollX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollX.value = event.contentOffset.x;
  });

  const imageSize = width * 0.8;
  const imageMargin = width * 0.1;

  const imageScale = interpolate(
    scrollX.value,
    images.map((_, index) => width * index),
    images.map((_, index) => width * index + width),
    [1, 0.7, 1],
    Extrapolate.CLAMP
  );

  return (
    <View style={styles.container}>
      <Animated.FlatList
        horizontal
        data={images}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Animated.View style={{ width, justifyContent: 'center', alignItems: 'center' }}>
            <Animated.Image
              source={{ uri: item }}
              style={[
                styles.image,
                {
                  width: imageSize,
                  height: imageSize,
                  transform: [{ scale: imageScale }],
                  marginHorizontal: imageMargin,
                },
              ]}
            />
          </Animated.View>
        )}
        onScroll={scrollHandler}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToInterval={width}
        decelerationRate="fast"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    borderRadius: 10,
  },
});

export default AnimatedGallery;
