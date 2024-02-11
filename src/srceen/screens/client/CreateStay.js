import {
  NativeBaseProvider,
  Stack,
  VStack,
  View,
  HStack,
  ChevronDownIcon,
  Icon,
  Input,
  Text,
  AlertDialog,
  Slide,
  ChevronLeftIcon,
  IconButton,
  useToast,
  Box,
  Pressable,
  ScrollView,
  FlatList,
  Avatar,
  Image,
  Select,
  CheckIcon,
  TextArea,
  Button,
} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {useContext, useRef, useState, useEffect} from 'react';

import {useDispatch, useSelector} from 'react-redux';
import {createItemAsync} from '../../../redux/slice/userSlice';
import AuthContext from '../../../component/authContext';
export default ({route}) => {
  const navigation = useNavigation();
  const {search, setSearch} = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState();
  const onClose = () => setIsOpen(false);
  const [isOpenMess, setIsOpenMess] = useState(false);
  const cancelRef = useRef(null);
  const addressValue =
    (search?.country ?? '') +
    ' ' +
    (search?.province ?? '') +
    ' ' +
    (search?.city ?? '') +
    ' ' +
    (search?.district ?? '') +
    ' ' +
    (search?.commune ?? '') +
    ' ' +
    (search?.village ?? '');
  console.log('address', addressValue, search);
  const dispatch = useDispatch();
  const [stayName, setStayName] = useState('');
  const [price, setPrice] = useState();
  const [discount, setDiscount] = useState();
  const [imageHotel, setImageHotel] = useState([]);
  const [star, setStar] = useState();
  const [valueImageHotel, setValueImageHotel] = useState();
  const [valueImageRoom, setValueImageRoom] = useState();
  const [valueOffer, setValueOffer] = useState();
  const [imageRoom, setImageRoom] = useState([]);
  const [policy, setPolicy] = useState();
  const [offer, setOffer] = useState([]);
  const [rule, setRule] = useState();
  const [stayInfo, setStayInfo] = useState();
  const [description, setDescription] = useState();
  const {screen} = route.params;
  const [messageAlert, setMessageAlert] = useState('');
  const scrollViewRef = useRef();
  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({animated: true});
    }
  };

  const handleBack = () => {
    navigation.navigate('Stay', {
      screen: 'Stay',
    });
  };

  const handleSave = async () => {
    const formData = {
      address_id: search?.id,
      name: stayName,
      price: price,
      discount: discount,
      star: star,
      role: rule,
      policy: policy,
      description: description,
      stay_info: stayInfo,
      offers: offer,
      hotel_images: imageHotel,
      room_images: imageRoom,
    };

    try {
      const action = await dispatch(
        createItemAsync({endpoint: 'stay', item: formData}),
      );
      if (action?.payload?.errors) {
        setIsOpen(!isOpen);
        setMessage(action?.payload?.message);
      }
      console.log(action.payload); // Successfully handled response
      if (action.payload.status) {
        setSearch('');
        setMessageAlert('Save data has been successfully.');
        setStayName();
        setDescription();
        setDiscount();
        setPrice();
        setImageHotel();
        setOffer();
        setImageRoom();
        setPolicy();
        setRule();
        setStayInfo();
        setStar();
        setIsOpenMess(true);
        // navigation.navigate('Stay', {
        //   screen: 'Stay',
        // });
        setTimeout(() => {
          setIsOpenMess(false);
        }, 5000);
      }
    } catch (error) {
      console.error(error);
      console.log(error.payload);
    }
  };

  const handleSearch = () => {
    navigation.navigate('Search', {
      screen: 'CreateStay',
      api: 'address',
    });
  };
  const handleAdd = () => {
    if (valueOffer != '') {
      setMessageAlert('Add offer has been successfully.');
      setIsOpenMess(true);
      setOffer(prevState => [...prevState, valueOffer]);
      setValueOffer('');
    }
    setTimeout(() => {
      setIsOpenMess(false);
    }, 5000);
  };

  const handleUploadHotel = () => {
    if (valueImageHotel != '') {
      setMessageAlert('Upload hotel image has been successfully.');
      setIsOpenMess(true);
      setImageHotel(prevState => [...prevState, valueImageHotel]);
      setValueImageHotel('');
    }
    setTimeout(() => {
      setIsOpenMess(false);
    }, 5000);
  };

  const handleUploadRoom = () => {
    if (valueImageRoom != '') {
      setMessageAlert('Upload room image has been successfully.');
      setIsOpenMess(true);
      setImageRoom(prevState => [...prevState, valueImageRoom]);
      setValueImageRoom('');
    }
    setTimeout(() => {
      setIsOpenMess(false);
    }, 5000);
  };

  return (
    <NativeBaseProvider>
      <View bg={'white'}>
        <HStack>
          <IconButton
            onPress={handleBack}
            size="lg"
            _pressed={{bg: 'white'}}
            _icon={{
              color: 'gray.500',
              as: EvilIcons,
              name: 'chevron-left',
              size: '5xl',
            }}></IconButton>
          {/* <Text>{screen}</Text> */}
          <Text
            color="gray.600"
            alignSelf={'center'}
            fontSize={'lg'}
            fontWeight={'medium'}>
            Create Stay
          </Text>
        </HStack>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Stack space={3} bg={'white'}>
            <VStack mx={6} mt={5} space={2}>
              <Text fontSize={'md'}>Stay Name</Text>
              <Input
                size="xs"
                placeholder=""
                value={stayName}
                onChangeText={v => setStayName(v)}
              />

              <Text fontSize={'md'}>Price</Text>
              <Input
                size="xs"
                keyboardType="numeric"
                placeholder=""
                value={price}
                onChangeText={v => setPrice(v)}
              />

              <Text fontSize={'md'}>Discount </Text>
              <Input
                size="xs"
                keyboardType="numeric"
                placeholder=""
                value={discount}
                onChangeText={v => setDiscount(v)}
              />
              <Text fontSize={'md'}>Star </Text>
              <Input
                size="xs"
                keyboardType="numeric"
                placeholder=""
                value={star}
                onChangeText={v => setStar(v)}
              />
              <Text fontSize={'md'}>Address</Text>
              <Input
                w="100%"
                isReadOnly
                value={addressValue}
                InputRightElement={
                  <Button
                    size="xs"
                    rounded="none"
                    w="1/6"
                    h="full"
                    onPress={handleSearch}>
                    <Icon
                      color={'white'}
                      size="md"
                      as={<FontAwesome5 name="search-location" />}
                    />
                  </Button>
                }
              />
              <Text fontSize={'md'}>Upload Image Hotel </Text>
              <Input
                w="100%"
                value={valueImageHotel}
                onChangeText={v => setValueImageHotel(v)}
                InputRightElement={
                  <Button
                    size="xs"
                    rounded="none"
                    w="1/6"
                    h="full"
                    onPress={handleUploadHotel}>
                    Upload
                  </Button>
                }
              />
              <Text fontSize={'md'}>Upload Image Room </Text>
              <Input
                value={valueImageRoom}
                onChangeText={v => setValueImageRoom(v)}
                w="100%"
                InputRightElement={
                  <Button
                    size="xs"
                    rounded="none"
                    w="1/6"
                    h="full"
                    onPress={handleUploadRoom}>
                    Upload
                  </Button>
                }
              />
              <Text fontSize={'md'}>Offers</Text>
              <Input
                w="100%"
                value={valueOffer}
                onChangeText={v => setValueOffer(v)}
                InputRightElement={
                  <Button
                    size="xs"
                    rounded="none"
                    w="1/6"
                    h="full"
                    onPress={handleAdd}>
                    Add
                  </Button>
                }
              />
              <Text fontSize={'md'}>Description</Text>
              <TextArea
                h={20}
                placeholder=""
                w="100%"
                totalLines={10}
                value={description}
                onChangeText={v => setDescription(v)}
              />
              <Text fontSize={'md'}>Policy</Text>
              <TextArea
                h={20}
                placeholder=""
                w="100%"
                totalLines={10}
                value={policy}
                onChangeText={v => setPolicy(v)}
              />
              <Text fontSize={'md'}>Rule</Text>
              <TextArea
                h={20}
                placeholder=""
                w="100%"
                totalLines={10}
                value={rule}
                onChangeText={v => setRule(v)}
              />
              <Text fontSize={'md'}>Stay Info</Text>
              <TextArea
                h={20}
                placeholder=""
                w="100%"
                totalLines={10}
                value={stayInfo}
                onChangeText={v => setStayInfo(v)}
              />
              <Button
                rounded={'full'}
                colorScheme={'blue'}
                opacity={0.7}
                shadow={5}
                onPress={handleSave}>
                Save
              </Button>
              <Text mt={20}></Text>
            </VStack>
          </Stack>
        </ScrollView>
        <AlertDialog
          leastDestructiveRef={cancelRef}
          isOpen={isOpen}
          onClose={onClose}>
          <AlertDialog.Content>
            <AlertDialog.CloseButton />

            <AlertDialog.Body>{message}</AlertDialog.Body>
          </AlertDialog.Content>
        </AlertDialog>
      </View>

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
