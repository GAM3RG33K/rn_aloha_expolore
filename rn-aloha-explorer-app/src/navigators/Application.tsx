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
import { View } from 'react-native';
import { HighlightDataType } from '@/components/molecules/Highlights/HighLights';
import { CategoriesDataType } from '@/components/molecules/Categories/Categories';
import { fetchAllHomeData } from '@/services/data';
import TopSpots, { TopSpotDataType } from '@/components/molecules/TopSpots/TopSpots';

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



export type GuideDataType = {
	id: number;
	name: string;
	rating: number;
	reviews: number;
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

				// Introduce manual delay to show shimmer effects
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

	const HomeComponent = () => (
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
				return <Tab.Screen key={activity.title || 'id'} name={activity.title || 'name'} component={() => ActivityDetails(activity, homeData.topSpots)} />;
			})}

		</Tab.Navigator>
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
