import React, {useState, useContext, useRef} from 'react';
import {
  Input,
  Stack,
  CheckIcon,
  Slide,
  AlertDialog,
  Center,
  NativeBaseProvider,
  Icon,
  Box,
  Text,
  Pressable,
  Button,
  Link,
  Image,
  HStack,
} from 'native-base';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import User from 'react-native-vector-icons/EvilIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {useNavigation} from '@react-navigation/native';
import {removeItem, setItem} from '../../utils/asyncStorage';
import {useDispatch, useSelector} from 'react-redux';
import {createItemAsync} from '../../../redux/slice/userSlice';
import AuthContext from '../../../component/authContext';

const Form = () => {
  const navigation = useNavigation();
  const [show, setShow] = useState(false);
  const {signIn, signInClient} = useContext(AuthContext);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState();
  const onClose = () => setIsOpen(false);
  const [isOpenMess, setIsOpenMess] = useState(false);
  const cancelRef = useRef(null);
  const handleNavigate = () => {
    navigation.navigate('Rigister', {
      screen: 'Register',
    });
  };
  // removeItem('onboarded');
  const handleForgetPass = () => {
    navigation.navigate('Forget', {
      screen: 'Forget',
    });
  };
  const handleLogin = async () => {
    const formData = {
      email,
      password,
    };

    try {
      const action = await dispatch(
        createItemAsync({endpoint: 'auth/login', item: formData}),
      );
      const actionClient = await dispatch(
        createItemAsync({endpoint: 'client/login', item: formData}),
      );
      console.log(action.payload, 'user-login-page');
      if (action?.payload?.errors) {
        setIsOpen(!isOpen);
        setMessage(action?.payload?.message);
      }

      if (action?.payload?.status) {
        setIsOpenMess(!isOpenMess);
        signIn(action.payload?.user, action.payload?.access_token);
        setEmail();
        setPassword();
        navigation.navigate('Home', {
          user: action.payload?.user,
        });
      }

      if (actionClient?.payload?.status) {
        setIsOpenMess(!isOpenMess);
        signInClient(
          actionClient.payload?.client,
          actionClient.payload?.client_access_token,
        );
        setEmail('');
        setPassword('');
        navigation.navigate('Stay', {client: actionClient?.payload?.client});
      }

      if (
        action.payload.message &&
        actionClient?.payload?.message &&
        !action?.payload?.status &&
        !actionClient?.payload?.status
      ) {
        console.log('2', actionClient?.payload?.message);
        if (action.payload.message) {
          setIsOpen(!isOpen);
          setMessage(action.payload.message);
        } else {
          setIsOpen(!isOpen);
          setMessage(actionClient?.payload?.message);
        }
      }

      if (actionClient?.payload?.errors) {
        setIsOpen(!isOpen);
        setMessage(actionClient?.payload?.message);
      }
    } catch (error) {
      console.log('dsdfdsf', error); // Log the rejection error
      console.log(error.payload); // Log the additional information from the rejection
    }
  };

  return (
    <Stack space={4} w="75%" maxW="300px" mx="auto">
      <Image
        alignSelf={'center'}
        alt="logo"
        source={require('../../../screen/assets/images/LOGODOMNER.png')}
      />
      <Input
        variant="underlined"
        placeholder="Username"
        value={email}
        onChangeText={v => setEmail(v)}
        InputRightElement={
          <Icon
            as={<MaterialIcons name="person" />}
            size={6}
            ml="2"
            color="muted.400"
          />
        }
      />
      <Input
        variant="underlined"
        placeholder="Password"
        onChangeText={v => setPassword(v)}
        value={password}
        type={show ? 'text' : 'password'}
        InputRightElement={
          <Pressable onPress={() => setShow(!show)}>
            <Icon
              as={
                <MaterialIcons name={show ? 'visibility' : 'visibility-off'} />
              }
              size={6}
              mr="2"
              color="muted.400"
            />
          </Pressable>
        }
      />
      <Link
        onPress={handleForgetPass}
        _text={{
          fontSize: 'xs',
          fontWeight: '500',
          color: 'indigo.500',
        }}
        alignSelf="flex-end"
        mt="1">
        Forget Password?
      </Link>
      <Center>
        <Button
          onPress={handleLogin}
          size="sm"
          width={150}
          rounded={20}
          variant="outline">
          <Text color={'blue.500'}>Sign In</Text>
        </Button>
      </Center>
      <HStack>
        <Text
          fontSize="sm"
          color="coolGray.600"
          _dark={{
            color: 'warmGray.200',
          }}>
          Don't have an account?{' '}
        </Text>
        <Link
          isHovered={true}
          onPress={handleNavigate}
          _text={{
            color: 'indigo.500',
            fontWeight: 'medium',
            fontSize: 'sm',
          }}>
          Sign Up
        </Link>
      </HStack>
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={onClose}>
        <AlertDialog.Content>
          <AlertDialog.CloseButton />

          <AlertDialog.Body bg={'error.300'}>
            <HStack>
              <Icon
                size="md"
                color={'muted.50'}
                as={<MaterialIcons name="error" />}
              />
              <Text ml={2} fontWeight={'medium'} color={'muted.50'}>
                {message}
              </Text>
            </HStack>
          </AlertDialog.Body>
        </AlertDialog.Content>
      </AlertDialog>
    </Stack>
  );
};

export default () => {
  return (
    <NativeBaseProvider>
      <Center flex={1} px="3">
        <Form />
      </Center>
    </NativeBaseProvider>
  );
};
