import React from 'react';
import {
  Input,
  Stack,
  Center,
  NativeBaseProvider,
  Icon,
  Pressable,
  Text,
  Button,
  Link,
  HStack,
} from 'native-base';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import User from 'react-native-vector-icons/EvilIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {useNavigation} from '@react-navigation/native';
import Fontisto from 'react-native-vector-icons/Fontisto';
const Form = () => {
  const [show, setShow] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);
  const navigation = useNavigation();
  const handleNavigate = () => {
    navigation.navigate('Rigister', {
      screen: 'Register',
    });
  };
  return (
    <Stack space={4} w="75%" maxW="300px" mx="auto">
      <Input
        variant="underlined"
        placeholder="Email"
        InputRightElement={
          <Fontisto
            name="email"
            size={20}
            //  color="#900"

            // Replace 'person' with the name of the icon you want to use
          />
        }
      />
      <Input
        variant="underlined"
        placeholder="New Password"
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
      <Input
        variant="underlined"
        placeholder="Confirm New Password"
        type={showConfirm ? 'text' : 'password'}
        InputRightElement={
          <Pressable onPress={() => setShowConfirm(!show)}>
            <Icon
              as={
                <MaterialIcons
                  name={showConfirm ? 'visibility' : 'visibility-off'}
                />
              }
              size={6}
              mr="2"
              color="muted.400"
            />
          </Pressable>
        }
      />
      <Center>
        <Button
          // style={{
          //   shadowColor: '#000',
          //   shadowOffset: {width: 0, height: 5},
          //   shadowOpacity: 0.25,
          //   shadowRadius: 3.84,
          //   elevation: 5,
          // }}
          size="sm"
          width={150}
          rounded={20}
          variant="outline">
          <Text color={'lightBlue.500'}>Save</Text>
        </Button>
      </Center>
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
