import 'react-native-gesture-handler';
import React, { useEffect, useRef, useState } from 'react';

import {
	View,
	ScrollView,
	Image,
	Text,
} from 'react-native';

import { Brand, Guides } from '@/components/molecules';
import { fetchAllHomeData } from '@/services/data';
import { SafeScreen } from '@/components/template';
import { useTheme } from '@/theme';

import AppBar from '@/components/molecules/AppBar/AppBar';
import TopSpots, { TopSpotDataType } from '@/components/molecules/TopSpots/TopSpots';
import { HighlightDataType } from '@/components/molecules/Highlights/HighLights';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { GuideDataType } from '@/components/molecules/Guides/Guides';


function ActivityDetails(activity: HighlightDataType, topSpots: TopSpotDataType[], guides: GuideDataType[]) {

	const {
		gutters
	} = useTheme();


	if (!activity) {
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
							uri: activity.image! || 'https://i.imgur.com/zJTZkay.png',
							height: 300,
							width: 400,
						}} />
					</View>
					<View style={[gutters.marginVertical_32]}>
						<View style={[gutters.paddingHorizontal_12]}>
							<Text style={{ fontSize: 16, fontWeight: '400', color: '#333' }}>{activity.description}</Text>
							<TopSpots topSpots={topSpots} />
						</View>
						<View style={{ backgroundColor: '#E6F2F2', ...gutters.paddingLeft_12 }}>
							<Guides guides={guides} />
						</View>
					</View>
					<View style={[gutters.paddingTop_80]}></View>
				</ScrollView>

			</View>
		</SafeScreen>
	);
}

export default ActivityDetails;
