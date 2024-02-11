import {
  NativeBaseProvider,
  ScrollView,
  VStack,
  FlatList,
  Icon,
  Box,
  Text,
  HStack,
  Pressable,
  IconButton,
} from 'native-base';

import {
  ImageBackground,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
const {width, height} = Dimensions.get('window');
export default () => {
  const navigation = useNavigation();
  const data = {
    id: 'sfsdfdsfdgdfg',

    placeImage:
      'https://th.bing.com/th/id/OIP.923yciX9qFwRfnLapSvFHAHaE8?rs=1&pid=ImgDetMain',
    place: 'Pop Street',
    placeDetail: [
      {
        name: 'Angkor wat temple',
        image:
          'https://cdn.fodors.com/wp-content/uploads/2018/10/HERO_Angkor101_dreamstime_xxl_79474210.jpg',
        viewer: '20,234',
        description: 'This is angkor wat template',
        star: 3,
      },
      {
        name: 'Angkor wat temple',
        image:
          'https://cdn.fodors.com/wp-content/uploads/2018/10/HERO_Angkor101_dreamstime_xxl_79474210.jpg',
        viewer: '20,234',
        description: 'This is angkor wat template',
        star: 2,
      },
      {
        name: 'Angkor wat temple',
        image:
          'https://cdn.fodors.com/wp-content/uploads/2018/10/HERO_Angkor101_dreamstime_xxl_79474210.jpg',
        viewer: '20,234',
        description: 'This is angkor wat template',
        star: 4,
      },
      {
        name: 'Angkor wat temple',
        image:
          'https://cdn.fodors.com/wp-content/uploads/2018/10/HERO_Angkor101_dreamstime_xxl_79474210.jpg',
        viewer: '20,234',
        description: 'This is angkor wat template',
        star: 4,
      },
      {
        name: 'Angkor wat temple',
        image:
          'https://cdn.fodors.com/wp-content/uploads/2018/10/HERO_Angkor101_dreamstime_xxl_79474210.jpg',
        viewer: '20,234',
        description: 'This is angkor wat template',
        star: 4,
      },
    ],
  };

  const handleBack = () => {
    navigation.navigate('Home', {
      screen: 'Home',
    });
  };
  return (
    <NativeBaseProvider>
      <VStack>
        <Pressable
          position={'absolute'}
          top={0}
          zIndex={1}
          left={0}
          onPress={handleBack}>
          <Icon
            mx={3}
            my={3}
            rounded={'full'}
            bg={'gray.500'}
            size={'xl'}
            color={'white'}
            as={<SimpleLineIcons name="arrow-left-circle" />}></Icon>
        </Pressable>
        <ScrollView showsVerticalScrollIndicator={false}>
          <VStack>
            <VStack>
              <ImageBackground
                style={styles.imageBackground}
                source={{
                  uri: data.placeImage,
                }}></ImageBackground>
            </VStack>
            <VStack mt={5} space={'16'} mx={5}>
              {data.placeDetail.map((item, i) => (
                <Pressable key={i} onPress={() => console.log('aa')}>
                  <HStack space={3}>
                    <ImageBackground
                      source={{uri: item.image}}
                      style={{
                        width: width / 2.5,
                        height: height / 5,
                        borderRadius: 8,
                        // borderBottomEndRadius: 15, // Adjust the value to control the roundness
                        // borderBottomStartRadius: 15,
                        overflow: 'hidden',
                        shadowColor: '#000',
                        shadowOffset: {
                          width: 0,
                          height: 2,
                        },
                        shadowOpacity: 0.4,
                        shadowRadius: 4,
                        elevation: 5,
                      }}>
                      <IconButton
                        size="sm"
                        m={2}
                        alignSelf={'flex-end'}
                        bg={'#fb7185'}
                        rounded={'full'}
                        _icon={{
                          color: 'white',
                          size: 'sm',
                          as: Ionicons,
                          name:
                            item.outline == true ? 'heart-outline' : 'heart',
                        }}
                        _pressed={{bg: 'coolGray.100'}}></IconButton>
                    </ImageBackground>
                    <VStack space={3}>
                      <Text fontSize={'md'} fontWeight={'medium'}>
                        {item.name}
                      </Text>
                      <HStack>
                        {Array(item.star)
                          .fill()
                          .map((_, index) => (
                            <Icon
                              alignSelf={'center'}
                              color={'gray.400'}
                              key={index}
                              as={<MaterialIcons name="circle" />}
                            />
                          ))}
                        <Text ml={3}>{item.viewer}</Text>
                      </HStack>
                      <Text>{item.description}</Text>
                    </VStack>
                  </HStack>
                </Pressable>
              ))}
            </VStack>
          </VStack>
        </ScrollView>
      </VStack>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    width: width,
    height: height / 2.5,
    // borderBottomEndRadius: 15, // Adjust the value to control the roundness
    // borderBottomStartRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5,
    //alignItems: 'flex-start',
  },
});
