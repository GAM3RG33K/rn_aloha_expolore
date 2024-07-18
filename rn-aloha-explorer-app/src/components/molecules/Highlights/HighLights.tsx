import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';



export type HighlightDataType = {
  id: number;
  title: string;
  description: string;
  image: string;
};

interface HighlightsProps {
  highlights: Array<HighlightDataType>,
}

const HighlightItem: React.FC<{ item: HighlightDataType }> = ({ item }) => {
  if (!item) {
    return <React.Fragment />;
  }
  return (
    <View style={styles.highlightItem}>
      <TouchableOpacity onPress={() => Alert.alert('Alert', `Clicked on ${item.title}`)}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const Highlights = ({ highlights }: HighlightsProps) => (
  <View style={styles.container}>
    <Text style={styles.header}>Highlights</Text>
    <FlatList
      data={highlights}
      renderItem={({ item }) => <HighlightItem item={item} />}
      keyExtractor={(item) => item.title}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
    />
  </View>
);



const styles = StyleSheet.create({
  container: {
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  highlightItem: {
    width: 300,
    marginRight: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  textContainer: {
    padding: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
});

export default Highlights;