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
  ChevronLeftIcon,
  IconButton,
  useToast,
  Box,
  Pressable,
  ScrollView,
  FlatList,
  Avatar,
  Image,
  Button,
} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {useContext, useState} from 'react';
import AuthContext from '../../../component/authContext';
import {useDispatch, useSelector} from 'react-redux';
import {createItemAsync} from '../../../redux/slice/userSlice';
export default ({route}) => {
  const navigation = useNavigation();
  const {setIsO} = useContext(AuthContext);
  const dispatch = useDispatch();
  const [account_number, setCardNumber] = useState('');
  const [expired_month, setExpireMonth] = useState();
  const [expired_year, setExpireYear] = useState();
  const [payment_method, setPaymentMethod] = useState();
  const [cvv, setCvv] = useState();
  const [account_name, setCardName] = useState('');
  const {screen} = route.params;
  const handleBack = () => {
    if (screen == 'HotelSearch') {
      setIsO(true);
      navigation.navigate('HotelSearch', {
        screen: 'HotelSearch',
      });
    }
    if (screen == 'MyPayment') {
      navigation.navigate('MyPayment', {
        screen: 'MyPayment',
      });
    }
    if (screen == 'HotelDetail') {
      setIsO(true);
      navigation.navigate('HotelDetail', {
        screen: 'HotelDetail',
      });
    }
  };

  const handleBackTo = async () => {
    const formData = {
      account_number,
      account_name,
      expired_month,
      expired_year,
      cvv,
      payment_method,
    };

    try {
      const action = await dispatch(
        createItemAsync({endpoint: 'payment', item: formData}),
      );
      console.log(action.payload); // Successfully handled response
      if (action.payload.status) {
        if (screen == 'HotelSearch') {
          setIsO(true);
          navigation.navigate('HotelSearch', {
            screen: 'HotelSearch',
          });
        }
        if (screen == 'HotelDetail') {
          setIsO(true);
          navigation.navigate('HotelDetail', {
            screen: 'HotelDetail',
          });
        }
        if (screen == 'MyPayment') {
          navigation.navigate('MyPayment', {
            screen: 'MyPayment',
          });
        }
      }
    } catch (error) {
      console.error(error); // Log the rejection error
      console.log(error.payload); // Log the additional information from the rejection
    }
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
            New Credit Card
          </Text>
        </HStack>
        <ScrollView>
          <Stack space={3} bg={'white'}>
            <View mt={5}>
              <Text alignSelf={'center'}>WE ACCEPT</Text>
            </View>
            <HStack space={3} justifyContent={'center'}>
              <Pressable
                onPress={() => setPaymentMethod('visa')}
                _pressed={{bg: 'primary.100'}}>
                <Image
                  source={require('../../assets/images/icons8-visa-card-48.png')}
                  alt="image1"></Image>
              </Pressable>
              <Pressable
                onPress={() => setPaymentMethod('mastercard')}
                _pressed={{bg: 'primary.100'}}>
                <Image
                  source={require('../../assets/images/icons8-mastercard-48.png')}
                  alt="image3"></Image>
              </Pressable>
              <Pressable
                onPress={() => setPaymentMethod('discover')}
                _pressed={{bg: 'primary.100'}}>
                <Image
                  source={require('../../assets/images/icons8-discover-card-48.png')}
                  alt="image2"></Image>
              </Pressable>
              <Pressable
                onPress={() => setPaymentMethod('paypal')}
                _pressed={{bg: 'primary.100'}}>
                <Image
                  source={require('../../assets/images/icons8-paypal-card-48.png')}
                  alt="image4"></Image>
              </Pressable>
            </HStack>
            <VStack mx={6} mt={5} space={5}>
              <View>
                <Text fontSize={'md'}>Card Number</Text>
                <Input
                  size="xs"
                  placeholder=""
                  value={account_number}
                  onChangeText={v => setCardNumber(v)}
                />
              </View>
              <View>
                <Text fontSize={'md'}>Expiration Date</Text>
                <HStack space={2}>
                  <Input
                    placeholder="MM"
                    width={'1/3'}
                    value={expired_month}
                    onChangeText={v => setExpireMonth(v)}
                  />
                  <Input
                    placeholder="YY"
                    width={'1/3'}
                    value={expired_year}
                    onChangeText={v => setExpireYear(v)}
                  />
                </HStack>
              </View>
              <View>
                <Text fontSize={'md'}>CVV</Text>
                <Input
                  size="xs"
                  placeholder=""
                  value={cvv}
                  onChangeText={v => setCvv(v)}
                />
              </View>
              <View>
                <Text fontSize={'md'}>Cardholder Name</Text>
                <Input
                  size="xs"
                  placeholder=""
                  value={account_name}
                  onChangeText={v => setCardName(v)}
                />
              </View>
              <VStack>
                <Button
                  rounded={'full'}
                  colorScheme={'blue'}
                  opacity={0.7}
                  shadow={5}
                  onPress={handleBackTo}>
                  Add Card
                </Button>
              </VStack>
            </VStack>
          </Stack>
        </ScrollView>
      </View>
    </NativeBaseProvider>
  );
};
