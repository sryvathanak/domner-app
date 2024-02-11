import React, {useState, useEffect} from 'react';
import {VirtualizedList, useWindowDimensions} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';
import {
  NativeBaseProvider,
  Center,
  HStack,
  Text,
  Menu,
  HamburgerIcon,
  Box,
  Input,
  Pressable,
  Flex,
  VStack,
  Badge,
  Image,
  IconButton,
  ScrollView,
  Stack,
  FlatList,
  Icon,
  Heading,
  Avatar,
} from 'native-base';
import {
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  View,
  //Dimensions,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {createItemAsync, fetchItemsAsync} from '../../redux/slice/userSlice';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {Component} from 'react';
import {StatusBar, Dimensions, Animated} from 'react-native';
import Swiper from 'react-native-swiper';
import TopBooking from './service/TopBooking';
import HotelSearch from './service/hotel/HotelSearch';
import AirportSearch from './service/transport/AirportSearch';
import AirportScreen from './service/transport/AirportScreen';
import HotelScreen from './service/hotel/HotelScreen';
import BusScreen from './service/transport/BusScreen';
import TouringScreen from './service/tour/TouringScreen';
import {removeItem} from '../utils/asyncStorage';

//const {width, height} = Dimensions.get('window');
const {width, height} = Dimensions.get('window');
const imageWidth = width * 0.25;

const FirstRoute = () => <TopBooking />;

const SecondRoute = () => <View style={{flex: 1, backgroundColor: '#fff'}} />;
const Bus = () => <BusScreen />;
const AirLine = () => <AirportScreen />;
const Hotel = () => <HotelScreen />;
const Touring = () => <TouringScreen />;
const renderScene = SceneMap({
  a: FirstRoute,
  //  b: SecondRoute,
  c: Bus,
  d: AirLine,
  e: Hotel,
  f: Touring,
});

export default function HomeScreen({route}) {
  const layout = useWindowDimensions();
  // console.log(route?.params);
  const dispatch = useDispatch();
  const [showTabBar, setShowTabBar] = React.useState();
  const [index, setIndex] = React.useState(0);
  const [shouldOverlapWithTrigger] = React.useState(false);
  const [position, setPosition] = React.useState('auto');
  const [searchBarVisible, setSearchBarVisible] = React.useState(true);
  const searchbarHeight = React.useState(new Animated.Value(0))[0];
  const navigation = useNavigation();
  const [myBooking, setMyBooking] = useState();
  const [loading, setLoading] = useState();
  const showSearchBar = () => {
    setSearchBarVisible(true);
    Animated.timing(searchbarHeight, {
      toValue: 40,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const hideSearchBar = () => {
    Animated.timing(searchbarHeight, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start(() => {
      setSearchBarVisible(false);
    });
  };
  const handleNotification = () => {
    navigation.navigate('Notification', {
      screen: 'Notification',
    });
  };
  const [routes] = React.useState([
    {key: 'a', icon: 'home'},
    // {key: 'b', icon: 'train'},
    {key: 'c', icon: 'bus'},
    {key: 'd', icon: 'airplane'},
    {key: 'e', icon: 'hotel', data: route?.params},
    {key: 'f', icon: 'tour'},
  ]);

  const handleSearch = () => {
    navigation.navigate('Search', {
      screen: 'Search',
    });
  };

  const handleLogout = async () => {
    try {
      const action = await dispatch(createItemAsync({endpoint: 'auth/logout'}));
      removeItem('user');
      removeItem('access_token');
      console.log(action);

      if (action.payload.status) {
        navigation.navigate('Login', {
          screen: 'Login',
        });
      }
    } catch (error) {
      console.error(error); // Log the rejection error
      console.log(error.payload); // Log the additional information from the rejection
    }
  };
  const handleProfile = () => {
    navigation.navigate('Profile', {
      screen: 'Profile',
    });
  };

  const handleHistoryBook = () => {
    navigation.navigate('History', {
      screen: 'History',
    });
  };

  const handleMyBooking = () => {
    navigation.navigate('MyBooking', {
      screen: 'MyBooking',
    });
  };
  const handleFavorite = () => {
    navigation.navigate('Favorite', {
      screen: 'Favorite',
    });
  };
  const handleSetting = () => {
    navigation.navigate('Setting', {
      screen: 'Setting',
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const actionResult = await dispatch(
          fetchItemsAsync({
            endpoint: `booking`,
          }),
        );

        if (actionResult.payload.status) {
          setLoading(true);
          setMyBooking(actionResult.payload.total_record);
        }
      } catch (error) {
        console.error('Error dispatching fetchItemsAsync:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  const renderTabBar = props => (
    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
      {props.navigationState.routes.map((route, i) => (
        <TouchableOpacity
          key={i}
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            height: 70,
            borderBottomWidth: 2,

            borderRadius: 1,
            borderBottomColor: index === i ? 'blue' : '#EEEEEE', //'#EDF2F7',
            backgroundColor: index === i ? '#fff' : '#fff',
          }}
          onPress={() => {
            setIndex(i);
            if (i == 0) {
              showSearchBar();
            } else {
              hideSearchBar();
            }
          }}>
          <>
            {route.icon == 'hotel' ? (
              <FontAwesome
                name={route.icon}
                size={30}
                color={index === i ? 'blue' : null}></FontAwesome>
            ) : route.icon == 'tour' ? (
              <MaterialIcons
                name={route.icon}
                size={30}
                color={index === i ? 'blue' : null} //'#4A5568'}
              />
            ) : (
              <Ionicons
                name={route.icon}
                size={30}
                color={index === i ? 'blue' : null} //'#4A5568'}
              />
            )}
          </>
        </TouchableOpacity>
      ))}
    </View>
  );
  return (
    <NativeBaseProvider>
      {/* {index == 0 && ( */}
      <Animated.View>
        {searchBarVisible && (
          <HStack
            bg="white"
            pt={3}
            pb={2}
            justifyContent="space-between"
            alignItems="center"
            w="100%">
            <HStack alignItems="center">
              <Image
                size={12}
                alt="logo"
                source={require('../../screen/assets/images/LOGODOMNER.png')}
              />
              <Text color="gray.500" fontSize="20" fontWeight="bold">
                Domner
              </Text>
            </HStack>
            <HStack>
              <IconButton
                onPress={handleSearch}
                //color={'gray.300'}
                _icon={{
                  color: 'gray.500',
                  as: AntDesign,
                  name: 'search1',
                  size: 'lg',
                }}
                _pressed={{bg: 'white'}}
              />
              <HStack>
                <IconButton
                  onPress={handleNotification}
                  _icon={{
                    color: 'gray.500',
                    as: Ionicons,
                    name: 'notifications',
                    size: 'lg',
                  }}
                  _pressed={{bg: 'white'}}></IconButton>
                <Badge
                  position={'absolute'}
                  rounded={'full'}
                  top={-2}
                  size={'xs'}
                  left={5}
                  colorScheme="info"
                  variant={'solid'}
                  zIndex={2}>
                  <Text fontWeight={'medium'} color={'white'} fontSize={11}>
                    4
                  </Text>
                </Badge>
              </HStack>
              <HStack>
                <IconButton
                  onPress={handleMyBooking}
                  _icon={{
                    color: 'gray.500',
                    as: FontAwesome,
                    name: 'envelope-open-o',
                    size: 'lg',
                  }}
                  _pressed={{bg: 'white'}}
                />
                {loading && (
                  <Badge
                    position={'absolute'}
                    rounded={'full'}
                    top={-2}
                    left={5}
                    colorScheme="info"
                    variant={'solid'}
                    _text={{
                      fontSize: 'xs',
                    }}
                    zIndex={2}>
                    {/* <Text color={'white'} fontSize={'xs'}>
                    2
                  </Text> */}
                    {myBooking}
                  </Badge>
                )}
              </HStack>

              <Menu
                w={width / 2}
                shouldOverlapWithTrigger={shouldOverlapWithTrigger} // @ts-ignore
                placement={position == 'auto' ? undefined : position}
                trigger={triggerProps => {
                  return (
                    <IconButton
                      {...triggerProps}
                      //color={'gray.300'}
                      _icon={{
                        color: 'gray.500',
                        as: MaterialIcons,
                        name: 'more-vert',
                        size: 'lg',
                      }}
                      _pressed={{bg: 'white'}}
                    />
                  );
                }}>
                <Menu.Item
                  onPress={handleProfile}
                  _pressed={{bg: 'coolGray.100'}}>
                  Profile
                </Menu.Item>
                <Menu.Item
                  onPress={handleLogout}
                  _pressed={{bg: 'coolGray.100'}}>
                  Log out
                </Menu.Item>
                <Menu.Item
                  _pressed={{bg: 'coolGray.100'}}
                  onPress={handleHistoryBook}>
                  History Booking
                </Menu.Item>
                <Menu.Item
                  _pressed={{bg: 'coolGray.100'}}
                  onPress={handleFavorite}>
                  My Favorites
                </Menu.Item>
                <Menu.Item
                  _pressed={{bg: 'coolGray.100'}}
                  onPress={handleSetting}>
                  Setting
                </Menu.Item>
              </Menu>
            </HStack>
          </HStack>
        )}
      </Animated.View>
      {/* )} */}
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
        renderTabBar={renderTabBar}
        //style={{padding: 5}}
      />
    </NativeBaseProvider>
  );
}
