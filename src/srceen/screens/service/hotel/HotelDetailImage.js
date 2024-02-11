import {
  NativeBaseProvider,
  ScrollView,
  VStack,
  View,
  IconButton,
  Text,
} from 'native-base';
import {ImageBackground, Dimensions} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
const {width, height} = Dimensions.get('window');
export default () => {
  const navigation = useNavigation();
  const images = [
    'https://th.bing.com/th/id/OIP.S-2ios8bjahnckQkNvkh4wHaD2?rs=1&pid=ImgDetMain',
    'https://th.bing.com/th/id/OIP.vsGQgDhSdQU-XivM0O_UxQHaFU?w=768&h=551&rs=1&pid=ImgDetMain',
    'https://th.bing.com/th/id/OIP.zMJ0q4CvnnFe1Y3XV6B9YgHaFj?w=1600&h=1199&rs=1&pid=ImgDetMain',
    'https://media-cdn.tripadvisor.com/media/photo-s/0b/0e/c3/b2/the-lodge.jpg',
    'https://media-cdn.tripadvisor.com/media/photo-s/0b/0e/c4/8c/the-lodge.jpg',
    'https://th.bing.com/th/id/OIP.ICCJc_qIBIhIwuALmvgeUQHaEj?w=600&h=369&rs=1&pid=ImgDetMain',
    'https://th.bing.com/th/id/OIP.zYD46LAzc1nv4DN6ALoLPgHaFj?w=640&h=480&rs=1&pid=ImgDetMain',
    'https://media-cdn.tripadvisor.com/media/photo-s/15/08/ec/8a/aerial.jpg',
    'https://th.bing.com/th/id/OIP.oSStlLs9n_7nOJCF3-syogHaE8?rs=1&pid=ImgDetMain',
  ];

  const handleBack = () => {
    navigation.navigate('HotelDetail', {
      screen: 'HotelDetail',
    });
  };
  return (
    <NativeBaseProvider>
      <View>
        <IconButton
          position={'absolute'}
          top={0}
          left={0}
          onPress={handleBack}
          _icon={{
            color: 'white',
            as: Ionicons,
            name: 'chevron-back',
            size: 'lg',
          }}
          zIndex={1}
          _pressed={{bg: 'transparent'}}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          {images.map((v, i) => (
            <VStack key={i}>
              <ImageBackground
                style={{
                  width: width,
                  marginBottom: images.length - 1 == i ? 30 : 0,
                  height: height / 2,
                  borderRadius: 10,
                }}
                source={{uri: v}}></ImageBackground>
            </VStack>
          ))}
        </ScrollView>
      </View>
    </NativeBaseProvider>
  );
};
