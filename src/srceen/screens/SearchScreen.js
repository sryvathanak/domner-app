import React, {useContext, useEffect, useState} from 'react';
import {
  HStack,
  Input,
  IconButton,
  NativeBaseProvider,
  Center,
  Text,
  VStack,
  Spacer,
  Box,
  Avatar,
  Divider,
  Heading,
  Stack,
  Link,
  View,
  ScrollView,
} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {FlatList, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import {fetchItemsAsync} from '../../redux/slice/userSlice';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AuthContext from '../../component/authContext';
export default ({route}) => {
  const dispatch = useDispatch();
  const {
    setSearch,
    setSearchStay,
    setSearchTour,
    setSearchFlightFrom,
    setSearchFlightTo,
    setSearchBusFrom,
    setSearchBusTo,
  } = useContext(AuthContext);
  const {screen, api, type} = route.params;
  const [data, setData] = useState();
  const [keyword, setKeyword] = useState();
  const [from, setFrom] = useState();

  const [to, setTo] = useState();
  const navigation = useNavigation();
  const handleBack = () => {
    if (screen == 'StaySearch') {
      navigation.navigate('Home', {
        screen: 'Home',
      });
    }
    if (screen == 'CreateStay') {
      navigation.navigate('CreateStay', {
        screen: 'CreateStay',
      });
    }
  };
  console.log(api);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const actionResult = await dispatch(
          fetchItemsAsync({
            endpoint: `${api}?keyword=${keyword}&from=${from}&to=${to}`,
          }),
        );
        console.log(actionResult, 'data33333');
        if (actionResult.payload.status) {
          setData(actionResult.payload.data);
        }

        console.log(actionResult.payload);
      } catch (error) {
        console.error('Error dispatching fetchItemsAsync:', error);
      }
    };

    fetchData();
  }, [keyword, dispatch, from, to]);

  const handleBackTo = item => {
    if (screen == 'StaySearch') {
      setSearchStay(item);
      navigation.navigate('Home', {
        screen: 'Home',
        item: item,
      });
    }

    if (screen == 'CreateStay') {
      setSearch(item);
      navigation.navigate('CreateStay', {
        screen: 'CreateStay',
      });
    }

    if (screen == 'Flight') {
      if (type == 'From') setSearchFlightFrom(item);
      if (type == 'To') setSearchFlightTo(item);
      navigation.navigate('Home', {
        screen: 'Home',
        item: item,
      });
    }

    if (screen == 'Bus') {
      if (type == 'From') setSearchBusFrom(item);
      if (type == 'To') setSearchBusTo(item);
      navigation.navigate('Home', {
        screen: 'Home',
        item: item,
      });
    }
  };
  console.log(type);
  const handleSearch = v => {
    if (type == 'From') {
      console.log('from');
      setFrom(v);
      setTo('');
      setKeyword('');
    }
    if (type == 'To') {
      setTo(v);
      setFrom('');
      setKeyword('');
    }
    if (type != 'From' && type != 'To') {
      setKeyword(v);
      setTo('');
      setFrom('');
    }
  };
  return (
    <NativeBaseProvider>
      <View>
        <HStack p={4} space={5}>
          <Link onPress={handleBack}>
            <Ionicons name="arrow-back" marginTop={5} size={30} />
          </Link>
          <Input
            placeholder="Search"
            autoFocus={true}
            variant="rounded"
            focusOutlineColor={'gray.200'}
            width="85%"
            fontSize={16}
            value={type == 'From' ? from : type == 'To' ? to : keyword}
            onChangeText={handleSearch}
          />
        </HStack>
        <Divider bg={'gray.200'} />
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={data}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                handleBackTo(item);
              }}>
              <Box
                borderBottomWidth="1"
                // _dark={{
                //   borderColor: 'muted.50',
                // }}
                borderColor="gray.200"
                // pl={['0', '4']}
                // pr={['0', '5']}
                py="2">
                <HStack space={[4, 3]} justifyContent="space-between" p={3}>
                  <MaterialCommunityIcons name={'map-marker'} size={30} />
                  <VStack>
                    <Text
                      _dark={{
                        color: 'warmGray.50',
                      }}
                      color="coolGray.800"
                      bold>
                      {item.city
                        ? item?.city
                        : type == 'From'
                        ? item?.from
                        : type == 'To'
                        ? item?.to
                        : ''}
                    </Text>
                    <Text
                      color="coolGray.600"
                      _dark={{
                        color: 'warmGray.200',
                      }}>
                      city in {item.country}
                    </Text>
                  </VStack>
                  <Spacer />
                  {/* <Text
                  fontSize="xs"
                  _dark={{
                    color: 'warmGray.50',
                  }}
                  color="coolGray.800"
                  alignSelf="flex-start">
                  {item.timeStamp}
                </Text> */}
                </HStack>
              </Box>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
        />
      </View>
    </NativeBaseProvider>
  );
};
