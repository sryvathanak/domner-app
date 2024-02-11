import {
  Text,
  View,
  FlatList,
  Box,
  HStack,
  Center,
  VStack,
  Stack,
  Heading,
  AspectRatio,
  Image,
  Icon,
  IconButton,
  Badge,
  Avatar,
  Spacer,
} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {ImageBackground, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import {
  createItemAsync,
  fetchItemsAsync,
} from '../../../../redux/slice/userSlice';
//import imageFile from '../../../../storage/upload/images';

export default function TouringScreen() {
  const navigation = useNavigation();
  const [keyword, setKeyword] = useState();
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const [outline, setOutline] = useState(true);
  //const [Id, setId] = useState();
  const path =
    '/C:/Users/User/Documents/domner-app/domner/src/storage/upload/images';
  //const [localImagePath, setLocalImagePath] = useState(null);
  const imageName = '1706521123.png';
  // useEffect(() => {
  //   // Assuming `item.imageName` contains the image file name stored in the database
  //   const imageName = '1706521123.png';

  //   // Construct the local file path based on your storage structure
  //   const relativePath = `${path}/${imageName}`;
  //   const localFilePath = RNFS.DocumentDirectoryPath + relativePath;

  //   // Check if the file exists
  //   RNFS.exists(localFilePath)
  //     .then(exists => {
  //       if (exists) {
  //         setLocalImagePath(localFilePath);
  //       } else {
  //         console.warn('Image not found:', localFilePath);
  //       }
  //     })
  //     .catch(error => {
  //       console.error('Error checking file existence:', error);
  //     });
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const actionResult = await dispatch(
          fetchItemsAsync({
            endpoint: `tour-info`,
          }),
        );
        console.log('dsfdf', actionResult.payload);
        setData(actionResult.payload.data);
      } catch (error) {
        console.error('Error dispatching fetchItemsAsync:', error);
      }
    };

    fetchData();
  }, [dispatch]);
  // const data = [
  //   {
  //     key: '134',
  //     text: 'Seoul',
  //     uri: 'https://th.bing.com/th/id/OIP.fUKIogPKvfcfnErIhQmMigHaD4?rs=1&pid=ImgDetMain',
  //     logo: 'https://th.bing.com/th/id/OIP.ySXjdc9Jv6IrsTz2hivMTQHaHZ?rs=1&pid=ImgDetMain',
  //     price: 450,
  //     dayNmber: '4 day 3 night',
  //     person: 20,
  //     place: ['bangkok', 'kompot', 'siem reap', 'kompong soam'],
  //     organisation: 'Sakona Travel and Tours',
  //     outline: true,
  //     description:
  //       'Bengaluru (also called Bangalore) is the center of India s high-tech industry. The city is also known for its parks and nightlife',
  //   },
  // ];
  // const localImagePath = require('C:Users/User/Documents/domner-api/domner-api/storage/app/tours');
  const handleDetial = () => {
    navigation.navigate('TouringDetail', {
      screen: 'TouringDetail',
    });
  };

  const handleFavorite = async item => {
    const Id = {
      trip_id: item.id,
    };
    console.log(Id);
    try {
      const action = await dispatch(
        createItemAsync({endpoint: 'favorite', item: Id}),
      );

      console.log(action.payload.status); // Successfully handled response
    } catch (error) {
      console.error(error); // Log the rejection error
      console.log(error.payload); // Log the additional information from the rejection
    }
  };
  return (
    <View bg={'white'}>
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
                        uri: item.profile_tour,
                      }}
                      onError={error =>
                        console.error(
                          'Image load error:',
                          error.nativeEvent.error,
                        )
                      }
                      alt="image">
                      <IconButton
                        onPress={() => {
                          handleFavorite(item);
                        }}
                        size="sm"
                        m={2}
                        alignSelf={'flex-end'}
                        bg={'#fb7185'}
                        rounded={'full'}
                        _icon={{
                          color: 'white',
                          size: 'sm',
                          as: Ionicons,
                          name: outline == true ? 'heart-outline' : 'heart',
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
                          uri: item.profile_tour,
                        }}
                      />

                      <Heading size="sm" mt={2}>
                        {item.company_name}
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
                      <Badge colorScheme="info">{item.day}</Badge>
                    </HStack>
                    <HStack space={1}>
                      {item?.places?.map(x => (
                        <Badge key={item.id + x + 1} colorScheme="warning">
                          {x}
                        </Badge>
                      ))}
                    </HStack>
                    <HStack>
                      <Badge colorScheme="success">
                        <Text color={'primary.500'}>
                          {item?.member} person{' '}
                        </Text>
                      </Badge>
                    </HStack>
                  </Stack>
                  <Text fontWeight="400">{item?.description}</Text>
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
                        {item?.post_time}
                      </Text>
                    </HStack>
                  </HStack>
                </Stack>
              </Box>
            </Box>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
}
