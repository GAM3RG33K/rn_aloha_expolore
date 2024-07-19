import { useEffect } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { CommonActions } from '@react-navigation/native';

import { useTheme } from '@/theme';
import { Brand } from '@/components/molecules';
import { SafeScreen } from '@/components/template';

import type { RootScreenProps } from '@/types/navigation';

function Startup({ navigation }: RootScreenProps<'Startup'>) {
	const { layout, gutters, fonts } = useTheme();

	const { isSuccess, isFetching, isError } = useQuery({
		queryKey: ['startup'],
		queryFn: () => {
			return Promise.resolve(true);
		},
	});

	useEffect(() => {
		if (isSuccess) {
			navigation.dispatch(
				CommonActions.reset({
					index: 0,
					routes: [{ name: 'HomeMain' }],
				}),
			);
		}
	}, [isSuccess]);

	return (
		<SafeScreen>
			<View
				style={[
					layout.flex_1,
					layout.col,
					layout.itemsCenter,
					layout.justifyCenter,
				]}
			>
				<Brand />
				{isFetching && (
					<ActivityIndicator size="large" style={[gutters.marginVertical_24]} />
				)}
				{isError && (
					<Text style={[fonts.size_16, fonts.red500]}>
						{"Something went wrong"}
					</Text>
				)}
			</View>
		</SafeScreen>
	);
}

export default Startup;
