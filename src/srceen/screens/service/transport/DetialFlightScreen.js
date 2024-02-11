import React, {useState, useEffect} from 'react';
import {
  Stack,
  Alert,
  IconButton,
  HStack,
  VStack,
  Box,
  FlatList,
  View,
  CloseIcon,
  Link,
  Text,
  Spinner,
  Avatar,
  Spacer,
  Heading,
  Badge,
  ScrollView,
  Divider,
  Icon,
  ArrowBackIcon,
  Center,
  NativeBaseProvider,
  Pressable,
} from 'native-base';
import {TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch} from 'react-redux';
import {fetchItemByIdAsync} from '../../../../redux/slice/userSlice';
import {useNavigation} from '@react-navigation/native';
export default function ({route}) {
  const navigation = useNavigation();
  const [item, setItem] = useState();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const {Id} = route.params;
  const text = 'Hello\nworld! This is a sample text.';
  const words = text.split(' ');
  const wordCount = words.length;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const actionResult = await dispatch(
          fetchItemByIdAsync({
            endpoint: 'flight-info',
            itemId: Id,
          }),
        );
        console.log('Flight Detail', actionResult.payload);
        if (actionResult?.payload?.status) {
          setLoading(true);
          setItem(actionResult?.payload?.data);
          console.log('Flight Detail Set');
        }
      } catch (error) {
        console.log(error);
        console.error('Error dispatching fetchItemsAsync:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const now = new Date();
  const dayOfWeek = daysOfWeek[now.getDay()];
  const month = months[now.getMonth()];
  const dayOfMonth = now.getDate();
  const year = now.getFullYear();
  const formattedDate = `${dayOfWeek}, ${month} ${dayOfMonth}, ${year}`;

  let modifiedText = text;
  if (wordCount === 5) {
    modifiedText = text.replace('\n', ` `);
  }
  const v = modifiedText;
  const [showText, setShowText] = useState(false);
  const handleBack = () => {
    navigation.navigate('AirportSearch', {
      screen: 'AirportSearch',
    });
  };
  return (
    <NativeBaseProvider>
      <>
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
            <VStack bg={'white'} p={4}>
              <HStack alignItems={'center'} space={2}>
                <Link w={10} onPress={handleBack}>
                  <Ionicons name="arrow-back" marginTop={5} size={30} />
                </Link>
                <Text color={'coolGray.600'} fontSize={'md'}>
                  {item?.from}
                </Text>
                <Icon size={'lg'} as={<AntDesign name="swap" />} />
                <Text color={'coolGray.600'} fontSize={'md'}>
                  {item?.to}
                </Text>
              </HStack>
            </VStack>
            <ScrollView>
              <VStack m={5} space={10}>
                <VStack space={3}>
                  <Pressable>
                    <HStack>
                      <Badge colorScheme="info" _text={{color: 'blue.400'}}>
                        Depart
                      </Badge>
                      <Text>{formattedDate}</Text>
                      <Divider
                        thickness="1"
                        mx="2"
                        orientation="vertical"></Divider>
                      <Text>{item?.time}</Text>
                    </HStack>
                    <HStack mx={4}>
                      <VStack justifyContent={'space-between'}>
                        <Text fontSize={'md'} fontWeight={'medium'}>
                          {item?.from_date}
                        </Text>
                        <Text fontSize={'md'} fontWeight={'medium'}>
                          {item?.to_date}
                        </Text>
                      </VStack>
                      <Divider
                        rounded={'full'}
                        thickness="5"
                        mx="2"
                        orientation="vertical"
                        mt={2}></Divider>
                      <VStack space={1}>
                        <Text fontSize={'md'} fontWeight={'medium'}>
                          {item?.airport_from}
                        </Text>
                        <HStack space={1}>
                          <Avatar
                            size="xs"
                            square={false}
                            alt="Avatar"
                            source={{
                              uri: item?.logo,
                            }}
                          />
                          <Text color={'coolGray.500'}>{item?.name}</Text>
                        </HStack>
                        <HStack space={1}>
                          <Icon
                            size={'sm'}
                            as={<MaterialIcons name="bolt" />}
                          />
                          <Icon size={'sm'} as={<Ionicons name="wifi" />} />
                          <Icon
                            size={'sm'}
                            as={<Entypo name="folder-video" />}
                          />
                          <Icon
                            size={'sm'}
                            as={<MaterialIcons name="restaurant" />}
                          />
                          <Divider
                            thickness="1"
                            alignSelf={'center'}
                            mx="2"
                            h={4}
                            orientation="vertical"></Divider>
                          <Text color={'coolGray.500'}>
                            {item?.airplane_name}
                          </Text>
                          <Divider
                            thickness="1"
                            alignSelf={'center'}
                            mx="2"
                            h={4}
                            orientation="vertical"></Divider>
                          <Text color={'coolGray.500'}>
                            Punctuality: {item?.punctuality}
                          </Text>
                        </HStack>
                        <HStack>
                          <Text fontSize={'sm'} color={'yellow.600'}>
                            Overnight flight
                          </Text>
                        </HStack>

                        <Text fontSize={'md'} fontWeight={'medium'}>
                          {item?.airport_to}
                        </Text>
                      </VStack>
                    </HStack>
                  </Pressable>
                </VStack>
                <VStack space={3}>
                  <Pressable onPress={() => {}}>
                    <HStack>
                      <Badge colorScheme="info" _text={{color: 'blue.400'}}>
                        Return
                      </Badge>
                      <Text>{formattedDate}</Text>
                      <Divider
                        thickness="1"
                        mx="2"
                        orientation="vertical"></Divider>
                      <Text>{item?.time}</Text>
                    </HStack>
                    <HStack mx={4}>
                      <VStack justifyContent={'space-between'}>
                        <Text fontSize={'md'} fontWeight={'medium'}>
                          {item?.from_date}
                        </Text>
                        <Text fontSize={'md'} fontWeight={'medium'}>
                          {item?.to_date}
                        </Text>
                      </VStack>
                      <Divider
                        rounded={'full'}
                        thickness="5"
                        mx="2"
                        orientation="vertical"
                        mt={2}></Divider>
                      <VStack space={1}>
                        <Text fontSize={'md'} fontWeight={'medium'}>
                          {item?.airport_from}
                        </Text>
                        <HStack space={1}>
                          <Avatar
                            size="xs"
                            square={false}
                            alt="Avatar"
                            source={{
                              uri: item?.logo,
                            }}
                          />
                          <Text color={'coolGray.500'}>{item?.name}</Text>
                        </HStack>
                        <HStack space={1}>
                          <Icon
                            size={'sm'}
                            as={<MaterialIcons name="bolt" />}
                          />
                          <Icon size={'sm'} as={<Ionicons name="wifi" />} />
                          <Icon
                            size={'sm'}
                            as={<Entypo name="folder-video" />}
                          />
                          <Icon
                            size={'sm'}
                            as={<MaterialIcons name="restaurant" />}
                          />
                          <Divider
                            thickness="1"
                            alignSelf={'center'}
                            mx="2"
                            h={4}
                            orientation="vertical"></Divider>
                          <Text color={'coolGray.500'}>
                            {item?.airplane_name}
                          </Text>
                          <Divider
                            thickness="1"
                            alignSelf={'center'}
                            mx="2"
                            h={4}
                            orientation="vertical"></Divider>
                          <Text color={'coolGray.500'}>
                            Punctuality: {item?.punctuality}
                          </Text>
                        </HStack>
                        <HStack>
                          <Text fontSize={'sm'} color={'yellow.600'}>
                            Overnight flight
                          </Text>
                        </HStack>

                        <Text fontSize={'md'} fontWeight={'medium'}>
                          {item?.airport_to}
                        </Text>
                      </VStack>
                    </HStack>
                  </Pressable>
                </VStack>
                <VStack>
                  <Box
                    //bg={'white'}
                    rounded={'lg'}
                    width={'100%'}
                    //height={100}
                    borderColor="coolGray.300"
                    borderWidth="1"
                    _web={{
                      shadow: 2,
                      borderWidth: 0,
                    }}>
                    <VStack m={3}>
                      <HStack space={2}>
                        <Icon
                          alignSelf={'center'}
                          size={'sm'}
                          as={<Octicons name="info" />}
                        />
                        <Text>Know Before You Go</Text>
                      </HStack>
                      <HStack justifyContent={'space-between'}>
                        <Text color={'gray.500'} fontSize={'sm'}>
                          {!showText
                            ? 'According to information from the office \nwebsite of the government of the Repblic...'
                            : v}
                        </Text>
                        <Pressable onPress={() => setShowText(!showText)}>
                          <Icon
                            size={'xl'}
                            as={
                              <EvilIcons
                                name={!showText ? 'chevron-down' : 'chevron-up'}
                              />
                            }></Icon>
                        </Pressable>
                      </HStack>
                    </VStack>
                  </Box>
                </VStack>
              </VStack>
            </ScrollView>
          </>
        )}
      </>
    </NativeBaseProvider>
  );
}
