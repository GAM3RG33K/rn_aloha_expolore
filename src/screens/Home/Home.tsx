import React, { useEffect, useState } from 'react';
import {
	View,
	ActivityIndicator,
	Text,
	TouchableOpacity,
	ScrollView,
	Alert,
	Image,
} from 'react-native';
import i18next from 'i18next';
import { useQuery } from '@tanstack/react-query';

import { ImageVariant } from '@/components/atoms';
import { Brand } from '@/components/molecules';
import { SafeScreen } from '@/components/template';
import { useTheme } from '@/theme';
import { fetchOne } from '@/services/users';

import { isImageSourcePropType } from '@/types/guards/image';

import SendImage from '@/theme/assets/images/send.png';
import ColorsWatchImage from '@/theme/assets/images/colorswatch.png';
import AppBar from '@/components/molecules/AppBar/AppBar';

function Home() {
	const {
		colors,
		variant,
		changeTheme,
		layout,
		gutters,
		fonts,
		components,
		backgrounds,
	} = useTheme();

	const [currentId, setCurrentId] = useState(-1);

	const { isSuccess, data, isFetching } = useQuery({
		queryKey: ['example', currentId],
		queryFn: () => {
			return fetchOne(currentId);
		},
		enabled: currentId >= 0,
	});

	useEffect(() => {
		if (isSuccess) {
			Alert.alert("Welcome ", data.name);
		}
	}, [isSuccess, data]);

	const onChangeTheme = () => {
		changeTheme(variant === 'default' ? 'dark' : 'default');
	};

	const onChangeLanguage = (lang: 'fr' | 'en') => {
		void i18next.changeLanguage(lang);
	};

	if (
		!isImageSourcePropType(SendImage) ||
		!isImageSourcePropType(ColorsWatchImage)
	) {
		throw new Error('Image source is not valid');
	}

	return (
		<SafeScreen>

			<AppBar height={80}>
				<View style={[gutters.paddingVertical_12]}>
					<Brand height={50} width={100} />
				</View>
			</AppBar>
			<ScrollView>
				<View>
					<Image source={{
						uri: 'https://i.imgur.com/zJTZkay.png',
						height: 480,
						width: 400,
					}} />
				</View>
				<View style={[gutters.paddingHorizontal_32, gutters.marginTop_40]}>
					<View style={[gutters.marginTop_40]}>
						<Text style={[fonts.size_40, fonts.gray800, fonts.bold]}>
							{"Welcome to Aloha Explorer"}
						</Text>
						<Text
							style={[
								fonts.gray400,
								fonts.bold,
								fonts.size_24,
								gutters.marginBottom_32,
							]}
						>
							{"Your ultimate travel guide for exploring the beautiful islands of Hawaii"}
						</Text>
					</View>

					<View
						style={[
							layout.row,
							layout.justifyBetween,
							layout.fullWidth,
							gutters.marginTop_16,
						]}
					>
						<TouchableOpacity
							testID="fetch-user-button"
							style={[components.buttonCircle, gutters.marginBottom_16]}
							onPress={() => setCurrentId(Math.ceil(Math.random() * 10 + 1))}
						>
							{isFetching ? (
								<ActivityIndicator />
							) : (
								<ImageVariant
									source={SendImage}
									style={{ tintColor: colors.purple500 }}
								/>
							)}
						</TouchableOpacity>

						<TouchableOpacity
							testID="change-theme-button"
							style={[components.buttonCircle, gutters.marginBottom_16]}
							onPress={() => onChangeTheme()}
						>
							<ImageVariant
								source={ColorsWatchImage}
								style={{ tintColor: colors.purple500 }}
							/>
						</TouchableOpacity>
					</View>
				</View>
			</ScrollView>
		</SafeScreen>
	);
}

export default Home;
