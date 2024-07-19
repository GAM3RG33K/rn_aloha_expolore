import 'react-native-gesture-handler';
import React, { useEffect, useRef, useState } from 'react';

import {
	View,
	ScrollView,
	Image,
} from 'react-native';

import { Brand, Guides } from '@/components/molecules';
import { fetchAllHomeData } from '@/services/data';
import { getData, setData } from '@/services/storage';
import { SafeScreen } from '@/components/template';
import { useTheme } from '@/theme';


import SkeletonPlaceholder from "react-native-skeleton-placeholder";

import AppBar from '@/components/molecules/AppBar/AppBar';
import Highlights, { HighlightDataType } from '@/components/molecules/Highlights/HighLights';
import Categories, { CategoriesDataType } from '@/components/molecules/Categories/Categories';
import { HomeDataType } from '@/navigators/Application';



function Home() {
	const {
		gutters
	} = useTheme();


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
	const [highlights, setHighlights] = useState([]);
	const [categories, setCategories] = useState([]);
	const [guides, setGuides] = useState([]);

	const isLoading = useRef(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				isLoading.current = true;

				// Introduce manual delay to show shimmer effects
				setTimeout(async () => {
					const data = await fetchAllHomeData();

					setHomeData(data);
					setHighlights(data.highlights);
					setCategories(data.categories);
					setGuides(data.guides);

				}, 1500);


			} catch (error) {
				console.error('Error fetching home data:', error);
			} finally {
				isLoading.current = false;
			}
		};

		fetchData();
	}, []);

	if (isLoading.current) {
		return (<SkeletonPlaceholder>
			<View>
				<View style={{ marginLeft: 20, marginTop: 20 }}>
					<View style={{ width: 350, height: 400 }} />
					<View style={{ marginTop: 6, width: 260, height: 20, borderRadius: 5 }} />
					<View style={{ marginTop: 6, width: 350, height: 70, borderRadius: 10 }} />
				</View>
				<View style={{ marginLeft: 20, marginTop: 20 }}>
					<View style={{ width: 350, height: 400 }} />
					<View style={{ marginTop: 6, width: 260, height: 20, borderRadius: 5 }} />
					<View style={{ marginTop: 6, width: 350, height: 70, borderRadius: 10 }} />
				</View>
			</View>
		</SkeletonPlaceholder>);
	}
	return (
		<SafeScreen >

			<View style={{ backgroundColor: '#FFFFFF' }}>

				<AppBar height={80}>
					<View style={[gutters.paddingVertical_12]}>
						<Brand height={50} width={100} />
					</View>
				</AppBar>
				<ScrollView>
					<View>
						<Image source={{
							uri: homeData.header?.image || 'https://i.imgur.com/zJTZkay.png',
							height: 480,
							width: 400,
						}} />
					</View>
					<View style={[gutters.marginVertical_32]}>
						<View style={[gutters.paddingLeft_12]}>
							{highlights && highlights.length > 0 ? <Highlights highlights={highlights} /> : null}
						</View>
						<View style={{ backgroundColor: '#E6F2F2', ...gutters.paddingLeft_12 }}>
							{categories && categories.length > 0 ? <Categories categories={categories} /> : null}
							{guides && guides.length > 0 ? <Guides guides={guides} /> : null}
						</View>
					</View>
					<View style={[gutters.paddingTop_80]}></View>
				</ScrollView>

			</View>
		</SafeScreen>
	);
}

export default Home;
