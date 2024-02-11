import {
  NativeBaseProvider,
  Stack,
  VStack,
  View,
  HStack,
  ChevronDownIcon,
  Icon,
  Center,
  Heading,
  AspectRatio,
  Image,
  Badge,
  Spacer,
  Text,
  ChevronLeftIcon,
  IconButton,
  Box,
  Pressable,
  ScrollView,
  FlatList,
  Avatar,
} from 'native-base';

import {useNavigation} from '@react-navigation/native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {useState} from 'react';

import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Entypo from 'react-native-vector-icons/Entypo';
import {ImageBackground, TouchableOpacity} from 'react-native';
export default () => {
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.navigate('Home', {
      screen: 'Home',
    });
  };

  const data = [
    {
      key: '134',
      text: 'Seoul',
      uri: 'https://th.bing.com/th/id/OIP.fUKIogPKvfcfnErIhQmMigHaD4?rs=1&pid=ImgDetMain',
      logo: 'https://th.bing.com/th/id/OIP.ySXjdc9Jv6IrsTz2hivMTQHaHZ?rs=1&pid=ImgDetMain',
      price: 450,
      dayNmber: '4 day 3 night',
      person: 20,
      place: ['bangkok', 'kompot', 'siem reap', 'kompong soam'],
      organisation: 'Sakona Travel and Tours',
      outline: false,
      description:
        'Bengaluru (also called Bangalore) is the center of India s high-tech industry. The city is also known for its parks and nightlife',
    },
    {
      key: '232',
      text: 'Tokyo',
      person: 20,
      uri: 'https://th.bing.com/th/id/OIP.pOqw-SHDhfTGfeRPpab_rwHaEo?rs=1&pid=ImgDetMain',
      logo: 'https://th.bing.com/th/id/OIP.ySXjdc9Jv6IrsTz2hivMTQHaHZ?rs=1&pid=ImgDetMain',
      price: 430,
      outline: false,
      dayNmber: '4 day 3 night',
      place: ['bangkok', 'kompot', 'siem reap', 'kompong soam'],
      organisation: 'Sakona Travel and Tours',
      description:
        'Bengaluru (also called Bangalore) is the center of India s high-tech industry. The city is also known for its parks and nightlife',
    },
  ];

  const handleDetial = () => {
    navigation.navigate('TouringDetail', {
      screen: 'TouringDetail',
    });
  };
  return (
    <NativeBaseProvider>
      <View bg={'white'} width={'100%'} height={'10%'}>
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

          <Text
            color="gray.600"
            alignSelf={'center'}
            fontSize={'lg'}
            fontWeight={'medium'}>
            My Favorites
          </Text>
        </HStack>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={({item}) => (
          <TouchableOpacity onPress={handleDetial}>
            <Box alignItems="center" pt={2} bg={'white'}>
              <Box
                width={'95%'}
                rounded="lg"
                // overflow="hidden"
                borderColor="coolGray.200"
                borderWidth="1"
                bg={'white'}
                _dark={{
                  borderColor: 'coolGray.600',
                  backgroundColor: 'gray.700',
                }}
                _web={{
                  shadow: 2,
                  borderWidth: 0,
                }}
                _light={{
                  backgroundColor: 'gray.50',
                }}>
                <Box>
                  <AspectRatio w="100%" ratio={16 / 9}>
                    <ImageBackground
                      source={{
                        uri: item.uri,
                      }}
                      alt="image">
                      <IconButton
                        size="sm"
                        m={2}
                        alignSelf={'flex-end'}
                        bg={'#fb7185'}
                        rounded={'full'}
                        _icon={{
                          color: 'white',
                          size: 'sm',
                          as: Ionicons,
                          name:
                            item.outline == true ? 'heart-outline' : 'heart',
                        }}
                        _pressed={{bg: 'coolGray.100'}}></IconButton>
                    </ImageBackground>
                  </AspectRatio>
                  <HStack>
                    <Center
                      bg="violet.600"
                      _dark={{
                        bg: 'violet.400',
                      }}
                      position="absolute"
                      left="0"
                      bottom="0"
                      px="5"
                      py="1.5">
                      <Text
                        color={'warmGray.50'}
                        fontSize={'xs'}
                        fontWeight={'medium'}>
                        {item.price} USD
                      </Text>
                    </Center>
                  </HStack>
                </Box>
                <Stack p="4" space={3}>
                  <Stack space={2}>
                    <HStack space={2}>
                      <Avatar
                        size="sm"
                        square={false}
                        alt="Avatar"
                        source={{
                          uri: item.logo,
                        }}
                      />
                      <Heading size="sm" mt={2}>
                        {item.organisation}
                      </Heading>
                    </HStack>

                    {/* <Text
                      fontSize="xs"
                      _light={{
                        color: 'violet.500',
                      }}
                      _dark={{
                        color: 'violet.400',
                      }}
                      fontWeight="500"
                      //ml="-0.5"
                      mt="-1">
                      The Silicon Valley of India.
                    </Text> */}
                    <HStack>
                      <Badge colorScheme="info">{item.dayNmber}</Badge>
                    </HStack>
                    <HStack space={1}>
                      {item?.place?.map(x => (
                        <Badge key={item.key + x} colorScheme="warning">
                          {x}
                        </Badge>
                      ))}
                    </HStack>
                    <HStack>
                      <Badge colorScheme="success">
                        <Text color={'primary.500'}>{item.person} person </Text>
                      </Badge>
                    </HStack>
                  </Stack>
                  <Text fontWeight="400">{item.description}</Text>
                  <HStack
                    alignItems="center"
                    space={4}
                    justifyContent="space-between">
                    <HStack alignItems="center">
                      <Text
                        color="coolGray.600"
                        _dark={{
                          color: 'warmGray.200',
                        }}
                        fontWeight="400">
                        6 mins ago
                      </Text>
                    </HStack>
                  </HStack>
                </Stack>
              </Box>
            </Box>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.key}
      />
    </NativeBaseProvider>
  );
};
