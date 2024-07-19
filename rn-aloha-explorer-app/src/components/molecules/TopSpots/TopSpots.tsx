import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

export type TopSpotDataType = {
  id: number;
  name: string;
  location: string;
  description: string;
  imageUrl: string;
};


interface TopSpotsProps {
  topSpots: Array<TopSpotDataType>,
}

const TopSpotItem: React.FC<{ item: TopSpotDataType, index: number }> = ({ item, index }) => {
  if (!item) {
    return <React.Fragment />;
  }
  return (
    <TouchableOpacity onPress={() => Alert.alert('Alert', `Clicked on ${item.name}`)}>
      <View style={styles.item}>
        <Text style={styles.itemText}>{(index + 1).toString()}. {item.name}</Text>
        <Icon name="arrow-forward" size={24} color="#008080" />
      </View>
    </TouchableOpacity>
  );
};

const TopSpots = ({ topSpots }: TopSpotsProps) => (
  <View style={styles.container}>
    <Text style={styles.title}>TopSpots</Text>
    {topSpots.map((item, index) => {
      return <TopSpotItem key={index + (item.id || 1)} item={item} index={index} />;
    })}
  </View>
);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 16,
    color: '#333',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 24,
    marginRight: 16,
    marginBottom: 8,
    borderRadius: 8,
    elevation: 3,
  },
  itemText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#008080'
  },
  separator: {
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  categoryRow: {
    flex: 1,
    justifyContent: 'space-between',
    marginBottom: 10,
  }
});

export default TopSpots;