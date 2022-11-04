import React, { useRef } from 'react';
import { Animated, useWindowDimensions, View, Image } from 'react-native';
const CURSOR_SIDE_SIZE = 96;
const CURSOR_HALF_SIDE_SIZE = CURSOR_SIDE_SIZE / 2;
export default function Screen1() {
	const dimensions = useWindowDimensions();

	const touch = useRef(
		new Animated.ValueXY({ x: dimensions.width / 2 - CURSOR_HALF_SIDE_SIZE, y: dimensions.height / 2 - CURSOR_HALF_SIDE_SIZE })
	).current;

	return (
		<View
			onStartShouldSetResponder={() => true}
			onMoveShouldSetResponder={() => true}
			onResponderMove={(event) => {
				Animated.timing(touch, {
					toValue: {
						x: event.nativeEvent.locationX - CURSOR_HALF_SIDE_SIZE,
						y: event.nativeEvent.locationY - CURSOR_HALF_SIDE_SIZE,
					},
					duration: 1000,
					useNativeDriver: false,
				}).start();
			}}
			// onResponderRelease={() => {
			// 	Animated.spring(touch, {
			// 		toValue: {
			// 			x: dimensions.width / 2 - CURSOR_HALF_SIDE_SIZE,
			// 			y: dimensions.height / 2 - CURSOR_HALF_SIDE_SIZE,
			// 		},
			// 		// left/top are not supported
			// 		useNativeDriver: false,
			// 	}).start();
			// }}
			style={{ flex: 1 }}
		>
			<Animated.Image
				source={require('../assets/cat.png')}
				style={{
					position: 'absolute',
					left: touch.x,
					top: touch.y,
				}}
			/>
		</View>
	);
}
