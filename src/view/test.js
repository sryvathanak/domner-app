import React, {useEffect, useState} from 'react';
import {View, Button, StyleSheet, Text, TextInput} from 'react-native';
//import {NativeBaseProvider, Center, Button} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchItemsAsync,
  fetchItemByIdAsync,
  setItemId,
  createItemAsync,
  updateItemAsync,
  deleteItemAsync,
} from '../redux/slice/userSlice';
import AppNavigation from '../srceen/navigation/AppNavigation';
export default function Test() {
  const dispatch = useDispatch();
  const itemId = useSelector(state => state.items.itemId);
  const items = useSelector(state => state.items.items);
  const status = useSelector(state => state.items.status);
  const item = useSelector(state => state.items.item);
  const error = useSelector(state => state.items.error);
  const [inputItemId, setInputItemId] = useState('');
  const [Id, setId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  useEffect(() => {
    dispatch(fetchItemsAsync());
    dispatch(fetchItemByIdAsync(Id));
  }, [dispatch, inputItemId, Id]);

  // const handleInputChange = text => {
  //   setInputItemId(text);
  //   console.log(inputItemId);
  // };

  // const handleSubmit = () => {
  //   //dispatch(setItemId(inputItemId));
  //   //dispatch(fetchItemByIdAsync(inputItemId));
  //   console.log(item);
  //   // console.log(items);
  //   // console.log(error);
  //   // console.log(setItemId);
  // };

  // const handleRegister = () => {
  //   // Create an object with the form data
  //   const formData = {
  //     name,
  //     email,
  //     password,
  //   };

  //   dispatch(createItemAsync(formData));
  //   console.log(status);
  // };

  // const handleView = () => {
  //   console.log(item);
  // };
  // const handleEdit = () => {
  //   const formData = {
  //     name,
  //     email,
  //     password,
  //   };
  //   dispatch(updateItemAsync({itemId: Id, item: formData}));
  //   console.log(status);
  // };
  // const handleDelete = () => {
  //   dispatch(deleteItemAsync(Id));
  //   console.log(status);
  // };
  return (
    //   <Provider store={store}>
    //   <NativeBaseProvider>
    //     <Center className="flex flex-row h-screen space-x-2 items-center">
    //       <Button size="sm" variant="outline">
    //         PRIMARY
    //       </Button>
    //       <Button size="sm" variant="outline">
    //         PRIMARY
    //       </Button>
    //       <Button size="sm" variant="outline">
    //         PRIMARY
    //       </Button>
    //     </Center>
    //   </NativeBaseProvider>
    // </Provider>

    // <View>
    //   <TextInput
    //     style={styles.input}
    //     placeholder="Id"
    //     value={Id}
    //     onChangeText={setId}
    //   />
    //   <TextInput
    //     style={styles.input}
    //     placeholder="Name"
    //     value={name}
    //     onChangeText={setName}
    //   />
    //   <TextInput
    //     placeholder="Email"
    //     style={styles.input}
    //     value={email}
    //     onChangeText={setEmail}
    //   />
    //   <TextInput
    //     placeholder="Password"
    //     style={styles.input}
    //     secureTextEntry
    //     value={password}
    //     onChangeText={setPassword}
    //   />
    //   <View>
    //     <Button title="Register" onPress={handleRegister} />
    //   </View>
    //   <View>
    //     <Button title="View" onPress={handleView} />
    //   </View>
    //   <Button title="Edit" onPress={handleEdit} />
    //   <Button title="Delete" onPress={handleDelete} />
    // </View>
    <AppNavigation></AppNavigation>
  );
}
// const styles = StyleSheet.create({
//   input: {
//     height: 40,
//     margin: 12,
//     borderWidth: 1,
//     padding: 10,
//   },
//   button: {
//     height: 40,
//     margin: 12,
//     borderWidth: 1,
//     padding: 10,
//   },
// });
