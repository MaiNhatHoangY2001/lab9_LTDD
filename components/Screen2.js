import React, { useRef } from 'react';
import { Animated, useWindowDimensions, View, Image } from 'react-native';
const CURSOR_SIDE_SIZE = 48;
const CURSOR_HALF_SIDE_SIZE = CURSOR_SIDE_SIZE / 2;
export default function Screen2() {
	const dimensions = useWindowDimensions();

	const randomXY = () => {
		const width = dimensions.width;
		const height = dimensions.height;

		const xRandom = Math.random() * width;
		const yRandom = Math.random() * height;
		return {
			x: xRandom,
			y: yRandom,
		};
	};

	const rat1 = useRef(new Animated.ValueXY({ x: randomXY().x, y: randomXY().y })).current;
	const rat2 = useRef(new Animated.ValueXY({ x: randomXY().x, y: randomXY().y })).current;
	const rat3 = useRef(new Animated.ValueXY({ x: randomXY().x, y: randomXY().y })).current;

	const onPressScreen = () => {
		Animated.sequence([
			Animated.timing(rat1, {
				toValue: {
					x: randomXY().x,
					y: randomXY().y,
				},
				duration: 500,
				useNativeDriver: false,
			}),
			Animated.timing(rat2, {
				toValue: {
					x: randomXY().x,
					y: randomXY().y,
				},
				duration: 500,
				useNativeDriver: false,
			}),
			Animated.timing(rat3, {
				toValue: {
					x: randomXY().x,
					y: randomXY().y,
				},
				duration: 500,
				useNativeDriver: false,
			}),
		]).start();
	};

	return (
		<View
			onStartShouldSetResponder={() => true}
			onMoveShouldSetResponder={() => true}
			onResponderMove={onPressScreen}
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
				source={require('../assets/rat.png')}
				style={{
					position: 'absolute',
					left: rat1.x,
					top: rat1.y,
				}}
			/>
			<Animated.Image
				source={require('../assets/rat.png')}
				style={{
					position: 'absolute',
					left: rat2.x,
					top: rat2.y,
				}}
			/>
			<Animated.Image
				source={require('../assets/rat.png')}
				style={{
					position: 'absolute',
					left: rat3.x,
					top: rat3.y,
				}}
			/>
		</View>
	);
}
