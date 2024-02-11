//import {StatusBar} from 'expo-status-bar';
import React, {useContext, useEffect} from 'react';
import {
  StyleSheet,
  ImageBackground,
  View,
  SectionList,
  SafeAreaView,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {
  Text,
  Heading,
  HStack,
  ScrollView,
  VStack,
  Stack,
  Icon,
  Flex,
  Center,
  Divider,
  Box,
  IconButton,
} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import {
  fetchItemsAsync,
  fetchItemByIdAsync,
} from '../../../redux/slice/userSlice';

const {width, height} = Dimensions.get('window');

export default () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const actionResult = await dispatch(
          fetchItemsAsync({endpoint: 'list-place'}),
        );
        console.log(actionResult.payload);
      } catch (error) {
        console.error('Error dispatching fetchItemsAsync:', error);
      }
    };

    // Call the fetchData function
    fetchData();
  }, [dispatch]);
  const handleSearch = () => {
    navigation.navigate('PlaceSearch', {
      screen: 'PlaceSearch',
    });
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false} bg={'white'}>
      <Heading size="md" ml={5} mt={3}>
        Top City
      </Heading>
      <ScrollView
        bg={'white'}
        nestedScrollEnabled={true}
        showsHorizontalScrollIndicator={false}
        horizontal>
        <HStack space={3.5} ml={5}>
          {data.map(item => (
            <HStack
              key={item.key}

              // flexDirection={'row'}
            >
              <TouchableOpacity>
                <ImageBackground
                  style={{
                    width: width / 2.5,
                    height: height / 4,

                    marginVertical: 10,
                    borderRadius: 10,
                    overflow: 'hidden',
                  }}
                  source={{
                    uri: item.uri,
                  }}>
                  {/* <IconButton
                    alignSelf={'flex-end'}
                    size="xs"
                    m={3}
                    bg={'#fb7185'}
                    rounded={'full'}
                    _icon={{
                      color: 'white',
                      as: Ionicons,
                      name: item.outline == true ? 'heart-outline' : 'heart',
                      size: 'sm',
                    }}
                    _pressed={{bg: 'coolGray.100'}}></IconButton> */}
                  <HStack p={2} alignItems={'flex-end'} flex={1}>
                    <Icon
                      size="md"
                      color="white"
                      as={
                        <MaterialIcons
                          color="white"
                          name="location-on"></MaterialIcons>
                      }></Icon>
                    <Text color={'white'} fontSize={11} fontWeight={'medium'}>
                      {item.text}
                    </Text>
                  </HStack>
                </ImageBackground>
              </TouchableOpacity>
            </HStack>
          ))}
        </HStack>
      </ScrollView>
      <ScrollView
        flex={1}
        bg={'white'}
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}>
        <Heading size="md" ml={5}>
          All City
        </Heading>
        <HStack flexWrap={'wrap'} space={3.5} ml={5}>
          {data.map(item => (
            <HStack
              key={item.key}

              // flexDirection={'row'}
            >
              <TouchableOpacity onPress={handleSearch}>
                <ImageBackground
                  style={{
                    width: width / 3.6,
                    height: 100,

                    marginVertical: 10,
                    borderRadius: 10,
                    overflow: 'hidden',
                  }}
                  source={{
                    uri: item.uri,
                  }}>
                  {/* <IconButton
                    alignSelf={'flex-end'}
                    size="xs"
                    m={2}
                    bg={'#fb7185'}
                    rounded={'full'}
                    _icon={{
                      color: 'white',
                      size: 'xs',
                      as: Ionicons,
                      name: item.outline == true ? 'heart-outline' : 'heart',
                    }}
                    _pressed={{bg: 'coolGray.100'}}></IconButton> */}
                  <HStack p={2} alignItems={'flex-end'} flex={1}>
                    <Icon
                      size="sm"
                      color="white"
                      as={
                        <MaterialIcons
                          color="white"
                          name="location-on"></MaterialIcons>
                      }></Icon>
                    <Text color={'white'} fontSize={11} fontWeight={'medium'}>
                      {item.text}
                    </Text>
                  </HStack>
                </ImageBackground>
              </TouchableOpacity>
            </HStack>
          ))}
        </HStack>
      </ScrollView>
    </ScrollView>
  );
};

