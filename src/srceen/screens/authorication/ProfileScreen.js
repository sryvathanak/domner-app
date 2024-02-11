import React, {useContext, useEffect, useState} from 'react';
import {
  Input,
  Stack,
  Center,
  NativeBaseProvider,
  Icon,
  Text,
  Pressable,
  View,
  Spinner,
  Heading,
  ArrowBackIcon,
  IconButton,
  Button,
  Link,
  HStack,
  Avatar,
  ScrollView,
} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import User from 'react-native-vector-icons/EvilIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {useNavigation} from '@react-navigation/native';
import {removeItem} from '../../utils/asyncStorage';
import {useDispatch} from 'react-redux';
import {
  fetchItemsAsync,
  createItemAsync,
  updateItemAsync,
  editItemAsync,
} from '../../../redux/slice/userSlice';
import DocumentPicker from 'react-native-document-picker';
export default () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const [show, setShow] = React.useState(false);
  const [loading, setLoading] = useState();
  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [editPhone, setEditPhone] = useState(true);
  const [editEmail, setEditEmail] = useState(true);
  const [editFirstName, setEditFirstName] = useState(true);
  const [editLastName, setEditLastName] = useState(true);
  const [data, setData] = useState();
  const [file, setFile] = useState();
  const handleNavigate = () => {
    navigation.navigate('Rigister', {
      screen: 'Register',
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const actionResult = await dispatch(
          fetchItemsAsync({
            endpoint: `auth/me`,
          }),
        );

        if (actionResult.payload.status) {
          setLoading(true);
          setData(actionResult.payload.user);

          setFirstname(actionResult.payload.user.firstname);
          setLastname(actionResult.payload.user.lastname);
          setEmail(actionResult.payload.user.email);
          setPhone(actionResult.payload.user?.phone_number);
        }
      } catch (error) {
        console.error('Error dispatching fetchItemsAsync:', error);
      }
    };

    fetchData();
  }, [dispatch]);
  const handleUpdateProfile = async () => {
    //removeItem('onboarded');

    const formData = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      phone_number: phone,
      profile: file,
    };
    console.log(formData);
    try {
      const action = await dispatch(
        editItemAsync({endpoint: 'profile', item: formData}),
      );
      // Successfully handled response
      if (action?.payload?.status) {
        navigation.navigate('Home', {
          screen: 'Home',
        });
      }
    } catch (error) {
      console.error(error); // Log the rejection error
      console.log(error.payload); // Log the additional information from the rejection
    }
  };

  const handleBack = () => {
    navigation.navigate('Home', {
      screen: 'Home',
    });
  };

  const selection = async () => {
    try {
      const doc = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images],
      });
      setFile(doc);
    } catch (err) {
      if (DocumentPicker.isCancel(err))
        console.log('User cancelled the upload', err);
      else console.log(err);
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
        <View bg={'white'} height={'100%'}>
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
              Profile
            </Text>
          </HStack>

          <ScrollView bg={'white'} showsVerticalScrollIndicator={false}>
            <Stack w="80%" mx="auto" mt={5}>
              <Pressable onPress={selection}>
                <Icon
                  size={100}
                  as={<Ionicons name="person-circle" />}
                  alignSelf={'center'}
                />
              </Pressable>

              <Text textAlign={'center'}>Upload</Text>
              <Input
                mt={4}
                variant="underlined"
                placeholder="Firstname"
                type="text"
                value={firstname}
                isReadOnly={editFirstName}
                onChangeText={v => {
                  setFirstname(v);
                }}
                InputRightElement={
                  <Pressable onPress={() => setEditFirstName(false)}>
                    <Icon
                      as={<Entypo name="edit" />}
                      size={'md'}
                      color="muted.400"
                    />
                  </Pressable>
                }
              />
              <Input
                mt={4}
                variant="underlined"
                type="text"
                placeholder="Lastname"
                onChangeText={v => setLastname(v)}
                value={lastname}
                isReadOnly={editLastName}
                InputRightElement={
                  <Pressable onPress={() => setEditLastName(false)}>
                    <Icon
                      as={<Entypo name="edit" />}
                      size={'md'}
                      color="muted.400"
                    />
                  </Pressable>
                }
              />

              <Input
                mt={4}
                variant="underlined"
                type="text"
                placeholder="Email"
                onChangeText={v => setEmail(v)}
                isReadOnly={editEmail}
                value={email}
                InputRightElement={
                  <Pressable onPress={() => setEditEmail(false)}>
                    <Icon
                      as={<Entypo name="edit" />}
                      size={'md'}
                      color="muted.400"
                    />
                  </Pressable>
                }
              />
              <Input
                mt={4}
                variant="underlined"
                type="text"
                isReadOnly={editPhone}
                placeholder="Phone Number"
                onChangeText={v => setPhone(v)}
                value={phone}
                InputRightElement={
                  <Pressable onPress={() => setEditPhone(false)}>
                    <Icon
                      as={<Entypo name="edit" />}
                      size={'md'}
                      color="muted.400"
                    />
                  </Pressable>
                }
              />
              <Center mt={4}>
                <Button
                  onPress={handleUpdateProfile}
                  size="sm"
                  width={150}
                  rounded={20}
                  variant="outline">
                  <Text color={'blue.500'}>Save</Text>
                </Button>
              </Center>
            </Stack>
          </ScrollView>
        </View>
      )}
    </NativeBaseProvider>
  );
};
