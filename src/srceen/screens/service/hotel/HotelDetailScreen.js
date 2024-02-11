import {
  HStack,
  VStack,
  NativeBaseProvider,
  View,
  Image,
  Icon,
  Actionsheet,
  Center,
  useDisclose,
  Box,
  Text,
  Spinner,
  ScrollView,
  CheckIcon,
  AlertDialog,
  Slide,
  InputGroup,
  Input,
  Stack,
  IconButton,
  Modal,
  Pressable,
  FlatList,
  Button,
  Badge,
  Heading,
  Divider,
  Link,
} from 'native-base';
import {
  ImageBackground,
  Dimensions,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {useContext, useState, useEffect, useRef} from 'react';
import {
  fetchItemByIdAsync,
  fetchItemsAsync,
  createItemAsync,
} from '../../../../redux/slice/userSlice';
import {useDispatch} from 'react-redux';
import AuthContext from '../../../../component/authContext';
const {width, height} = Dimensions.get('window');
export default ({route}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {isO, setIsO} = useContext(AuthContext);
  const [loading, setLoading] = useState();
  const [data, setData] = useState();
  const [dataPayment, setDataPayment] = useState();
  const [showModal, setShowModal] = useState(false);
  const [card, setCard] = useState();
  const {Id, screen, formData} = route.params;
  const [cardId, setCardId] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState();
  const onClose = () => setIsOpen(false);
  const [isOpenMess, setIsOpenMess] = useState(false);
  const cancelRef = useRef(null);
  const [messageAlert, setMessageAlert] = useState('');
  const openActionSheet = () => {
    setIsO(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const actionResult = await dispatch(
          fetchItemByIdAsync({
            endpoint: 'stay-info',
            itemId: Id,
          }),
        );
        console.log('Hotel Detail', actionResult.payload);
        if (actionResult?.payload?.status) {
          setLoading(true);
          setData(actionResult?.payload?.data);
          console.log('Hotel Detail Set');
        }
      } catch (error) {
        console.log(error);
        console.error('Error dispatching fetchItemsAsync:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    const fetchDataPayment = async () => {
      try {
        const actionResult = await dispatch(
          fetchItemsAsync({
            endpoint: `payment`,
          }),
        );
        console.log('payment', actionResult?.payload);
        if (actionResult?.payload?.status) {
          setDataPayment(actionResult?.payload?.data);
        }
      } catch (error) {
        console.error('Error dispatching fetchItemsAsync:', error);
      }
    };

    fetchDataPayment();
  }, [dispatch]);

  console.log(dataPayment);
  const closeActionSheet = () => {
    setIsO(false);
  };
  // const data = [
  //   {
  //     id: 1,
  //     uri: [
  //       'https://www.tripsavvy.com/thmb/LBxhI9zMCskX5tpLh8Bvn8QkOIQ=/2121x1414/filters:no_upscale():max_bytes(150000):strip_icc()/angkor-wat-944343802-e45637f850584b51909cf0ab822c1f94.jpg',
  //       'https://nomadicated.com/wp-content/uploads/2023/03/Landmarks-of-Southeast-Asia-6.jpg',
  //     ],
  //     url: [
  //       'https://th.bing.com/th/id/OIP.wHG08GNl3QA-U_6nkbhooAHaEY?w=900&h=532&rs=1&pid=ImgDetMain',
  //       'https://cdn.sweetescape.com/images/cities/siem-reap/cover/3fc9a24c-b6d8-4f58-8eea-b900d182c37a-1920.jpg',
  //       'https://www.greeneratravel.com/userfiles/tour-gallery-3.jpg',
  //     ],
  //     organisation: 'Angkor Hotel',
  //     city: 'Siem Reap',
  //     Price: 325,
  //   },
  // ];
  const handleBack = () => {
    navigation.navigate('HotelSearch', {
      screen: 'HotelSearch',
    });
  };

  const handleCreateCard = () => {
    setIsO(false);
    navigation.navigate('CreditCard', {
      screen: 'HotelDetail',
    });
  };
  const handleClickImage = () => {
    navigation.navigate('HotelDetailImage', {
      screen: 'HotelDetailImage',
    });
  };

  const getPaymentMethodImage = paymentMethod => {
    switch (paymentMethod) {
      case 'visa':
        return require('../../../assets/images/icons8-visa-card-48.png');
      case 'paypal':
        return require('../../../assets/images/icons8-paypal-card-48.png');
      case 'mastercard':
        return require('../../../assets/images/icons8-mastercard-48.png');
      case 'discover':
        return require('../../../assets/images/icons8-discover-card-48.png');
      default:
        return require('../../../assets/images/icons8-cash-48.png');
    }
  };

  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Hello',
      text2: 'This is some something 👋',
    });
  };

  const handleCard = v => {
    setCard(v);
    setCardId(v?.id);
  };

  const handleBooking = async () => {
    try {
      const valueBooking = {
        stay_id: Id,
        payment_id: card?.id,
        room_number: formData?.room_number,
        check_in: formData?.check_in,
        check_out: formData?.check_out,
        member: formData?.member,
        children: formData?.children,
        age: formData?.age,
        total_price: formData?.total_price,
      };

      const action = await dispatch(
        createItemAsync({endpoint: 'booking', item: valueBooking}),
      );

      if (action.payload.status) {
        setIsO(false);
        setMessageAlert('booking has been successfully.');
        setIsOpenMess(true);

        setTimeout(() => {
          setIsOpenMess(false);
        }, 5000);
      }

      if (action.payload.message && !action?.payload?.status) {
        setIsOpen(!isOpen);
        setMessage(action.payload.message);
      }

      if (action?.payload?.errors) {
        setIsOpen(!isOpen);
        setMessage(action?.payload?.message);
      }
    } catch (e) {
      console.log(e);
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
          <View bg={'white'}>
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
                <VStack>
                  <Pressable onPress={handleClickImage}>
                    <HStack space={0.5}>
                      {data?.hotel_images.map((x, i) => (
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
                      {data?.image_rooms.map((x, i) => (
                        <HStack key={i}>
                          {data?.image_rooms.length < 3 ? (
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
                  <Box bg={'white'} width={'100%'} h={height / 8}>
                    <VStack px={5} mt={3}>
                      <HStack space={1}>
                        <Icon
                          size="sm"
                          color="#FFC400"
                          as={<Ionicons name="star" />}></Icon>
                        <Icon
                          size="sm"
                          color="#FFC400"
                          as={<Ionicons name="star" />}></Icon>
                        <Icon
                          size="sm"
                          color="#FFC400"
                          as={<Ionicons name="star" />}></Icon>
                        <Icon
                          size="sm"
                          color="pink.400"
                          as={<Ionicons name="star" />}></Icon>
                      </HStack>
                      <HStack justifyContent={'space-between'}>
                        <Text
                          fontWeight={'medium'}
                          fontSize={18}
                          alignSelf={'center'}>
                          {data?.name}
                        </Text>

                        {/* <Badge
                      rounded={'full'}
                      colorScheme="info"
                      variant={'solid'}> */}
                        {/* <Icon
                        color="white"
                        size="xs"
                        as={<FontAwesome name="heart" />}></Icon> */}
                        <IconButton
                          rounded={'full'}
                          bg={'blue.500'}
                          _icon={{
                            color: 'white',
                            as: FontAwesome,
                            name: 'heart',
                            size: 'sm',
                          }}
                          // _pressed={{bg: 'white'}}
                        />
                        {/* </Badge> */}
                      </HStack>
                      <VStack>
                        <HStack>
                          <Icon
                            size="lg"
                            as={<EvilIcons name="location"></EvilIcons>}></Icon>
                          <Text color="coolGray.500">{data?.address}</Text>
                        </HStack>
                      </VStack>
                    </VStack>
                  </Box>
                  <Divider opacity={0.5} m={5} width={'90%'} />
                  <ScrollView
                    nestedScrollEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    horizontal>
                    <VStack px={5} mt={5}>
                      <HStack space={8}>
                        <VStack space={2}>
                          <IconButton
                            bg={'coolGray.100'}
                            _icon={{
                              color: 'blue.400',
                              as: Feather,
                              name: 'wifi',
                              size: '2xl',
                            }}
                            // _pressed={{bg: 'white'}}
                          />
                          <Text color={'coolGray.500'} textAlign={'center'}>
                            Wifi
                          </Text>
                        </VStack>
                        <VStack space={2}>
                          <IconButton
                            //size="lg"
                            bg={'coolGray.100'}
                            _icon={{
                              color: 'blue.400',
                              as: MaterialIcons,
                              name: 'restaurant',
                              size: '2xl',
                            }}
                            // _pressed={{bg: 'white'}}
                          />
                          <Text color={'coolGray.500'} textAlign={'center'}>
                            Breakfast
                          </Text>
                        </VStack>
                        <VStack space={2}>
                          <IconButton
                            bg={'coolGray.100'}
                            _icon={{
                              color: 'blue.400',
                              as: MaterialIcons,
                              name: 'local-parking',
                              size: '2xl',
                            }}
                            // _pressed={{bg: 'white'}}
                          />
                          <Text color={'coolGray.500'} textAlign={'center'}>
                            Parking
                          </Text>
                        </VStack>
                        <VStack space={2}>
                          <IconButton
                            bg={'coolGray.100'}
                            _icon={{
                              color: 'blue.400',
                              as: MaterialIcons,
                              name: 'bed',
                              size: '2xl',
                            }}
                            // _pressed={{bg: 'white'}}
                          />
                          <Text color={'coolGray.500'} textAlign={'center'}>
                            2 beds
                          </Text>
                        </VStack>
                        <VStack space={2}>
                          <IconButton
                            bg={'coolGray.100'}
                            _icon={{
                              color: 'blue.400',
                              as: Feather,
                              name: 'coffee',
                              size: '2xl',
                            }}
                            // _pressed={{bg: 'white'}}
                          />
                          <Text color={'coolGray.500'} textAlign={'center'}>
                            Coffee
                          </Text>
                        </VStack>
                        <VStack space={2}>
                          <IconButton
                            bg={'coolGray.100'}
                            _icon={{
                              color: 'blue.400',
                              as: MaterialCommunityIcons,
                              name: 'television',
                              size: '2xl',
                            }}
                            // _pressed={{bg: 'white'}}
                          />
                          <Text color={'coolGray.500'} textAlign={'center'}>
                            TV
                          </Text>
                        </VStack>
                        <VStack space={2}>
                          <IconButton
                            bg={'coolGray.100'}
                            _icon={{
                              color: 'blue.400',
                              as: MaterialIcons,
                              name: 'fitness-center',
                              size: '2xl',
                            }}
                            // _pressed={{bg: 'white'}}
                          />
                          <Text color={'coolGray.500'} textAlign={'center'}>
                            Gym
                          </Text>
                        </VStack>
                      </HStack>
                    </VStack>
                  </ScrollView>
                  <Divider opacity={0.5} mx={5} my={8} width={'90%'} />
                  <VStack mx={5} space={2}>
                    <Heading size="md">Description</Heading>
                    <VStack flexWrap="wrap" flexDirection="row">
                      <Text color="coolGray.500" w={'full'}>
                        {data?.description}
                        <Text>
                          <Pressable onPress={() => console.log('ddd')}>
                            <Text color={'blue.500'} underline>
                              Read more
                            </Text>
                          </Pressable>
                        </Text>
                        {/* <Text color={'blue.500'} underline>
                        Read more
                      </Text> */}
                      </Text>
                      {/* <Text color="blue.500">Read more</Text> */}
                    </VStack>
                  </VStack>
                  <Divider opacity={0.5} mx={5} my={8} width={'90%'} />
                  <VStack mx={5} space={2}>
                    <Heading size="md">House Role</Heading>
                    <VStack flexWrap="wrap" flexDirection="row">
                      <Text color="coolGray.500" w={'full'}>
                        {data?.rule}
                      </Text>
                      <Text color="blue.500">Read more</Text>
                    </VStack>
                  </VStack>
                  <VStack mb={50}></VStack>
                </VStack>
              </View>
            </ScrollView>
          </View>
          <View
            bg={'coolGray.100'}
            width={'100%'}
            height={'10%'}
            position={'absolute'}
            px={5}
            bottom={0}>
            <HStack
              justifyContent={'space-between'}
              flex={1}
              alignItems={'center'}>
              <Text color={'red.600'} fontWeight={'medium'} fontSize={'md'}>
                ${data?.price}/night
              </Text>
              <Button
                onPress={openActionSheet}
                w={'1/4'}
                size="sm"
                variant="subtle"
                bg={'blue.500'}
                color={'white'}
                _text={{
                  fontWeight: 'medium',
                  color: 'white',
                }}
                borderRadius={'none'}>
                Book now
              </Button>
            </HStack>
          </View>
          <Actionsheet
            hideDragIndicator
            height={'100%'}
            isOpen={isO}
            onClose={closeActionSheet}
            size="full">
            <Actionsheet.Content
              bg={'white'}
              style={{backgroundColor: 'white'}}>
              <Box w="100%" px={4} justifyContent="center">
                <HStack justifyContent={'space-between'}>
                  <Heading fontSize={'lg'}></Heading>
                  <Text
                    fontWeight={'medium'}
                    color={'blue.500'}
                    fontSize={'lg'}>
                    ${data?.price}
                  </Text>
                </HStack>
              </Box>
              <VStack w="100%">
                <HStack mx={4} space={2}>
                  <Icon
                    size="md"
                    color="coolGray.400"
                    as={
                      <MaterialIcons
                        color="white"
                        name="location-on"></MaterialIcons>
                    }></Icon>
                  <Text color="coolGray.400">{data?.address}</Text>
                </HStack>
                <HStack m={4} space={2}>
                  <AntDesign name="star" size={20} color="#FFC400"></AntDesign>
                  <Text color="coolGray.400">4.8 (3.5k) </Text>
                </HStack>
                <VStack bg={'white'} mt={5} alignItems={'center'}>
                  <Box
                    bg={'white'}
                    rounded={'lg'}
                    width={'90%'}
                    height={120}
                    borderColor="coolGray.200"
                    borderWidth="1"
                    _web={{
                      shadow: 2,
                      borderWidth: 0,
                    }}>
                    <HStack justifyContent={'space-between'} m={3}>
                      <Text fontSize={'md'} fontWeight={'medium'}>
                        Total
                      </Text>
                      <Text fontSize={'md'} fontWeight={'medium'}>
                        Card Address
                      </Text>
                    </HStack>
                    <Text color={'coolGray.500'} alignSelf={'flex-end'} mr={3}>
                      220,KL 05 , Home , USA
                    </Text>
                    <HStack m={3}>
                      <Text fontSize={'md'} fontWeight={'medium'}>
                        ${data?.price}
                      </Text>
                    </HStack>
                  </Box>
                </VStack>
                <Heading fontSize={'md'} m={4}>
                  Payment Method
                </Heading>
                <HStack mx={4} space={4}>
                  <Button
                    _text={{color: 'black', fontWeight: 'medium'}}
                    _icon={{color: 'blue.600'}}
                    leftIcon={
                      <Icon as={Ionicons} name="add-circle" size="sm" />
                    }
                    onPress={handleCreateCard}
                    variant="outline"
                    w={'1/3'}
                    rounded={'full'}>
                    Add Card
                  </Button>
                  <Button
                    onPress={() => setShowModal(true)}
                    _text={{fontWeight: 'medium'}}
                    w={'1/3'}
                    rounded={'full'}
                    colorScheme={'blue'}>
                    CARD
                  </Button>
                  <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                    <Modal.Content width="95%">
                      <Modal.CloseButton />
                      <HStack m={5} space={2}>
                        <Icon
                          color={'blue.300'}
                          size={'lg'}
                          as={<AntDesign name="creditcard"></AntDesign>}></Icon>
                        <Heading fontSize={'md'}>
                          Select Your Card Payment
                        </Heading>
                      </HStack>

                      <Modal.Body>
                        <VStack space={2}>
                          {dataPayment?.map((x, i) => (
                            <VStack key={i}>
                              <Pressable
                                onPress={() => {
                                  handleCard(x);
                                }}>
                                <Box
                                  bg={cardId == x?.id ? 'cyan.100' : 'white'}
                                  rounded={'lg'}
                                  width={'100%'}
                                  height={170}
                                  borderColor="coolGray.200"
                                  borderWidth="1"
                                  _web={{
                                    shadow: 2,
                                    borderWidth: 0,
                                  }}>
                                  <HStack justifyContent={'space-between'}>
                                    <HStack m={3} space={3}>
                                      <View>
                                        <Image
                                          source={getPaymentMethodImage(
                                            x?.payment_method,
                                          )}
                                          alt="image1"></Image>
                                      </View>
                                      <VStack mt={1}>
                                        <Text
                                          color={'blueGray.500'}
                                          fontSize={'md'}
                                          fontWeight={'medium'}>
                                          {x.payment_method
                                            ? x?.payment_method
                                                ?.charAt(0)
                                                ?.toUpperCase() +
                                              x?.payment_method?.slice(1)
                                            : 'Cash'}
                                        </Text>
                                        <Text
                                          color={'blueGray.500'}
                                          fontSize={'md'}
                                          fontWeight={'medium'}>
                                          {x?.account_name}
                                        </Text>
                                        <Text
                                          color={'blueGray.500'}
                                          fontSize={'md'}
                                          fontWeight={'medium'}>
                                          **** **** ****{' '}
                                          {x.account_number.slice(-4)}
                                        </Text>
                                        <Text
                                          color={'blue.400'}
                                          fontSize={'md'}>
                                          Expiry {x?.expired_month}/
                                          {x?.expired_year}
                                        </Text>
                                        <Text
                                          color={'blueGray.400'}
                                          fontSize={'md'}>
                                          CVV {x?.cvv}
                                        </Text>
                                        <Link
                                          _text={{
                                            fontSize: 'md',
                                            _light: {
                                              color: 'darkBlue.600',
                                            },
                                            color: 'darkBlue.600',
                                          }}
                                          isUnderlined={false}
                                          _hover={{
                                            _text: {
                                              _light: {
                                                color: 'cyan.600',
                                              },
                                              color: 'cyan.400',
                                            },
                                          }}>
                                          Edit
                                        </Link>
                                      </VStack>
                                    </HStack>
                                    <Pressable alignSelf={'center'} mr={4}>
                                      <Icon
                                        color={
                                          cardId == x?.id ? 'blue.500' : null
                                        }
                                        size={'md'}
                                        as={
                                          <MaterialCommunityIcons
                                            name={
                                              cardId == x?.id
                                                ? 'check-circle'
                                                : 'checkbox-blank-circle-outline'
                                            }></MaterialCommunityIcons>
                                        }></Icon>
                                    </Pressable>
                                  </HStack>
                                </Box>
                              </Pressable>
                            </VStack>
                          ))}
                          <HStack justifyContent={'flex-end'}>
                            <Button.Group space={2}>
                              <Button
                                variant="ghost"
                                colorScheme="blueGray"
                                onPress={() => {
                                  setCardId(undefined);
                                  setShowModal(false);
                                }}>
                                Cancel
                              </Button>
                              <Button
                                onPress={() => {
                                  setCardId(undefined);
                                  setShowModal(false);
                                }}>
                                Apply
                              </Button>
                            </Button.Group>
                          </HStack>
                        </VStack>
                      </Modal.Body>
                    </Modal.Content>
                  </Modal>
                </HStack>
                <VStack m={4} space={3}>
                  <Text fontWeight={'medium'} fontSize={'md'}>
                    Card Number
                  </Text>
                  <Text ml={2} color={'gray.400'} fontSize={'md'}>
                    {card?.account_number.replace(/(.{4})/g, '$1 ').trim() ??
                      'XXXX XXXX XXXX XXXX'}
                  </Text>
                </VStack>
                <VStack m={4}>
                  <Button
                    rounded={'full'}
                    colorScheme={'blue'}
                    onPress={handleBooking}>
                    Pay Now
                  </Button>
                </VStack>
              </VStack>
            </Actionsheet.Content>
          </Actionsheet>
        </>
      )}
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={onClose}>
        <AlertDialog.Content>
          <AlertDialog.CloseButton />

          <AlertDialog.Body>{message}</AlertDialog.Body>
        </AlertDialog.Content>
      </AlertDialog>

      <Slide in={isOpenMess} placement="top">
        <Box
          w="100%"
          position="absolute"
          p="2"
          borderRadius="xs"
          bg="emerald.100"
          alignItems="center"
          justifyContent="center"
          _dark={{
            bg: 'emerald.200',
          }}
          safeArea>
          <HStack space={2}>
            <CheckIcon
              size="4"
              color="emerald.600"
              mt="1"
              _dark={{
                color: 'emerald.700',
              }}
            />
            <Text
              color="emerald.600"
              textAlign="center"
              _dark={{
                color: 'emerald.700',
              }}
              fontWeight="medium">
              {messageAlert}
            </Text>
          </HStack>
        </Box>
      </Slide>
    </NativeBaseProvider>
  );
};
