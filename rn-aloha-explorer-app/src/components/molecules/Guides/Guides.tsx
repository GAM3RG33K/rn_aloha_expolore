import { contactGuide } from '@/services/data';
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, Alert, Dimensions, ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const GUIDE_ITEM_WIDTH = Dimensions.get('window').width * 0.9;
const GUIDE_ITEM_HIGHT = Dimensions.get('window').height * 0.25;

export type GuideDataType = {
  id: number;
  name: string;
  since: number;
  image: string;
};

interface GuidesProps {
  guides: Array<GuideDataType>,
}

const GuideItem: React.FC<{ item: GuideDataType }> = ({ item }) => {

  const [isContacting, setIsContacting] = useState(false);
  if (!item) {
    return <React.Fragment />;
  }
  return (
    <View style={styles.item}>
      <View style={styles.itemColumn}>
        <View style={styles.guideInfo}>
          <Text style={styles.guideTitle}>{item.name}</Text>
          <View style={styles.spacer} />
          <Text style={styles.guideDescription}>Guide Since {item.since}</Text>
        </View>
        <TouchableOpacity style={styles.contactButton} onPress={
          async () => {
            const name = 'John Deer';
            const destination = 'Maui';
            const date = new Date().toISOString();


            setIsContacting(true);
            setTimeout(async () => {

              const response = await contactGuide(item.id.toString());

              console.log("contactGuide: ", JSON.stringify(response));
              if (response.status === 200) {
                Alert.alert("Success", response.data);
              } else {
                Alert.alert("Failed", `Failed to contact guide, Response error: ${response.data}`);
              }

              setIsContacting(false);
            }, 1500);
          }}>
          {isContacting ? <ActivityIndicator color="#008080" size="small" /> : <Text style={styles.contactButtonText}>Contact</Text>}
        </TouchableOpacity>
      </View>
      <Image
        source={{ uri: item.image }}
        style={styles.guideImage}
      />
    </View>
  );
};

const Guides = ({ guides }: GuidesProps) => (
  <View style={styles.container}>
    <Text style={styles.title}>Travel Guide</Text>
    <FlatList
      data={guides}
      renderItem={({ item }) => <GuideItem item={item} />}
      keyExtractor={(item) => item.id.toString()}
      horizontal
      showsHorizontalScrollIndicator={false}
      snapToAlignment="start"
      snapToInterval={GUIDE_ITEM_WIDTH + styles.item.marginRight}
      decelerationRate="fast"
    />
  </View>
);



const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 40,
  },
  spacer: {
    height: 12,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: 'white',
    padding: 24,
    marginRight: 16,
    marginBottom: 8,
    borderRadius: 8,
    width: GUIDE_ITEM_WIDTH,
    height: GUIDE_ITEM_HIGHT,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemColumn: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 16,
    color: '#333',
  },
  guideImage: {
    width: GUIDE_ITEM_WIDTH * 0.25,
    height: GUIDE_ITEM_WIDTH * 0.25,
    borderRadius: 8,
  },
  guideInfo: {
    paddingHorizontal: 12,
  },
  guideTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#001A10',
  },
  guideDescription: {
    fontSize: 16,
    fontWeight: '400',
    color: '#001A10',
  },
  contactButton: {
    backgroundColor: 'white',
    borderColor: '#008080',
    borderWidth: 1,
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 12,
    marginVertical: 24,
    borderRadius: 8,
  },
  contactButtonText: {
    color: '#008080',
    fontSize: 16,
    fontWeight: '700',
    paddingHorizontal: 16,
  },
});

export default Guides;