const data = [
  {
    key: '134',
    text: 'Seoul',
    uri: 'https://th.bing.com/th/id/OIP.fUKIogPKvfcfnErIhQmMigHaD4?rs=1&pid=ImgDetMain',
    outline: true,
  },
  {
    key: '232',
    text: 'Tokyo',
    uri: 'https://th.bing.com/th/id/OIP.pOqw-SHDhfTGfeRPpab_rwHaEo?rs=1&pid=ImgDetMain',
    outline: true,
  },

  {
    key: '324',
    text: 'Bangkok',
    uri: 'https://th.bing.com/th/id/R.69d4423255b33ab36a93430233fcc6e2?rik=IBzdi3b4y937jw&riu=http%3a%2f%2fwww.travelmarbles.com%2fwp-content%2fuploads%2f2018%2f07%2fbangkok-18-1024x683.jpg&ehk=w80zr7YKkoxLfN%2fAb2bvMQ8C7vxmJaGTUqK7Z6TyH7A%3d&risl=&pid=ImgRaw&r=0',
    outline: false,
  },
  {
    key: '4242',
    text: 'Kompot',
    uri: 'https://th.bing.com/th/id/OIP.jqAM_1lefX1T1wCa-a3zrwHaE8?rs=1&pid=ImgDetMain',
    outline: false,
  },
  {
    key: '5234',
    text: 'Siem Reap',
    uri: 'https://th.bing.com/th/id/R.ab17d1000dd09de1233462e24fe2f15c?rik=WPkAbyAEaLBGAw&pid=ImgRaw&r=0',
    outline: true,
  },
  {
    key: '1343',
    text: 'Seoul',
    uri: 'https://th.bing.com/th/id/OIP.fUKIogPKvfcfnErIhQmMigHaD4?rs=1&pid=ImgDetMain',
    outline: true,
  },
  {
    key: '2323',
    text: 'Tokyo',
    uri: 'https://th.bing.com/th/id/OIP.pOqw-SHDhfTGfeRPpab_rwHaEo?rs=1&pid=ImgDetMain',
    outline: true,
  },

  {
    key: '3246',
    text: 'Bangkok',
    uri: 'https://th.bing.com/th/id/R.69d4423255b33ab36a93430233fcc6e2?rik=IBzdi3b4y937jw&riu=http%3a%2f%2fwww.travelmarbles.com%2fwp-content%2fuploads%2f2018%2f07%2fbangkok-18-1024x683.jpg&ehk=w80zr7YKkoxLfN%2fAb2bvMQ8C7vxmJaGTUqK7Z6TyH7A%3d&risl=&pid=ImgRaw&r=0',
    outline: true,
  },
  {
    key: '42442',
    text: 'Kompot',
    uri: 'https://th.bing.com/th/id/OIP.jqAM_1lefX1T1wCa-a3zrwHaE8?rs=1&pid=ImgDetMain',
    outline: true,
  },
  {
    key: '52434',
    text: 'Siem Reap',
    uri: 'https://th.bing.com/th/id/R.ab17d1000dd09de1233462e24fe2f15c?rik=WPkAbyAEaLBGAw&pid=ImgRaw&r=0',
    outline: true,
  },
  {
    key: '23246',
    text: 'Bangkok',
    uri: 'https://th.bing.com/th/id/R.69d4423255b33ab36a93430233fcc6e2?rik=IBzdi3b4y937jw&riu=http%3a%2f%2fwww.travelmarbles.com%2fwp-content%2fuploads%2f2018%2f07%2fbangkok-18-1024x683.jpg&ehk=w80zr7YKkoxLfN%2fAb2bvMQ8C7vxmJaGTUqK7Z6TyH7A%3d&risl=&pid=ImgRaw&r=0',
    outline: true,
  },
  {
    key: '424242',
    text: 'Kompot',
    uri: 'https://th.bing.com/th/id/OIP.jqAM_1lefX1T1wCa-a3zrwHaE8?rs=1&pid=ImgDetMain',
    outline: true,
  },
  {
    key: '522434',
    text: 'Siem Reap',
    uri: 'https://th.bing.com/th/id/R.ab17d1000dd09de1233462e24fe2f15c?rik=WPkAbyAEaLBGAw&pid=ImgRaw&r=0',
    outline: true,
  },
];
