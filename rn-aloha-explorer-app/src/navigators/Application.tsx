import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MatComIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MatIcon from 'react-native-vector-icons/MaterialIcons';

import { Home, Startup, ActivityDetails } from '@/screens';
import { getData, setData } from '@/services/storage';
import { useTheme } from '@/theme';

import type { RootStackParamList } from '@/types/navigation';
import React, { useEffect, useRef, useState } from 'react';

import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { ActivityIndicator, Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { HighlightDataType } from '@/components/molecules/Highlights/HighLights';
import { CategoriesDataType } from '@/components/molecules/Categories/Categories';
import { bookATrip, fetchAllHomeData } from '@/services/data';
import { TopSpotDataType } from '@/components/molecules/TopSpots/TopSpots';
import { GuideDataType } from '@/components/molecules/Guides/Guides';

const Stack = createStackNavigator<RootStackParamList>();

const Tab = createBottomTabNavigator();



export type HomeDataType = {
	header: HeaderDataType,
	highlights: Array<HighlightDataType>,
	categories: Array<CategoriesDataType>,
	guides: Array<GuideDataType>,
	topSpots: Array<TopSpotDataType>,
};

export type HeaderDataType = {
	message: string;
	image: string;
};


function ApplicationNavigator() {
	const { variant, navigationTheme } = useTheme();
	const [activities, setActivities] = useState<Array<HighlightDataType>>();



	const [homeData, setHomeData] = useState<HomeDataType>({
		header: {
			message: "",
			image: ""
		},
		highlights: [],
		categories: [],
		guides: [],
		topSpots: []
	});

	const isLoading = useRef(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				isLoading.current = true;

				// Introduce manual delay to show loader
				setTimeout(async () => {
					const data = await fetchAllHomeData();

					setHomeData(data);
					setData("home_data", data);

					setActivities(data.highlights);
				}, 1500);


			} catch (error) {
				console.error('Error fetching home data:', error);
			} finally {
				isLoading.current = false;
			}
		};

		fetchData();
	}, []);

	const FloatingButton = () => {

		const [isBooking, setIsBooking] = useState(false);
		return (
			<TouchableOpacity style={styles.floatingButton} onPress={
				async () => {
					const name = 'John Deer';
					const destination = 'Maui';
					const date = new Date().toISOString();


					setIsBooking(true);
					setTimeout(async () => {

						const response = await bookATrip(name, destination, date);
						if (response.status === 201) {
							Alert.alert("Success", response.data);
						} else {
							Alert.alert("Failed", `Failed to book trip, Response error: ${response.data}`);
						}

						setIsBooking(false);
					}, 1500);
				}}>
				{isBooking ? <ActivityIndicator color="white" size="small" /> : <Text style={styles.floatingButtonText}>Book a trip</Text>}
			</TouchableOpacity>
		);
	};

	const HomeComponent = () => (
		<View style={{ flex: 1 }}>
			<Tab.Navigator
				screenOptions={
					({ route }) => ({
						headerShown: false,
						tabBarIcon: ({ focused, color, size }) => {
							let iconName = 'home';
							switch (route.name) {
								case 'Home':
									iconName = 'home';
									break;
								case 'Surfing':
									return <MatComIcon name={"surfing"} size={24} color={color} />;
								case 'Hula':
									iconName = 'nightlife';
									break;
								case 'Volcanoes':
									iconName = 'filter-hdr';
									break;
							}
							return <MatIcon name={iconName} size={24} color={color} />;
						},
						tabBarActiveTintColor: '#008080',
						tabBarInactiveTintColor: '#333',
						tabBarActiveBackgroundColor: '#ffffff',
						tabBarInactiveBackgroundColor: '#ffffff',
					})}
			>
				<Tab.Screen name="Home" component={Home} />
				{activities?.map((activity) => {
					return <Tab.Screen key={activity.title || 'id'} name={activity.title || 'name'} component={() => ActivityDetails(activity, homeData.topSpots, homeData.guides)} />;
				})}
			</Tab.Navigator>
			{isLoading.current ? <View /> : <FloatingButton />}
		</View>
	);

	return (
		<SafeAreaProvider>
			<NavigationContainer theme={navigationTheme}>
				<Stack.Navigator key={variant}>
					<Stack.Screen name="Startup" options={{ headerShown: false }} component={Startup} />
					<Stack.Screen
						options={{ headerShown: false }}
						name="HomeMain"
						component={HomeComponent}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</SafeAreaProvider>
	);
}

export default ApplicationNavigator;



const styles = StyleSheet.create({

	floatingButton: {
		position: 'absolute',
		bottom: 70,
		left: 20,
		right: 20,
		backgroundColor: '#008080',
		borderRadius: 10,
		height: 44,
		justifyContent: 'center',
		alignItems: 'center',
		elevation: 5,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
	},
	floatingButtonText: {
		color: 'white',
		fontSize: 16,
		fontWeight: '700',
	},
});