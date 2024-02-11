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
  Divider,
} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useState} from 'react';

export default () => {
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.navigate('Home', {
      screen: 'Home',
    });
  };
  const onNavigateTo = () => {
    navigation.navigate('MyPayment', {
      screen: 'MyPayment',
    });
  };
  return (
    <NativeBaseProvider>
      <View bg={'coolGray.100'} width={'100%'} height={'10%'}>
        <HStack>
          <IconButton
            onPress={handleBack}
            size="lg"
            _pressed={{bg: 'coolGray.100'}}
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
            Setting
          </Text>
        </HStack>
      </View>

      <Stack flex={1} bg={'white'}>
        <Pressable
          width={'100%'}
          height={'10%'}
          justifyContent={'center'}
          onPress={onNavigateTo}>
          <Box>
            <HStack mx={10} alignItems={'center'} space={3}>
              <Icon
                size="xl"
                as={<MaterialIcons name="payment"></MaterialIcons>}></Icon>
              <Text
                textAlign={'center'}
                fontWeight={'medium'}
                fontSize={'md'}
                color="coolGray.500">
                Payment Method
              </Text>
            </HStack>
          </Box>
        </Pressable>
        <Divider />
        <Pressable width={'100%'} height={'10%'} justifyContent={'center'}>
          <Box>
            <HStack mx={10} alignItems={'center'} space={3}>
              <Icon
                size="xl"
                as={<MaterialIcons name="language"></MaterialIcons>}></Icon>
              <Text
                textAlign={'center'}
                fontWeight={'medium'}
                fontSize={'md'}
                color="coolGray.500">
                Language
              </Text>
            </HStack>
          </Box>
        </Pressable>
        <Divider />

        <Pressable width={'100%'} height={'10%'} justifyContent={'center'}>
          <Box>
            <HStack mx={10} alignItems={'center'} space={3}>
              <Icon size="xl" as={<Feather name="phone-call"></Feather>}></Icon>
              <Text
                textAlign={'center'}
                fontWeight={'medium'}
                fontSize={'md'}
                color="coolGray.500">
                Contact Us
              </Text>
            </HStack>
          </Box>
        </Pressable>
        <Divider />
        <Pressable width={'100%'} height={'10%'} justifyContent={'center'}>
          <Box>
            <HStack mx={10} alignItems={'center'} space={3}>
              <Icon size="xl" as={<Feather name="lock"></Feather>}></Icon>
              <Text
                textAlign={'center'}
                fontWeight={'medium'}
                fontSize={'md'}
                color="coolGray.500">
                Privacy & Security
              </Text>
            </HStack>
          </Box>
        </Pressable>
        <Divider />
        <Pressable width={'100%'} height={'10%'} justifyContent={'center'}>
          <Box>
            <HStack mx={10} alignItems={'center'} space={3}>
              <Icon
                size="xl"
                as={<MaterialIcons name="help"></MaterialIcons>}></Icon>
              <Text
                textAlign={'center'}
                fontWeight={'medium'}
                fontSize={'md'}
                color="coolGray.500">
                Help & Support
              </Text>
            </HStack>
          </Box>
        </Pressable>
        <Divider />
        <Pressable width={'100%'} height={'10%'} justifyContent={'center'}>
          <Box>
            <HStack mx={10} alignItems={'center'} space={3}>
              <Icon size="xl" as={<Entypo name="info"></Entypo>}></Icon>
              <Text
                textAlign={'center'}
                fontWeight={'medium'}
                fontSize={'md'}
                color="coolGray.500">
                About Us
              </Text>
            </HStack>
          </Box>
        </Pressable>
        <Divider />
      </Stack>
    </NativeBaseProvider>
  );
};
