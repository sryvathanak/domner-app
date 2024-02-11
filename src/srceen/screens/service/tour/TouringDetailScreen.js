import {
  HStack,
  VStack,
  NativeBaseProvider,
  View,
  Image,
  Text,
  ScrollView,
  IconButton,
  Pressable,
} from 'native-base';
import {
  ImageBackground,
  Dimensions,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
const {width, height} = Dimensions.get('window');
export default () => {
  const navigation = useNavigation();
  const data = [
    {
      id: 1,
      uri: [
        'https://www.tripsavvy.com/thmb/LBxhI9zMCskX5tpLh8Bvn8QkOIQ=/2121x1414/filters:no_upscale():max_bytes(150000):strip_icc()/angkor-wat-944343802-e45637f850584b51909cf0ab822c1f94.jpg',
        'https://nomadicated.com/wp-content/uploads/2023/03/Landmarks-of-Southeast-Asia-6.jpg',
      ],
      url: [
        'https://th.bing.com/th/id/OIP.wHG08GNl3QA-U_6nkbhooAHaEY?w=900&h=532&rs=1&pid=ImgDetMain',
        'https://cdn.sweetescape.com/images/cities/siem-reap/cover/3fc9a24c-b6d8-4f58-8eea-b900d182c37a-1920.jpg',
        'https://www.greeneratravel.com/userfiles/tour-gallery-3.jpg',
      ],
    },
  ];
  const handleBack = () => {
    navigation.navigate('Home', {
      screen: 'Home',
    });
  };

  const handleClickImage = () => {
    navigation.navigate('TourDetailImage', {
      screen: 'TourDetailImage',
    });
  };
  return (
    <NativeBaseProvider>
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
        <View>
          {data.map(item => (
            <VStack key={item.id}>
              <Pressable onPress={handleClickImage}>
                <HStack space={0.5}>
                  {item?.uri.map((x, i) => (
                    <HStack key={i}>
                      <ImageBackground
                        style={{
                          width: width / 2,
                          height: height / 5,

                          borderRadius: 10,
                        }}
                        alt="My Awesome Image"
                        source={{
                          uri: x,
                        }}></ImageBackground>
                    </HStack>
                  ))}
                </HStack>
                <HStack space={0.5}>
                  {item?.url.map((x, i) => (
                    <HStack key={x}>
                      {item.url.length < 3 ? (
                        <ImageBackground
                          style={{
                            width: width / 2,
                            height: height / 5,

                            borderRadius: 10,
                          }}
                          alt="My Awesome Image"
                          source={{
                            uri: x,
                          }}></ImageBackground>
                      ) : (
                        <ImageBackground
                          style={{
                            width: width / 3,
                            height: height / 5,
                            justifyContent: 'center',

                            borderRadius: 10,
                          }}
                          alt="My Awesome Image"
                          source={{
                            uri: x,
                          }}>
                          {i == 2 && (
                            <Text
                              color={'white'}
                              fontSize={'md'}
                              fontWeight={'medium'}
                              textAlign={'center'}>
                              + 12
                            </Text>
                          )}
                        </ImageBackground>
                      )}
                    </HStack>
                  ))}
                </HStack>
              </Pressable>
            </VStack>
          ))}
        </View>
      </ScrollView>
    </NativeBaseProvider>
  );
};
