//@ts-nocheck

import React, {useState, useEffect, useRef} from 'react';

import {
  Box,
  Center,
  Stack,
  Input,
  NativeBaseProvider,
  Button,
  Spinner,
  Heading,
  Text,
  useToast,
  AlertDialog,
  Icon,
  Container,
  Header,
  Tab,
  ScrollView,
  Divider,
  Tabs,
  TabHeading,
  HStack,
} from 'native-base';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {createItemAsync} from '../../../redux/slice/userSlice';
import {useNavigation} from '@react-navigation/native';
export default () => {
  const navigation = useNavigation();
  const myRef = React.useRef({});
  const toast = useToast();
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirm_password, setConfirmPassword] = useState();

  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState();
  const onClose = () => setIsOpen(false);

  const cancelRef = useRef(null);
  useEffect(() => {
    const styleObj = {
      borderWidth: 1,
      borderRadius: 4,
      borderColor: '#fff',
    };
    myRef.current.setNativeProps({
      style: styleObj,
    });
  }, [myRef]);

  const handleRegister = async () => {
    // Create an object with the form data
    const formData = {
      firstName,
      lastName,
      email,
      password,
      confirm_password,
    };

    try {
      const action = await dispatch(
        createItemAsync({endpoint: 'register', item: formData}),
      );

      if (action.payload.message && !action?.payload?.status) {
        setIsOpen(!isOpen);
        setMessage(action.payload.message);
      }

      if (action?.payload?.errors) {
        setIsOpen(!isOpen);
        setMessage(action?.payload?.message);
      }
      console.log(action.payload.status); // Successfully handled response
      if (action.payload.status) {
        navigation.navigate('Home', {
          user: action.payload.user,
        });
      }
    } catch (error) {
      console.error(error); // Log the rejection error
      console.log(error.payload); // Log the additional information from the rejection
    }
  };

  const showToast = () => {
    toast.show({
      title: 'Hello',
      status: 'success',
      description: 'This is a success toast!',
    });
  };
  return (
    <NativeBaseProvider>
      <Center flex={1} px="3">
        <ScrollView
          contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
          <Box width="100%" bg="white" p={8} shadow={2} ref={myRef}>
            <Stack space={4} w="100%" maxW="300px" mx="auto">
              <Center>
                <Input
                  variant="underlined"
                  placeholder="Firt Name"
                  isRequired={true}
                  onChangeText={v => setFirstName(v)}
                  value={firstName || ''}></Input>
                <Input
                  marginTop={5}
                  variant="underlined"
                  isRequired={true}
                  onChangeText={v => setLastName(v)}
                  value={lastName || ''}
                  placeholder="Last Name"></Input>
                <Input
                  isRequired={true}
                  marginTop={5}
                  isRequired={true}
                  onChangeText={v => setEmail(v)}
                  value={email || ''}
                  variant="underlined"
                  placeholder="Email"></Input>
                <Input
                  isRequired={true}
                  marginTop={5}
                  isRequired={true}
                  variant="underlined"
                  type="password"
                  onChangeText={v => setPassword(v)}
                  value={password || ''}
                  placeholder="Password"></Input>
                <Input
                  marginTop={5}
                  isRequired={true}
                  variant="underlined"
                  type="password"
                  onChangeText={v => setConfirmPassword(v)}
                  value={confirm_password || ''}
                  placeholder="Confirm Password"></Input>
                <Button
                  size="sm"
                  rounded={20}
                  marginTop={5}
                  //shadow={0.9}
                  onPress={handleRegister}
                  width={250}
                  fontWeight={'bold'}
                  variant="outline">
                  <Text fontSize={14} color={'blue.500'}>
                    Sign Up
                  </Text>
                </Button>
              </Center>
              <HStack>
                <Divider
                  my="4"
                  w={100}
                  _light={{
                    bg: 'gray.500',
                  }}
                  _dark={{
                    bg: 'muted.10',
                  }}
                  color={'gray.500'}
                  h={0.6}
                />
                <Text color={'gray.500'}>or continue with</Text>
                <Divider
                  my="4"
                  color={'gray.600'}
                  w={100}
                  _light={{
                    bg: 'gray.500',
                  }}
                  _dark={{
                    bg: 'muted.10',
                  }}
                  h={0.6}
                />
              </HStack>

              <Center>
                <Button size="sm" rounded={20} width={250} variant="outline">
                  <HStack>
                    <SimpleLineIcons
                      name="social-google"
                      marginTop={4}
                      size={18}
                      color="#0F9D58"
                    />
                    <Text fontSize={18} marginLeft={1} color={'blue.500'}>
                      Google
                    </Text>
                  </HStack>
                </Button>
                <Button
                  size="sm"
                  rounded={20}
                  marginTop={3}
                  width={250}
                  variant="outline">
                  <HStack>
                    <Ionicons
                      name="logo-facebook"
                      //marginTop={}
                      size={26}
                      color="blue"
                    />
                    <Text fontSize={18} marginLeft={1} color={'blue.500'}>
                      Facebook
                    </Text>
                  </HStack>
                </Button>
              </Center>
            </Stack>
          </Box>
        </ScrollView>
      </Center>
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={onClose}>
        <AlertDialog.Content>
          <AlertDialog.CloseButton />

          <AlertDialog.Body>
            <HStack>
              <Icon size="md" as={<MaterialIcons name="error" />} />
              <Text ml={2}>{message}</Text>
            </HStack>
          </AlertDialog.Body>
        </AlertDialog.Content>
      </AlertDialog>
    </NativeBaseProvider>
  );
};
