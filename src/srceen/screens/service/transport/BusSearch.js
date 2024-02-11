import React, {useEffect, useState} from 'react';
import {
  VStack,
  Center,
  NativeBaseProvider,
  IconButton,
  View,
  Text,
  Heading,
  Spinner,
  HStack,
  Image,
  Badge,
  Flex,
  ZStack,
  CheckIcon,
  Spacer,
  Box,
  Stack,
  Avatar,
  Pressable,
  Input,
  Link,
  FlatList,
  Select,
  Icon,
  Button,
} from 'native-base';
import {
  ImageBackground,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {InputGroup} from 'native-base';
import {SliderBox} from 'react-native-image-slider-box';
import {useDispatch} from 'react-redux';
import {fetchItemsAsync} from '../../../../redux/slice/userSlice';
const {width, height} = Dimensions.get('window');

export default ({route}) => {
  const dispatch = useDispatch();
  const [showSearch, setShowSearch] = useState(true);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const {dataUser} = route.params;
  const navigation = useNavigation();
  const handleBack = () => {
    navigation.navigate('Home', {
      screen: 'Home',
    });
  };

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
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

  const now = new Date();

  const dayOfWeek = daysOfWeek[now.getDay()];
  const dayOfMonth = now.getDate().toString().padStart(2, '0');
  const month = months[now.getMonth()];
  const formattedDate = `${dayOfWeek}, ${dayOfMonth} ${month}-${
    daysOfWeek[(now.getDay() + 6) % 7]
  }`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const actionResult = await dispatch(
          fetchItemsAsync({
            endpoint: `bus-info?from=${dataUser?.from}&to=${dataUser?.to}`,
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

  const handlePress = () => {
    // Perform any action on TouchableOpacity press
    console.log('TouchableOpacity pressed!');
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
        <View>
          <VStack bg={'white'}>
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
                            {'\n'}
                            {formattedDate}
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
              <HStack bg={'white'}>
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
                          // <EvilIcons
                          //   size={20}
                          //   justifyContent="center"
                          //   name="chevron-down"
                          // />
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
                        onClose={e => {}}
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
            </Center>
            <View mt={10} bg={'white'}>
              <FlatList
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                data={data}
                renderItem={({item}) => (
                  <TouchableOpacity onPress={() => {}}>
                    <Box
                      borderBottomWidth="1"
                      // _dark={{
                      //   borderColor: 'muted.50',
                      // }}
                      borderColor="gray.200"
                      // pl={['0', '4']}
                      // pr={['0', '5']}
                      py="2">
                      <HStack px={3} justifyContent="space-between">
                        <Avatar
                          size="md"
                          square={false}
                          alt="Avatar"
                          source={{
                            uri: item?.logo,
                          }}
                        />

                        <VStack>
                          <HStack space={'1/5'} justifyContent={'center'}>
                            <Text
                              fontSize={16}
                              _dark={{
                                color: 'warmGray.50',
                              }}
                              color="coolGray.800"
                              bold>
                              {item?.from_time}
                            </Text>
                            <Icon size={'lg'} as={<AntDesign name="swap" />} />
                            <Text
                              fontSize={16}
                              _dark={{
                                color: 'warmGray.50',
                              }}
                              color="coolGray.800"
                              bold>
                              {item?.to_time}
                            </Text>
                          </HStack>
                          <HStack space={'1/5'} justifyContent={'center'}>
                            <Text
                              color="coolGray.600"
                              _dark={{
                                color: 'warmGray.200',
                              }}>
                              {item?.from}
                            </Text>
                            <Text
                              fontSize={10}
                              color="coolGray.600"
                              _dark={{
                                color: 'warmGray.200',
                              }}>
                              {item?.time}
                            </Text>
                            <Text
                              color="coolGray.600"
                              _dark={{
                                color: 'warmGray.200',
                              }}>
                              {item?.to}
                            </Text>
                          </HStack>
                          <HStack justifyContent={'center'}>
                            <Text>{item?.name}</Text>
                          </HStack>
                          <HStack space={4} justifyContent={'space-between'}>
                            <HStack space={1}>
                              <Badge
                                colorScheme="info"
                                _text={{color: 'gray.600'}}>
                                Recommended
                              </Badge>
                              <Icon
                                size="md"
                                color="#FFC400"
                                as={<Ionicons name="star" />}></Icon>
                              <Text>{item?.star}</Text>
                            </HStack>
                            <HStack justifyContent={'flex-end'}>
                              <Text
                                fontSize="sm"
                                fontWeight={'medium'}
                                _dark={{
                                  color: 'warmGray.50',
                                }}
                                color="red.500">
                                USD {item?.price}
                              </Text>
                            </HStack>
                          </HStack>
                        </VStack>

                        <Spacer />

                        {/* <Text
                    fontSize="sm"
                    style={{marginRight: 'auto'}}
                    fontWeight={'medium'}
                    _dark={{
                      color: 'warmGray.50',
                    }}
                    mr={'1/2'}
                    color="red.500"
                    alignSelf="flex-end">
                    USD {item.Price}
                  </Text> */}

                        {/* <VStack>
                    
                    <Badge colorScheme="info" _text={{color: 'gray.600'}}>
                      Cheapest
                    </Badge>
                  </VStack> */}
                      </HStack>
                    </Box>
                  </TouchableOpacity>
                )}
                keyExtractor={item => item.id}
              />
            </View>
          </VStack>
        </View>
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
