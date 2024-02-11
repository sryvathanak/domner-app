import {
  NativeBaseProvider,
  HStack,
  Image,
  Text,
  IconButton,
  Badge,
  Menu,
  FlatList,
  Spinner,
  Heading,
  Center,
  VStack,
  View,
  Fab,
  Link,
  Icon,
  Button,
} from 'native-base';
import {useState, useEffect, Dimensions} from 'react';
import {useNavigation} from '@react-navigation/native';
import {SliderBox} from 'react-native-image-slider-box';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch} from 'react-redux';
import {fetchItemsAsync, createItemAsync} from '../../../redux/slice/userSlice';
import {getItem, removeItem} from '../../utils/asyncStorage';
export default ({route}) => {
  //const {client} = route?.params;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [loading, setLoading] = useState();
  const [position, setPosition] = useState('auto');
  const [shouldOverlapWithTrigger] = useState(false);
  const [booking, setBooking] = useState();
  const [data, setData] = useState();
  const [client, setClient] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const c = await getItem('client');
        console.log('sddssdsdsd', c?.name);
        setClient(c);
        const actionResult = await dispatch(
          fetchItemsAsync({
            endpoint: `stay`,
          }),
        );
        console.log(actionResult);
        if (actionResult.payload.status) {
          setLoading(true);
          setData(actionResult.payload.data);
        }
      } catch (error) {
        console.error('Error dispatching fetchItemsAsync:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  const onNavigateTo = () => {
    navigation.navigate('CreateStay', {});
  };
  const handleDetailHotel = item => {
    navigation.navigate('HotelDetail', {
      screen: 'HotelDetail',
      Id: item.id,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const actionResult = await dispatch(
          fetchItemsAsync({
            endpoint: `booking-client`,
          }),
        );

        if (actionResult.payload.status) {
          setBooking(actionResult.payload.total_record);
        }
      } catch (error) {
        console.error('Error dispatching fetchItemsAsync:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  const renderStars = rating => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<AntDesign key={i} name="star" size={16} color="#FFC400" />);
    }
    return stars;
  };

  const handleLogout = async () => {
    try {
      const action = await dispatch(
        createItemAsync({endpoint: 'client/logout'}),
      );
      removeItem('client');
      removeItem('client_access_token');
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
  return (
    <NativeBaseProvider>
      {!loading && (
        <Center flex={1} px="3">
          <HStack space={2} justifyContent="center">
            <Spinner accessibilityLabel="Loading posts" size={'sm'} />
            <Heading color="primary.500" fontSize="md">
              Loading...
            </Heading>
          </HStack>
        </Center>
      )}
      {loading && (
        <>
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
                source={require('../../../screen/assets/images/LOGODOMNER.png')}
              />
              <Text color="gray.500" fontSize="20" fontWeight="bold">
                {client?.name ?? 'Domner'}
              </Text>
            </HStack>
            <HStack>
              <HStack>
                <IconButton
                  // onPress={handleNotification}
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
                    {booking}
                  </Text>
                </Badge>
              </HStack>
              <Menu
                w={200}
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
                  //onPress={handleProfile}
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
                  //onPress={handleSetting}
                >
                  Change Password
                </Menu.Item>
              </Menu>
            </HStack>
          </HStack>
          <View bg={'white'}>
            <FlatList
              showsVerticalScrollIndicator={false}
              mt={10}
              data={data}
              renderItem={({item}) => (
                <VStack space={3}>
                  <HStack>
                    <SliderBox
                      images={item.hotel_images}
                      resizeMethod={'resize'}
                      resizeMode={'cover'}
                      paginationBoxStyle={{
                        position: 'absolute',
                        bottom: 0,
                        padding: 0,
                        alignItems: 'center',
                        alignSelf: 'center',
                        justifyContent: 'center',
                        paddingVertical: 10,
                      }}
                      dotStyle={{
                        width: 10,
                        height: 10,
                        borderRadius: 10,
                        marginHorizontal: 0,
                        padding: 0,
                        margin: 0,
                        backgroundColor: 'rgba(128, 128, 128, 0.92)',
                      }}
                      ImageComponentStyle={{
                        //borderRadius: 10,
                        width: '94%',
                        height: 200,
                        //marginTop: 5,
                      }}></SliderBox>
                  </HStack>

                  <VStack>
                    <HStack ml={3} justifyContent={'space-between'}>
                      <Text fontSize={18} fontWeight={'bold'}>
                        {' '}
                        {item.name}
                      </Text>
                      <Text
                        fontSize={18}
                        fontWeight={'bold'}
                        // mr={7}
                        mr={3}>
                        {item.price}$
                      </Text>
                    </HStack>
                    <HStack ml={3} space={1}>
                      {renderStars(item.star)}
                    </HStack>
                    <HStack>
                      <Text ml={3}>{item.description}</Text>
                    </HStack>
                    <HStack justifyContent={'space-between'}>
                      <Link
                        ml={3}
                        onPress={() => {
                          handleDetailHotel(item);
                        }}
                        _text={{
                          fontSize: 'sm',

                          color: 'blue.700',
                        }}
                        _hover={{
                          _text: {
                            _light: {
                              color: 'blue.600',
                            },
                            color: 'blue.600',
                          },
                        }}>
                        View Detail
                      </Link>
                      <Link
                        mr={10}
                        onPress={() => {
                          handleDetailHotel(item);
                        }}
                        _text={{
                          fontSize: 'sm',

                          color: 'blue.700',
                        }}
                        _hover={{
                          _text: {
                            _light: {
                              color: 'blue.600',
                            },
                            color: 'blue.600',
                          },
                        }}>
                        Edit
                      </Link>
                    </HStack>
                  </VStack>
                </VStack>
              )}
              keyExtractor={item => item.id}
            />
          </View>
          <Fab
            onPress={onNavigateTo}
            renderInPortal={false}
            shadow={2}
            size="sm"
            icon={<Icon color="white" as={AntDesign} name="plus" size="sm" />}
          />
        </>
      )}
    </NativeBaseProvider>
  );
};
