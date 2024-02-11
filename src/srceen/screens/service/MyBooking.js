import React from 'react';
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
  Avatar,
  Spacer,
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
import {useNavigation} from '@react-navigation/native';
function Example() {
  const navigation = useNavigation();
  const data = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      fullName: 'Aafreen Khan',
      timeStamp: '12:47 PM',
      description:
        'Discounts are price reductions offered by businesses to incentivize customers to make purchases. They are a common marketing strategy used to attract new customers',
      recentText: 'Good Day!',
      timeNmber: '2 hours ago',
      avatarUrl:
        'https://airmundo.com/app/uploads/2019/05/Cambodia-Airways-brand-logo-400x400.jpg',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      fullName: 'Sujitha Mathur',
      description:
        'Discounts are price reductions offered by businesses to incentivize customers to make purchases. They are a common marketing strategy used to attract new customers',
      timeStamp: '11:11 PM',
      recentText: 'Cheer up, there!',
      timeNmber: '2 hours ago',
      avatarUrl:
        'https://airmundo.com/app/uploads/2019/05/Cambodia-Airways-brand-logo-400x400.jpg',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      fullName: 'Anci Barroco',
      description: 'Discounts are price reductions ',
      timeStamp: '6:22 PM',
      recentText: 'Good Day!',
      timeNmber: '2 hours ago',
      avatarUrl:
        'https://airmundo.com/app/uploads/2019/05/Cambodia-Airways-brand-logo-400x400.jpg',
    },
    {
      id: '68694a0f-3da1-431f-bd56-142371e29d72',
      fullName: 'Aniket Kumar',
      description:
        'Discounts are price reductions offered by businesses to incentivize customers to make purchases. They are a common marketing strategy used to attract new customers',
      timeStamp: '8:56 PM',
      recentText: 'All the best',
      timeNmber: '2 hours ago',
      avatarUrl:
        'https://airmundo.com/app/uploads/2019/05/Cambodia-Airways-brand-logo-400x400.jpg',
    },
    {
      id: '28694a0f-3da1-471f-bd96-142456e29d72',
      fullName: 'Kiara',
      timeStamp: '12:47 PM',
      description:
        'Discounts are price reductions offered by businesses to incentivize customers to make purchases. They are a common marketing strategy used to attract new customers Discounts are price reductions offered by businesses to incentivize customers to make purchases. They are a common marketing strategy used to attract new customers',
      recentText: 'I will call today.',
      timeNmber: '2 hours ago',
      avatarUrl:
        'https://airmundo.com/app/uploads/2019/05/Cambodia-Airways-brand-logo-400x400.jpg',
    },
    {
      id: '28694a0f-3da1-471f-bd96-142456e29d721',
      fullName: 'Kiara',
      description:
        'Discounts are price reductions offered by businesses to incentivize customers to make purchases. They are a common marketing strategy used to attract new customers',
      timeStamp: '12:47 PM',
      timeNmber: '2 hours ago',
      recentText: 'I will call today.',
      avatarUrl:
        'https://airmundo.com/app/uploads/2019/05/Cambodia-Airways-brand-logo-400x400.jpg',
    },
    {
      id: '28694a0f-3da1-471f-bd96-142456e29d722',
      fullName: 'Kiara',
      timeStamp: '12:47 PM',
      description:
        'Discounts are price reductions offered by businesses to incentivize customers to make purchases. They are a common marketing strategy used to attract new customers',
      recentText: 'I will call today.',
      timeNmber: '2 hours ago',
      avatarUrl:
        'https://airmundo.com/app/uploads/2019/05/Cambodia-Airways-brand-logo-400x400.jpg',
    },
  ];

  const handleBack = () => {
    navigation.navigate('Home', {
      screen: 'Home',
    });
  };
  return (
    <>
      <VStack bg={'white'} p={4}>
        {/* <IconButton
          onPress={handleBack}
          variant="unstyled"
          _focus={{
            borderWidth: 0,
          }}
          icon={<ArrowBackIcon size={5} />}
          _icon={{
            color: 'coolGray.600',
          }}
        /> */}
        <HStack alignItems={'center'}>
          <Link w={10} onPress={handleBack}>
            <Ionicons name="arrow-back" marginTop={5} size={30} />
          </Link>
          <Text color={'coolGray.600'} fontSize={'md'}>
            My Booking
          </Text>
        </HStack>
      </VStack>
      <View>
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={data}
          renderItem={({item}) => (
            <Pressable
              //_focus={{bg: 'coolGray.200'}}
              _hover={{bg: 'coolGray.200'}}
              _pressed={{bg: 'coolGray.100'}}>
              <Box
                // _dark={{
                //   borderColor: 'muted.50',
                // }}
                bg={'white'}
                my={3}
                mx={3}
                borderColor="gray.200"
                // pl={['0', '4']}
                // pr={['0', '5']}
                py="2">
                <HStack space={[2, 3]} p={3} mr={10}>
                  <Avatar
                    size="md"
                    square={false}
                    alt="Avatar"
                    source={{
                      uri: item.avatarUrl,
                    }}
                  />
                  <VStack>
                    <Text
                      color="coolGray.600"
                      _dark={{
                        color: 'warmGray.200',
                      }}>
                      {item.description}
                    </Text>
                    <Text color={'blue.600'} fontWeight={'medium'}>
                      {item.timeNmber}
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
            </Pressable>
          )}
          keyExtractor={item => item.id}
        />
      </View>
    </>
  );
}

export default () => {
  return (
    <NativeBaseProvider>
      <Example />
    </NativeBaseProvider>
  );
};
