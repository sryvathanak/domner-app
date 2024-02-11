import {
  NativeBaseProvider,
  Stack,
  VStack,
  View,
  HStack,
  ChevronDownIcon,
  Icon,
  Text,
  ChevronLeftIcon,
  IconButton,
  Box,
  Pressable,
  ScrollView,
  FlatList,
  Avatar,
} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {useState} from 'react';

export default () => {
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.navigate('Home', {
      screen: 'Home',
    });
  };

  const info = [
    {
      id: 1,
      during: 'Jun 2023',
      show: false,
      place: [
        {
          logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU',
          booking_date: '12-Jun-2023',
          organisation: 'Angkor Hotel',
        },
        {
          logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU',
          booking_date: '14-Jun-2023',
          organisation: 'Angkor Hotel',
        },
      ],
    },
    {
      id: 2,
      during: 'May 2023',
      show: false,
      place: [
        {
          logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU',
          booking_date: '12-May-2023',
          organisation: 'Angkor Hotel',
        },
        {
          logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU',
          booking_date: '14-May-2023',
          organisation: 'Angkor Hotel',
        },
      ],
    },
    {
      id: 3,
      show: false,
      during: 'March 2023',
      place: [
        {
          logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU',
          booking_date: '12-March-2023',
          organisation: 'Angkor Hotel',
        },
        {
          logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU',
          booking_date: '14-March-2023',
          organisation: 'Angkor Hotel',
        },
      ],
    },
    {
      id: 4,
      show: false,
      during: 'November 2023',
      place: [
        {
          logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU',
          booking_date: '12-November-2023',
          organisation: 'Angkor Hotel',
        },
        {
          logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU',
          booking_date: '14-November-2023',
          organisation: 'Angkor Hotel',
        },
      ],
    },
    {
      id: 5,
      show: false,
      during: 'July 2023',
      place: [
        {
          logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU',
          booking_date: '12-July-2023',
          organisation: 'Angkor Hotel',
        },
        {
          logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU',
          booking_date: '14-July-2023',
          organisation: 'Angkor Hotel',
        },
      ],
    },
  ];

  const [data, setData] = useState(info);
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
            History Booking
          </Text>
        </HStack>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={({item}) => (
          <VStack space={3} mt={3} mx={3}>
            <Box>
              <Pressable
                onPress={() => {
                  setData(prevList => {
                    const newList = [...prevList];
                    newList.forEach((x, i) => {
                      console.log(x);
                      if (item.id == x.id) x.show = !x.show;
                    });
                    return newList;
                  });
                }}>
                <HStack bg={'white'} p={4} justifyContent={'space-between'}>
                  <Text
                    color="coolGray.600"
                    fontWeight={'medium'}
                    fontSize={'md'}>
                    {item.during}
                  </Text>
                  <Icon
                    size="xl"
                    as={
                      <Ionicons
                        name={
                          item.show == false ? 'chevron-down' : 'chevron-up'
                        }></Ionicons>
                    }></Icon>
                </HStack>
              </Pressable>
              {item.show && (
                <VStack>
                  <Box borderColor="coolGray.200" borderWidth="1">
                    <VStack m={3} space={4}>
                      {item.place.map((x, i) => (
                        <HStack key={i} space={3}>
                          <Avatar
                            size="md"
                            square={true}
                            alt="Avatar"
                            source={{
                              uri: x.logo,
                            }}></Avatar>
                          <VStack>
                            <Text>{x.booking_date}</Text>
                            <Text>{x.organisation}</Text>
                          </VStack>
                          <Text style={{marginLeft: 'auto'}}>$44</Text>
                        </HStack>
                      ))}
                    </VStack>
                  </Box>
                </VStack>
              )}
            </Box>
          </VStack>
        )}
        keyExtractor={item => item.id}
      />

      {/* <Pressable>
          <VStack>
            {data.map((d, i) => {
              <HStack>
                <Box key={i} width={'100%'} height={'10%'} bg={'blue.400'}>
                  <HStack>
                    <Text>{d.during}</Text>
                  </HStack>
                </Box>
              </HStack>;
            })}
          </VStack>
        </Pressable> */}
    </NativeBaseProvider>
  );
};
