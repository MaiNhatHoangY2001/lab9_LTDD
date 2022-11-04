import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

function Screen3() {
	const FadeInView = (props) => {
		const fadeAnim = useRef(new Animated.Value(0)).current;

		useEffect(() => {
			Animated.timing(fadeAnim, {
				toValue: 1,
				duration: 2000,
				useNativeDriver: true,
			}).start();
		}, [fadeAnim]);

		return (
			<Animated.View // Special animatable View
				style={{
					...props.style,
					opacity: fadeAnim, // Bind opacity to animated value
				}}
			>
				{props.children}
			</Animated.View>
		);
	};

	return (
		<View style={styles.container}>
			<FadeInView>
				<Text style={{ fontSize: 20, fontWeight: 'bold' }}>Welcome to Animation React Native</Text>
			</FadeInView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default Screen3;
