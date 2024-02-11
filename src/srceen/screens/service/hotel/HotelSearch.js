import React, {useState, useEffect, useContext, useRef} from 'react';
import {
  VStack,
  Center,
  Skeleton,
  Spinner,
  NativeBaseProvider,
  IconButton,
  View,
  Radio,
  Modal,
  FormControl,
  Text,
  HStack,
  InputLeftAddon,
  InputRightAddon,
  Image,
  Divider,
  Actionsheet,
  useDisclose,
  Box,
  Flex,
  ZStack,
  CheckIcon,
  Stack,
  Pressable,
  Input,
  Link,
  FlatList,
  Select,
  AlertDialog,
  Slide,
  Icon,
  Button,
  ScrollView,
  Heading,
} from 'native-base';
import {
  ImageBackground,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {InputGroup} from 'native-base';
import {SliderBox} from 'react-native-image-slider-box';
import {useDispatch} from 'react-redux';
import {
  fetchItemsAsync,
  createItemAsync,
} from '../../../../redux/slice/userSlice';
import AuthContext from '../../../../component/authContext';
const {width, height} = Dimensions.get('window');

export default ({route}) => {
  const {searchData} = route.params;
  const {isO, setIsO} = useContext(AuthContext);
  const dispatch = useDispatch();
  const [showSearch, setShowSearch] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState();
  const [styleBg, setStyleBg] = useState(0);
  const [item, setItem] = useState();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [dataPayment, setDataPayment] = useState();
  const [cardId, setCardId] = useState();
  const [card, setCard] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState();
  const onClose = () => setIsOpen(false);
  const [isOpenMess, setIsOpenMess] = useState(false);
  const cancelRef = useRef(null);
  const [messageAlert, setMessageAlert] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const actionResult = await dispatch(
          fetchItemsAsync({
            endpoint: `stay-info?keyword=${searchData?.keyword}`,
          }),
        );

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

  const handleBack = () => {
    navigation.navigate('Home', {
      screen: 'Home',
    });
  };
  const openActionSheet = d => {
    setIsO(true);
    setItem(d);
  };

  const closeActionSheet = () => {
    setIsO(false);
  };
  const handleCreateCard = () => {
    setIsO(false);
    navigation.navigate('CreditCard', {
      screen: 'HotelSearch',
    });
  };

  const renderStars = rating => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<AntDesign key={i} name="star" size={16} color="#FFC400" />);
    }
    return stars;
  };

  const handleDetailHotel = item => {
    const formData = {
      stay_id: item?.id,
      payment_id: card?.id,
      room_number: searchData?.room,
      check_in: searchData?.date_from,
      check_out: searchData?.date_to,
      member: searchData?.audults,
      children: searchData?.children,
      age: searchData?.ages,
      total_price: item?.price,
    };
    navigation.navigate('HotelDetail', {
      screen: 'HotelDetail',
      Id: item.id,
      formData: formData,
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

  const handleCard = v => {
    setCard(v);
    setCardId(v?.id);
  };

  const handleBooking = async () => {
    const formData = {
      stay_id: item?.id,
      payment_id: card?.id,
      room_number: searchData?.room,
      check_in: searchData?.date_from,
      check_out: searchData?.date_to,
      member: searchData?.audults,
      children: searchData?.children,
      age: searchData?.ages,
      total_price: item?.price,
    };

    try {
      const action = await dispatch(
        createItemAsync({endpoint: 'booking', item: formData}),
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
          <View>
            <VStack>
              <Center>
                <ImageBackground
                  style={styles.imageBackground}
                  source={{
                    uri: 'https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/angkor-wat-silhouette-of-temple-gloria-and-richard-maschmeyer.jpg',
                  }}>
                  <HStack>
                    <VStack>
                      <IconButton
                        onPress={handleBack}
                        _icon={{
                          color: 'white',
                          as: Ionicons,
                          name: 'chevron-back',
                          size: 'lg',
                        }}
                        _pressed={{bg: 'transparent'}}
                      />
                    </VStack>
                    <HStack>
                      {showSearch ? (
                        <>
                          <IconButton
                            onPress={() => setShowSearch(false)}
                            //color={'gray.300'}
                            // ml={5}
                            mt={8}
                            _icon={{
                              color: 'white',
                              as: AntDesign,
                              name: 'search1',
                              size: 'md',
                            }}
                            _pressed={{bg: 'transparent'}}
                          />
                          <Text
                            mt={12}
                            color={'white'}
                            fontSize={14}
                            fontWeight={'normal'}>
                            Siem Reap
                            <Text fontSize={11} fontWeight={'light'}>
                              {' '}
                              {'\n'}Monday, 29 Jul-Sun
                            </Text>
                          </Text>
                        </>
                      ) : (
                        <>
                          <Input
                            placeholder="Search"
                            InputLeftElement={
                              <Icon
                                as={<AntDesign name="search1" />}
                                size={5}
                                ml="4"
                                color="muted.400"
                              />
                            }
                            _focus={{bg: 'white'}}
                            autoFocus={true}
                            variant="rounded"
                            bg={'white'}
                            mt={10}
                            height={'50%'}
                            focusOutlineColor={'gray.200'}
                            width="90%"
                            onPressIn={() => console.log('123')}
                            onPressOut={() => console.log('123456')}
                            onFocus={() => console.log('hi')}
                            fontSize={10}
                            onBlur={() => setShowSearch(true)}
                          />
                        </>
                      )}
                    </HStack>
                  </HStack>
                </ImageBackground>
                <HStack>
                  <ZStack
                    justifyContent={'center'}
                    alignItems={'center'}
                    style={{zIndex: 1}}
                    reversed={false}>
                    <Center>
                      <Flex
                        rounded={20}
                        direction="row"
                        bg={'white'}
                        shadow={5}
                        justifyContent={'cneter'}
                        alignItems={'center'}>
                        <Select
                          placeholder="Filter"
                          w={width / 3.2}
                          color={'gray.500'}
                          textAlign={'center'}
                          dropdownIcon={
                            <Icon
                              as={<EvilIcons name="chevron-down" />}
                              size={5}
                              mr={'10'}
                            />
                          }
                          borderColor={'transparent'}>
                          <Select.Item label="UX Research" value="ux" />
                          <Select.Item label="Web Development" value="web" />
                          <Select.Item
                            label="Cross Platform Development"
                            value="cross"
                          />
                          <Select.Item label="UI Designing" value="ui" />
                          <Select.Item
                            label="Backend Development"
                            value="backend"
                          />
                        </Select>
                        <Select
                          placeholder="Price"
                          color={'gray.500'}
                          textAlign={'center'}
                          w={width / 3.2}
                          dropdownIcon={
                            <Icon
                              as={<EvilIcons name="chevron-down" />}
                              size={5}
                              mr={'10'}
                            />
                          }
                          borderColor={'transparent'}>
                          <Select.Item label="UX Research" value="ux" />
                          <Select.Item label="Web Development" value="web" />
                          <Select.Item
                            label="Cross Platform Development"
                            value="cross"
                          />
                          <Select.Item label="UI Designing" value="ui" />
                          <Select.Item
                            label="Backend Development"
                            value="backend"
                          />
                        </Select>
                        <Select
                          color={'gray.500'}
                          textAlign={'center'}
                          placeholder="Sort"
                          w={width / 3.2}
                          onClose={e => {
                            console.log(e);
                          }}
                          dropdownIcon={
                            <Icon
                              as={<EvilIcons name="chevron-down" />}
                              size={5}
                              mr={'10'}
                            />
                          }
                          borderColor={'transparent'}>
                          <Select.Item label="UX Research" value="ux" />
                          <Select.Item label="Web Development" value="web" />
                          <Select.Item
                            label="Cross Platform Development"
                            value="cross"
                          />
                          <Select.Item label="UI Designing" value="ui" />
                          <Select.Item
                            label="Backend Development"
                            value="backend"
                          />
                        </Select>
                      </Flex>
                    </Center>
                  </ZStack>
                </HStack>

                <FlatList
                  showsVerticalScrollIndicator={false}
                  mt={10}
                  data={data}
                  renderItem={({item}) => (
                    <VStack>
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
                            height: height / 3.3,
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
                            mr={'1/5'}>
                            {item.price}$
                          </Text>
                        </HStack>
                        <HStack ml={3} space={1}>
                          {renderStars(item.star)}
                        </HStack>
                        <HStack>
                          <Text ml={3} w={width / 2}>
                            {item.description}
                          </Text>
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
                          <Button
                            onPress={() => {
                              openActionSheet(item);
                            }}
                            mb={5}
                            mr={3}
                            _text={{
                              color: 'white',
                              fontSize: 'sm',
                              fontWeight: 'medium',
                            }}
                            w={width / 3.8}
                            size="sm"
                            variant="subtle"
                            color={'white'}
                            borderRadius={'none'}
                            bg={'blue.500'}>
                            Book now
                          </Button>
                        </HStack>
                      </VStack>
                    </VStack>
                  )}
                  keyExtractor={item => item.id}
                />
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
                        <Heading fontSize={'lg'}>{item?.name}</Heading>
                        <Text
                          fontWeight={'medium'}
                          color={'blue.500'}
                          fontSize={'lg'}>
                          ${item?.price}
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
                        <Text color="coolGray.400">{item?.address}</Text>
                      </HStack>
                      <HStack m={4} space={2}>
                        <AntDesign
                          name="star"
                          size={20}
                          color="#FFC400"></AntDesign>
                        <Text color="coolGray.400">4.8 (3.5k) </Text>
                      </HStack>
                      <VStack bg={'white'} mt={5} alignItems={'center'}>
                        <Box
                          bg={'white'}
                          rounded={'lg'}
                          width={'90%'}
                          height={120}
                          borderColor="coolGray.100"
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
                          <Text
                            color={'coolGray.500'}
                            alignSelf={'flex-end'}
                            mr={3}>
                            220,KL 05 , Home , USA
                          </Text>
                          <HStack m={3}>
                            <Text fontSize={'md'} fontWeight={'medium'}>
                              ${item?.price}
                            </Text>
                          </HStack>
                        </Box>
                      </VStack>
                      <Heading fontSize={'md'} m={4}>
                        Payment Method
                      </Heading>
                      <HStack mx={4} space={4}>
                        <Button
                          onPress={handleCreateCard}
                          _text={{color: 'black', fontWeight: 'medium'}}
                          _icon={{color: 'blue.600'}}
                          leftIcon={
                            <Icon as={Ionicons} name="add-circle" size="sm" />
                          }
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
                        <Modal
                          isOpen={showModal}
                          onClose={() => setShowModal(false)}>
                          <Modal.Content width="95%">
                            <Modal.CloseButton />
                            <HStack m={5} space={2}>
                              <Icon
                                color={'blue.300'}
                                size={'lg'}
                                as={
                                  <AntDesign name="creditcard"></AntDesign>
                                }></Icon>
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
                                        bg={
                                          cardId == x?.id ? 'cyan.100' : 'white'
                                        }
                                        rounded={'lg'}
                                        width={'100%'}
                                        height={170}
                                        borderColor="coolGray.200"
                                        borderWidth="1"
                                        _web={{
                                          shadow: 2,
                                          borderWidth: 0,
                                        }}>
                                        <HStack
                                          justifyContent={'space-between'}>
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
                                          <Pressable
                                            alignSelf={'center'}
                                            mr={4}>
                                            <Icon
                                              color={
                                                cardId == x?.id
                                                  ? 'blue.500'
                                                  : null
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
                        <Text
                          fontWeight={'medium'}
                          fontSize={'md'}
                          color={'gray.500'}>
                          {card?.account_number
                            .replace(/(.{4})/g, '$1')
                            .trim() ?? 'XXXX XXXX XXXX XXXX'}
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
              </Center>
            </VStack>
          </View>

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
        </>
      )}
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    width: width,
    height: height * 0.25,
    borderBottomEndRadius: 15, // Adjust the value to control the roundness
    borderBottomStartRadius: 15,
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
