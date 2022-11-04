import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Screen1 from './components/Screen1';
import Screen2 from './components/Screen2';
import Screen3 from './components/Screen3';

export default function App() {
	const [screen, setScreen] = useState(0);

	const dataScreen = [
		{
			id: 0,
			screen: 'Screen1',
		},
		{
			id: 1,
			screen: 'Screen2',
		},
		{
			id: 2,
			screen: 'Screen3',
		},
	];

	const getScreen = () => {
		switch (screen) {
			case 0:
				return <Screen1 />;
			case 1:
				return <Screen2 />;
			case 2:
				return <Screen3 />;
		}
	};

	return (
		<>
			{getScreen()}
			<View style={styles.viewButton}>
				{dataScreen.map((item, index) => {
					return (
						<TouchableOpacity key={index} style={styles.screenButton} onPress={() => setScreen(item.id)}>
							<Text style={{ color: 'white', fontSize: 15 }}>{item.screen}</Text>
						</TouchableOpacity>
					);
				})}
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	screenButton: {
		alignItems: 'center',
		alignSelf: 'center',
		backgroundColor: 'red',
		padding: 15,
		margin: 2,
	},
	viewButton: {
		position: 'absolute',
		bottom: 0,
		flexWrap: 'wrap',
		flexDirection: 'row',
		margin: 5,
		left: 60,
		justifyContent: 'space-around',
	},
});
