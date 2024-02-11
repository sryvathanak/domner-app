import {
  NativeBaseProvider,
  VStack,
  HStack,
  Text,
  Link,
  Center,
  Heading,
  Spinner,
  Pressable,
  Box,
  View,
  Image,
  Fab,
  Icon,
  FlatList,
} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {fetchItemsAsync} from '../../redux/slice/userSlice';
import {useDispatch} from 'react-redux';
export default () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [styleBg, setStyleBg] = useState(0);
  const [loading, setLoading] = useState();
  const [data, setData] = useState();
  const handleBack = () => {
    navigation.navigate('Setting', {
      screen: 'Setting',
    });
  };
  const onNavigateTo = () => {
    navigation.navigate('CreditCard', {
      screen: 'MyPayment',
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const actionResult = await dispatch(
          fetchItemsAsync({
            endpoint: `payment`,
          }),
        );
        console.log('dsfdf', actionResult?.payload);
        if (actionResult?.payload?.status) {
          setLoading(true);
          setData(actionResult?.payload?.data);
        }
      } catch (error) {
        console.error('Error dispatching fetchItemsAsync:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  const getPaymentMethodImage = paymentMethod => {
    switch (paymentMethod) {
      case 'visa':
        return require('../assets/images/icons8-visa-card-48.png');
      case 'paypal':
        return require('../assets/images/icons8-paypal-card-48.png');
      case 'mastercard':
        return require('../assets/images/icons8-mastercard-48.png');
      case 'discover':
        return require('../assets/images/icons8-discover-card-48.png');
      default:
        return require('../assets/images/icons8-cash-48.png');
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
          <VStack bg={'blue.200'} paddingY={5}>
            <HStack alignItems={'center'}>
              <Link w={10} onPress={handleBack}>
                <Ionicons name="arrow-back" size={30} />
              </Link>
              <Text color={'coolGray.600'} fontSize={'md'}>
                My Payment
              </Text>
            </HStack>
          </VStack>

          <VStack mt={4} justifyContent={'center'} justifyItems={'center'}>
            <FlatList
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              data={data}
              renderItem={({item}) => (
                <Box
                  justifyContent={'center'}
                  justifyItems={'center'}
                  alignSelf={'center'}
                  bg={styleBg == 1 ? 'cyan.100' : 'white'}
                  rounded={'lg'}
                  width={'95%'}
                  height={150}
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
                          source={getPaymentMethodImage(item.payment_method)}
                          alt="image1"></Image>
                      </View>
                      <VStack mt={1}>
                        <Text
                          color={'blueGray.500'}
                          fontSize={'md'}
                          fontWeight={'medium'}>
                          {item.payment_method
                            ? item?.payment_method?.charAt(0)?.toUpperCase() +
                              item?.payment_method?.slice(1)
                            : 'Cash'}
                        </Text>
                        <Text
                          color={'blueGray.500'}
                          fontSize={'md'}
                          fontWeight={'medium'}>
                          {item?.account_name}
                        </Text>
                        <Text
                          color={'blueGray.500'}
                          fontSize={'md'}
                          fontWeight={'medium'}>
                          **** **** {item.account_number.slice(-4)}
                        </Text>
                        <Text color={'blue.400'} fontSize={'md'}>
                          Expiry {item?.expired_month}/{item?.expired_year}
                        </Text>
                        <Text color={'blueGray.400'} fontSize={'md'}>
                          CVV {item?.cvv}
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
                  </HStack>
                </Box>
              )}
            />
          </VStack>
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
