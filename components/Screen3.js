import React, { useRef, useState } from 'react';
import { Animated, useWindowDimensions, View, Alert, Modal, StyleSheet, Text, Pressable } from 'react-native';
const CURSOR_SIDE_SIZE = 48;
const CURSOR_HALF_SIDE_SIZE = CURSOR_SIDE_SIZE / 2;
const MIN_RANDOM = 1;
const MAX_RANDOM = 7;
export default function Screen3() {
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

	const randomRound = (min, max) => {
		let num = 0;
		min = Math.ceil(min);
		max = Math.floor(max);
		num = Math.floor(Math.random() * (max - min + 1) + min);
		return num;
	};

	const [maxRound, setMaxRound] = useState(randomRound(MIN_RANDOM, MAX_RANDOM));
	const [round, setRound] = useState(0);

	const [modalVisible, setModalVisible] = useState(false);

	const rat1 = useRef(new Animated.ValueXY({ x: randomXY().x, y: randomXY().y })).current;
	const rat2 = useRef(new Animated.ValueXY({ x: randomXY().x, y: randomXY().y })).current;
	const rat3 = useRef(new Animated.ValueXY({ x: randomXY().x, y: randomXY().y })).current;
	const touch = useRef(
		new Animated.ValueXY({ x: dimensions.width / 2 - CURSOR_HALF_SIDE_SIZE, y: dimensions.height / 2 - CURSOR_HALF_SIDE_SIZE })
	).current;

	const handleHideModal = () => {
		setModalVisible(false);
		setMaxRound(randomRound(MIN_RANDOM, MAX_RANDOM));
		setRound(0);
	};

	const runRat = (event) => {
		if (round < maxRound) {
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
			setRound(round + 1);
		} else {
			setModalVisible(true);
		}

		runCat(event.nativeEvent.pageX, event.nativeEvent.pageY);
	};

	const runCat = (x, y) => {
		Animated.timing(touch, {
			toValue: {
				x: x - CURSOR_HALF_SIDE_SIZE,
				y: y - CURSOR_HALF_SIDE_SIZE,
			},
			duration: 1000,
			useNativeDriver: false,
		}).start();
	};

	return (
		<View style={{ flex: 1 }}>
			<Text style={styles.text}>
				{round}/{maxRound}
			</Text>
			<Animated.View
				onStartShouldSetResponder={() => true}
				onMoveShouldSetResponder={() => true}
				onResponderRelease={(e) => runCat(e.nativeEvent.locationX, e.nativeEvent.locationY)}
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
			</Animated.View>
			<Animated.Image
				onStartShouldSetResponder={() => true}
				onMoveShouldSetResponder={() => true}
				onResponderRelease={runRat}
				source={require('../assets/rat.png')}
				style={{
					position: 'absolute',
					left: rat1.x,
					top: rat1.y,
				}}
			/>
			<Animated.Image
				onStartShouldSetResponder={() => true}
				onMoveShouldSetResponder={() => true}
				onResponderRelease={runRat}
				source={require('../assets/rat.png')}
				style={{
					position: 'absolute',
					left: rat2.x,
					top: rat2.y,
				}}
			/>
			<Animated.Image
				onStartShouldSetResponder={() => true}
				onMoveShouldSetResponder={() => true}
				onResponderRelease={runRat}
				source={require('../assets/rat.png')}
				style={{
					position: 'absolute',
					left: rat3.x,
					top: rat3.y,
				}}
			/>
			<View style={styles.centeredView}>
				<Modal
					animationType="slide"
					transparent={true}
					visible={modalVisible}
					onRequestClose={() => {
						Alert.alert('Modal has been closed.');
						setModalVisible(!modalVisible);
					}}
				>
					<View style={styles.centeredView}>
						<View style={styles.modalView}>
							<Text style={styles.modalText}>Mèo đã bắt được chuột!!!!</Text>
							<Pressable style={[styles.button, styles.buttonClose]} onPress={handleHideModal}>
								<Text style={styles.textStyle}>Chơi lại</Text>
							</Pressable>
						</View>
					</View>
				</Modal>
				{/* <Pressable style={[styles.button, styles.buttonOpen]} onPress={() => setModalVisible(true)}>
					<Text style={styles.textStyle}>Show Modal</Text>
				</Pressable> */}
			</View>
		</View>
	);
}
const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 22,
	},
	modalView: {
		margin: 20,
		backgroundColor: 'white',
		borderRadius: 20,
		padding: 35,
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	button: {
		borderRadius: 20,
		padding: 10,
		elevation: 2,
	},
	buttonOpen: {
		backgroundColor: '#F194FF',
	},
	buttonClose: {
		backgroundColor: '#2196F3',
	},
	textStyle: {
		color: 'white',
		fontWeight: 'bold',
		textAlign: 'center',
	},
	modalText: {
		marginBottom: 15,
		textAlign: 'center',
	},
	text: {
		alignSelf: 'center',
		justifyContent: 'center',
		position: 'absolute',
		top: 100,
		fontSize: 30,
		color: 'red',
	},
});
