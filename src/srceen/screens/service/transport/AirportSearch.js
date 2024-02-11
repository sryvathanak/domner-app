import React, {useEffect, useState} from 'react';
import {
  VStack,
  Center,
  NativeBaseProvider,
  IconButton,
  View,
  Text,
  HStack,
  Image,
  Badge,
  Flex,
  ZStack,
  CheckIcon,
  Spacer,
  Box,
  Stack,
  Heading,
  Avatar,
  Spinner,
  Pressable,
  Input,
  Link,
  FlatList,
  Select,
  Icon,
  Button,
} from 'native-base';
import {
  ImageBackground,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {fetchItemsAsync} from '../../../../redux/slice/userSlice';
import {useDispatch} from 'react-redux';
const {width, height} = Dimensions.get('window');

export default ({route}) => {
  const [showSearch, setShowSearch] = useState(true);
  const {dataUser, screen} = route.params;
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [data, setData] = useState();
  const navigation = useNavigation();
  const handleBack = () => {
    navigation.navigate('Home', {
      screen: 'Home',
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const actionResult = await dispatch(
          fetchItemsAsync({
            endpoint: `flight-info?from=${dataUser?.from}&to=${dataUser?.to}`,
          }),
        );
        console.log('Flight Search', actionResult.payload);
        if (actionResult?.payload?.status) {
          setLoading(true);
          setData(actionResult?.payload?.data);
        }
      } catch (error) {
        console.error('Error dispatching fetchItemsAsync:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  // const handleFlightDetail = (d, v) => {
  //   console.log(d, v);

  // };
  // const data = [
  //   {
  //     id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
  //     fullName: 'Aafreen Khan',
  //     timeStamp: '12:47 PM',
  //     From: 'PP',
  //     To: 'BKK',
  //     time: '3h 30m',
  //     date: 'Mon, Dec 25,2023',
  //     FromTime: '12:14',
  //     ToTime: '5:40',
  //     FromFull: 'Phnom Penh',
  //     airplane_name: 'Boeing',
  //     ToFull: 'Bang kok',
  //     the_airport_from: 'Phnom Penh airport',
  //     the_airport_to: 'Bang kok airport',
  //     organization: 'Cambodia airways',
  //     Price: 100.25,
  //     punctuality: '93%',
  //     recentText: 'Good Day!',
  //     avatarUrl:
  //       'https://airmundo.com/app/uploads/2019/05/Cambodia-Airways-brand-logo-400x400.jpg',
  //   },
  //   {
  //     id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
  //     fullName: 'Sujitha Mathur',
  //     timeStamp: '11:11 PM',
  //     date: 'Mon, Dec 25,2023',
  //     Price: 102,
  //     time: '3h 30m',
  //     airplane_name: 'Boeing',
  //     FromTime: '12:14',
  //     organization: 'Cambodia airways',
  //     From: 'PP',
  //     To: 'BKK',
  //     FromFull: 'Phnom Penh',
  //     ToFull: 'Bang kok',
  //     punctuality: '93%',
  //     ToTime: '5:40',
  //     the_airport_from: 'Phnom Penh airport',
  //     the_airport_to: 'Bang kok airport',
  //     recentText: 'Cheer up, there!',
  //     avatarUrl:
  //       'https://th.bing.com/th/id/OIP.n7mViMcokNfGyFcDLSDmegHaHa?w=600&h=600&rs=1&pid=ImgDetMain',
  //   },
  //   {
  //     id: '58694a0f-3da1-471f-bd96-145571e29d72',
  //     fullName: 'Anci Barroco',
  //     Price: 140,
  //     date: 'Mon, Dec 25,2023',
  //     airplane_name: 'Boeing',
  //     timeStamp: '6:22 PM',
  //     organization: 'Cambodia airways',
  //     time: '3h 30m',
  //     From: 'PP',
  //     To: 'BKK',
  //     FromFull: 'Phnom Penh',
  //     ToFull: 'Bang kok',
  //     FromTime: '12:14',
  //     the_airport_from: 'Phnom Penh airport',
  //     the_airport_to: 'Bang kok airport',
  //     ToTime: '5:40',
  //     punctuality: '93%',
  //     recentText: 'Good Day!',
  //     avatarUrl:
  //       'https://th.bing.com/th/id/OIP.RBW7vCL3iWA-IKLbBuiG9AHaFj?w=1333&h=1000&rs=1&pid=ImgDetMain',
  //   },
  //   {
  //     id: '68694a0f-3da1-431f-bd56-142371e29d72',
  //     fullName: 'Aniket Kumar',
  //     organization: 'Cambodia airways',
  //     timeStamp: '8:56 PM',
  //     time: '3h 30m',
  //     date: 'Mon, Dec 25,2023',
  //     airplane_name: 'Boeing',
  //     From: 'PP',
  //     To: 'BKK',
  //     FromFull: 'Phnom Penh',
  //     ToFull: 'Bang kok',
  //     punctuality: '93%',
  //     Price: 125,
  //     FromTime: '12:14',
  //     the_airport_from: 'Phnom Penh airport',
  //     the_airport_to: 'Bang kok airport',
  //     ToTime: '5:40',
  //     recentText: 'All the best',
  //     avatarUrl:
  //       'https://www.airlineratings.com/wp-content/uploads/uploads/angkor-air-logo.jpg',
  //   },
  //   {
  //     id: '28694a0f-3da1-471f-bd96-142456e29d72',
  //     fullName: 'Kiara',
  //     Price: 101,
  //     timeStamp: '12:47 PM',
  //     airplane_name: 'Boeing',
  //     date: 'Mon, Dec 25,2023',
  //     organization: 'Cambodia airways',
  //     time: '3h 30m',
  //     FromTime: '12:14',
  //     From: 'PP',
  //     To: 'BKK',
  //     FromFull: 'Phnom Penh',
  //     ToFull: 'Bang kok',
  //     punctuality: '93%',
  //     the_airport_from: 'Phnom Penh airport',
  //     the_airport_to: 'Bang kok airport',
  //     ToTime: '5:40',
  //     recentText: 'I will call today.',
  //     avatarUrl:
  //       'https://th.bing.com/th/id/R.9013c87563120ac4531c0e0bc1f8eacd?rik=djxFS14%2fUuI85Q&riu=http%3a%2f%2fwww.topjobcambodia.com%2fphotos%2flogo%2f20160212-151147-sky_angkor_airlines.jpg&ehk=0XQjsBqk0ucpW3QeWo3OVrs90uc%2bOSLwqQsgf8It394%3d&risl=&pid=ImgRaw&r=0',
  //   },
  //   {
  //     id: '28694a0f-3da1-471f-bd96-142456e29d721',
  //     fullName: 'Kiara',
  //     Price: 235,
  //     timeStamp: '12:47 PM',
  //     date: 'Mon, Dec 25,2023',
  //     airplane_name: 'Boeing',
  //     organization: 'Cambodia airways',
  //     From: 'PP',
  //     time: '3h 30m',
  //     punctuality: '93%',
  //     To: 'BKK',
  //     FromFull: 'Phnom Penh',
  //     ToFull: 'Bang kok',
  //     FromTime: '12:14',
  //     the_airport_from: 'Phnom Penh airport',
  //     the_airport_to: 'Bang kok airport',
  //     ToTime: '5:40',
  //     recentText: 'I will call today.',
  //     avatarUrl:
  //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU',
  //   },
  //   {
  //     id: '28694a0f-3da1-471f-bd96-142456e29d722',
  //     fullName: 'Kiara',
  //     Price: 126,
  //     organization: 'Cambodia airways',
  //     timeStamp: '12:47 PM',
  //     airplane_name: 'Boeing',
  //     From: 'PP',
  //     date: 'Mon, Dec 25,2023',
  //     time: '3h 30m',
  //     To: 'BKK',
  //     FromFull: 'Phnom Penh',
  //     the_airport_from: 'Phnom Penh airport',
  //     the_airport_to: 'Bang kok airport',
  //     ToFull: 'Bang kok',
  //     FromTime: '12:14',
  //     ToTime: '5:40',
  //     punctuality: '93%',
  //     recentText: 'I will call today.',
  //     avatarUrl:
  //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU',
  //   },
  //   {
  //     id: '28694a0f-3da1-471f-bd96-142456e29d723',
  //     fullName: 'Kiara',
  //     time: '3h 30m',
  //     Price: 198,
  //     organization: 'Cambodia airways',
  //     timeStamp: '12:47 PM',
  //     airplane_name: 'Boeing',
  //     date: 'Mon, Dec 25,2023',
  //     the_airport_from: 'Phnom Penh airport',
  //     the_airport_to: 'Bang kok airport',
  //     From: 'PP',
  //     To: 'BKK',
  //     punctuality: '93%',
  //     FromFull: 'Phnom Penh',
  //     ToFull: 'Bang kok',
  //     FromTime: '12:14',
  //     ToTime: '5:40',
  //     recentText: 'I will call today.',
  //     avatarUrl:
  //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU',
  //   },
  //   {
  //     id: '28694a0f-3da1-471f-bd96-142456e29d7213',
  //     fullName: 'Kiara',
  //     Price: 134.5,
  //     organization: 'Cambodia airways',
  //     time: '3h 30m',
  //     timeStamp: '12:47 PM',
  //     airplane_name: 'Boeing',
  //     the_airport_from: 'Phnom Penh airport',
  //     the_airport_to: 'Bang kok airport',
  //     date: 'Mon, Dec 25,2023',
  //     From: 'PP',
  //     To: 'BKK',
  //     punctuality: '93%',
  //     FromFull: 'Phnom Penh',
  //     ToFull: 'Bang kok',
  //     recentText: 'I will call today.',
  //     avatarUrl:
  //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU',
  //   },
  //   {
  //     id: '28694a0f-3da1-471f-bd96-142456e29d7213dsgdgd',
  //     fullName: 'Kiara',
  //     Price: 100.5,
  //     time: '3h 30m',
  //     organization: 'Cambodia airways',
  //     airplane_name: 'Boeing',
  //     the_airport_from: 'Phnom Penh airport',
  //     the_airport_to: 'Bang kok airport',
  //     date: 'Mon, Dec 25,2023',
  //     punctuality: '93%',
  //     timeStamp: '12:47 PM',
  //     FromTime: '12:14',
  //     ToTime: '5:40',
  //     recentText: 'I will call today.',
  //     avatarUrl:
  //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU',
  //   },
  //   {
  //     id: '28694a0f-3da1-471f-bd96-142456e29d72324',
  //     fullName: 'Kiara',
  //     Price: 100.5,
  //     From: 'PP',
  //     organization: 'Cambodia airways',
  //     date: 'Mon, Dec 25,2023',
  //     To: 'BKK',
  //     FromFull: 'Phnom Penh',
  //     airplane_name: 'Boeing',
  //     the_airport_from: 'Phnom Penh airport',
  //     the_airport_to: 'Bang kok airport',
  //     ToFull: 'Bang kok',
  //     timeStamp: '12:47 PM',
  //     punctuality: '93%',
  //     FromTime: '12:14',
  //     ToTime: '5:40',
  //     recentText: 'I will call today.',
  //     avatarUrl:
  //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU',
  //   },
  //   {
  //     id: '28694a0f-3da1-471f-bd96-142456e29d725435',
  //     fullName: 'Kiara',
  //     Price: 100.5,
  //     time: '3h 30m',
  //     organization: 'Cambodia airways',
  //     timeStamp: '12:47 PM',
  //     FromTime: '12:14',
  //     airplane_name: 'Boeing',
  //     From: 'PP',
  //     date: 'Mon, Dec 25,2023',
  //     To: 'BKK',
  //     FromFull: 'Phnom Penh',
  //     the_airport_from: 'Phnom Penh airport',
  //     the_airport_to: 'Bang kok airport',
  //     ToFull: 'Bang kok',
  //     punctuality: '93%',
  //     ToTime: '5:40',
  //     recentText: 'I will call today.',
  //     avatarUrl:
  //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU',
  //   },
  //   {
  //     id: '28694a0f-3da1-471f-bd96-142456e29d72515',
  //     fullName: 'Kiara',
  //     Price: 100.5,
  //     time: '3h 30m',
  //     airplane_name: 'Boeing',
  //     organization: 'Cambodia airways',
  //     timeStamp: '12:47 PM',
  //     From: 'PP',
  //     date: 'Mon, Dec 25,2023',
  //     To: 'BKK',
  //     FromFull: 'Phnom Penh',
  //     ToFull: 'Bang kok',
  //     the_airport_from: 'Phnom Penh airport',
  //     the_airport_to: 'Bang kok airport',
  //     FromTime: '12:14',
  //     ToTime: '5:40',
  //     punctuality: '93%',
  //     recentText: 'I will call today.',
  //     avatarUrl:
  //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU',
  //   },
  //   {
  //     id: '28694a0f-3da1-471f-bd96-142456e29d7251615',
  //     fullName: 'Kiara',
  //     Price: 100.5,
  //     organization: 'Cambodia airways',
  //     timeStamp: '12:47 PM',
  //     time: '3h 30m',
  //     airplane_name: 'Boeing',
  //     FromTime: '12:14',
  //     date: 'Mon, Dec 25,2023',
  //     ToTime: '5:40',
  //     From: 'PP',
  //     To: 'BKK',
  //     punctuality: '93%',
  //     FromFull: 'Phnom Penh',
  //     the_airport_from: 'Phnom Penh airport',
  //     the_airport_to: 'Bang kok airport',
  //     ToFull: 'Bang kok',
  //     recentText: 'I will call today.',
  //     avatarUrl:
  //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU',
  //   },
  //   {
  //     id: '28694a0f-3da1-471f-bd96-142456e29d72735',
  //     fullName: 'Kiara',
  //     Price: 100.5,
  //     time: '3h 30m',
  //     timeStamp: '12:47 PM',
  //     date: 'Mon, Dec 25,2023',
  //     airplane_name: 'Boeing',
  //     organization: 'Cambodia airways',
  //     From: 'PP',
  //     To: 'BKK',
  //     FromFull: 'Phnom Penh',
  //     ToFull: 'Bang kok',
  //     the_airport_from: 'Phnom Penh airport',
  //     the_airport_to: 'Bang kok airport',
  //     FromTime: '12:14',
  //     punctuality: '93%',
  //     ToTime: '5:40',
  //     recentText: 'I will call today.',
  //     avatarUrl:
  //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU',
  //   },
  //   {
  //     id: '28694a0f-3da1-471f-bd96-142456e29d7234573',
  //     fullName: 'Kiara',
  //     Price: 100.5,
  //     time: '3h 30m',
  //     timeStamp: '12:47 PM',
  //     airplane_name: 'Boeing',
  //     date: 'Mon, Dec 25,2023',
  //     organization: 'Cambodia airways',
  //     From: 'PP',
  //     To: 'BKK',
  //     FromFull: 'Phnom Penh',
  //     ToFull: 'Bang kok',
  //     the_airport_from: 'Phnom Penh airport',
  //     the_airport_to: 'Bang kok airport',
  //     FromTime: '12:14',
  //     punctuality: '93%',
  //     ToTime: '5:40',
  //     recentText: 'I will call today.',
  //     avatarUrl:
  //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU',
  //   },
  //   {
  //     id: '28694a0f-3da1-471f-bd96-142456e29d72676',
  //     fullName: 'Kiara',
  //     Price: 100.5,
  //     organization: 'Cambodia airways',
  //     airplane_name: 'Boeing',
  //     time: '3h 30m',
  //     date: 'Mon, Dec 25,2023',
  //     timeStamp: '12:47 PM',
  //     From: 'PP',
  //     To: 'BKK',
  //     FromFull: 'Phnom Penh',
  //     ToFull: 'Bang kok',
  //     the_airport_from: 'Phnom Penh airport',
  //     the_airport_to: 'Bang kok airport',
  //     FromTime: '12:14',
  //     punctuality: '93%',
  //     ToTime: '5:40',
  //     recentText: 'I will call today.',
  //     avatarUrl:
  //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU',
  //   },
  //   {
  //     id: '28694a0f-3da1-471f-bd96-142456e29d723r546',
  //     fullName: 'Kiara',
  //     Price: 100.5,
  //     organization: 'Cambodia airways',
  //     time: '3h 30m',
  //     timeStamp: '12:47 PM',
  //     date: 'Mon, Dec 25,2023',
  //     airplane_name: 'Boeing',
  //     FromTime: '12:14',
  //     From: 'PP',
  //     To: 'BKK',
  //     punctuality: '93%',
  //     FromFull: 'Phnom Penh',
  //     ToFull: 'Bang kok',
  //     the_airport_from: 'Phnom Penh airport',
  //     the_airport_to: 'Bang kok airport',
  //     ToTime: '5:40',
  //     recentText: 'I will call today.',
  //     avatarUrl:
  //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU',
  //   },
  //   {
  //     id: '28694a0f-3da1-471f-bd96-142456e29d7285475',
  //     fullName: 'Kiara',
  //     Price: 100.5,
  //     timeStamp: '12:47 PM',
  //     organization: 'Cambodia airways',
  //     time: '3h 30m',
  //     date: 'Mon, Dec 25,2023',
  //     airplane_name: 'Boeing',
  //     From: 'PP',
  //     To: 'BKK',
  //     FromFull: 'Phnom Penh',
  //     ToFull: 'Bang kok',
  //     FromTime: '12:14',
  //     punctuality: '93%',
  //     the_airport_from: 'Phnom Penh airport',
  //     the_airport_to: 'Bang kok airport',
  //     ToTime: '5:40',
  //     recentText: 'I will call today.',
  //     avatarUrl:
  //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU',
  //   },
  //   {
  //     id: '28694a0f-3da1-471f-bd96-142456e29d7284736',
  //     fullName: 'Kiara',
  //     Price: 100.5,
  //     timeStamp: '12:47 PM',
  //     time: '3h 30m',
  //     date: 'Mon, Dec 25,2023',
  //     From: 'PP',
  //     To: 'BKK',
  //     FromFull: 'Phnom Penh',
  //     airplane_name: 'Boeing',
  //     ToFull: 'Bang kok',
  //     FromTime: '12:14',
  //     the_airport_from: 'Phnom Penh airport',
  //     the_airport_to: 'Bang kok airport',
  //     ToTime: '5:40',
  //     recentText: 'I will call today.',
  //     punctuality: '93%',
  //     avatarUrl:
  //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU',
  //   },
  //   {
  //     id: '28694a0f-3da1-471f-bd96-142456e29d72r532646',
  //     fullName: 'Kiara',
  //     Price: 100.5,
  //     timeStamp: '12:47 PM',
  //     date: 'Mon, Dec 25,2023',
  //     organization: 'Cambodia airways',
  //     time: '3h 30m',
  //     From: 'PP',
  //     To: 'BKK',
  //     airplane_name: 'Boeing',
  //     FromFull: 'Phnom Penh',
  //     ToFull: 'Bang kok',
  //     the_airport_from: 'Phnom Penh airport',
  //     the_airport_to: 'Bang kok airport',
  //     FromTime: '12:14',
  //     ToTime: '5:40',
  //     punctuality: '93%',
  //     recentText: 'I will call today.',
  //     avatarUrl:
  //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU',
  //   },
  //   {
  //     id: '28694a0f-3da1-471f-bd96-142456e29d72374575',
  //     fullName: 'Kiara',
  //     Price: 100.5,
  //     timeStamp: '12:47 PM',
  //     date: 'Mon, Dec 25,2023',
  //     organization: 'Cambodia airways',
  //     time: '3h 30m',
  //     From: 'PP',
  //     To: 'BKK',
  //     FromFull: 'Phnom Penh',
  //     ToFull: 'Bang kok',
  //     airplane_name: 'Boeing',
  //     FromTime: '12:14',
  //     ToTime: '5:40',
  //     punctuality: '93%',
  //     the_airport_from: 'Phnom Penh airport',
  //     the_airport_to: 'Bang kok airport',
  //     recentText: 'I will call today.',
  //     avatarUrl:
  //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU',
  //   },
  //   {
  //     id: '28694a0f-3da1-471f-bd96-142456e29d723252635',
  //     fullName: 'Kiara',
  //     Price: 100.5,
  //     organization: 'Cambodia airways',
  //     date: 'Mon, Dec 25,2023',
  //     time: '3h 30m',
  //     timeStamp: '12:47 PM',
  //     airplane_name: 'Boeing',
  //     From: 'PP',
  //     To: 'BKK',
  //     FromFull: 'Phnom Penh',
  //     ToFull: 'Bang kok',
  //     the_airport_from: 'Phnom Penh airport',
  //     the_airport_to: 'Bang kok airport',
  //     FromTime: '12:14',
  //     ToTime: '5:40',
  //     punctuality: '93%',
  //     recentText: 'I will call today.',
  //     avatarUrl:
  //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU',
  //   },
  //   {
  //     id: '28694a0f-3da1-471f-bd96-142456e29d7225634wer',
  //     fullName: 'Kiara',
  //     Price: 100.5,
  //     organization: 'Cambodia airways',
  //     time: '3h 30m',
  //     timeStamp: '12:47 PM',
  //     airplane_name: 'Boeing',
  //     punctuality: '93%',
  //     date: 'Mon, Dec 25,2023',
  //     FromTime: '12:14',
  //     ToTime: '5:40',
  //     From: 'PP',
  //     the_airport_from: 'Phnom Penh airport',
  //     the_airport_to: 'Bang kok airport',
  //     FromFull: 'Phnom Penh',
  //     ToFull: 'Bang kok',
  //     To: 'BKK',
  //     recentText: 'I will call today.',
  //     avatarUrl:
  //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU',
  //   },
  // ];

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const now = new Date();

  const dayOfWeek = daysOfWeek[now.getDay()];
  const dayOfMonth = now.getDate().toString().padStart(2, '0');
  const month = months[now.getMonth()];
  const formattedDate = `${dayOfWeek}, ${dayOfMonth} ${month}-${
    daysOfWeek[(now.getDay() + 6) % 7]
  }`;
  const handlePress = () => {
    // Perform any action on TouchableOpacity press
    console.log('TouchableOpacity pressed!');
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
        <View>
          <VStack bg={'white'}>
            <Center>
              <ImageBackground
                style={styles.imageBackground}
                source={{
                  uri: 'https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/angkor-wat-silhouette-of-temple-gloria-and-richard-maschmeyer.jpg',
                }}>
                <HStack>
                  <VStack>
                    <IconButton
                      onPress={handleBack}
                      _icon={{
                        color: 'white',
                        as: Ionicons,
                        name: 'chevron-back',
                        size: 'lg',
                      }}
                      _pressed={{bg: 'transparent'}}
                    />
                  </VStack>
                  <HStack>
                    {showSearch ? (
                      <>
                        <IconButton
                          onPress={() => setShowSearch(false)}
                          //color={'gray.300'}
                          // ml={5}
                          mt={8}
                          _icon={{
                            color: 'white',
                            as: AntDesign,
                            name: 'search1',
                            size: 'md',
                          }}
                          _pressed={{bg: 'transparent'}}
                        />
                        <Text
                          mt={12}
                          color={'white'}
                          fontSize={14}
                          fontWeight={'normal'}>
                          Siem Reap
                          <Text fontSize={11} fontWeight={'light'}>
                            {' '}
                            {'\n'}
                            {formattedDate}
                          </Text>
                        </Text>
                      </>
                    ) : (
                      <>
                        <Input
                          placeholder="Search"
                          InputLeftElement={
                            <Icon
                              as={<AntDesign name="search1" />}
                              size={5}
                              ml="4"
                              color="muted.400"
                            />
                          }
                          _focus={{bg: 'white'}}
                          autoFocus={true}
                          variant="rounded"
                          bg={'white'}
                          mt={10}
                          height={'50%'}
                          focusOutlineColor={'gray.200'}
                          width="90%"
                          onPressIn={() => console.log('123')}
                          onPressOut={() => console.log('123456')}
                          onFocus={() => console.log('hi')}
                          fontSize={10}
                          onBlur={() => setShowSearch(true)}
                        />
                      </>
                    )}
                  </HStack>
                </HStack>
              </ImageBackground>
              <HStack bg={'white'}>
                <ZStack
                  justifyContent={'center'}
                  alignItems={'center'}
                  style={{zIndex: 1}}
                  reversed={false}>
                  <Center>
                    <Flex
                      rounded={20}
                      direction="row"
                      bg={'white'}
                      shadow={5}
                      justifyContent={'cneter'}
                      alignItems={'center'}>
                      <Select
                        placeholder="Filter"
                        w={width / 3.2}
                        color={'gray.500'}
                        textAlign={'center'}
                        dropdownIcon={
                          <Icon
                            as={<EvilIcons name="chevron-down" />}
                            size={5}
                            mr={'10'}
                          />
                          // <EvilIcons
                          //   size={20}
                          //   justifyContent="center"
                          //   name="chevron-down"
                          // />
                        }
                        borderColor={'transparent'}>
                        <Select.Item label="UX Research" value="ux" />
                        <Select.Item label="Web Development" value="web" />
                        <Select.Item
                          label="Cross Platform Development"
                          value="cross"
                        />
                        <Select.Item label="UI Designing" value="ui" />
                        <Select.Item
                          label="Backend Development"
                          value="backend"
                        />
                      </Select>
                      <Select
                        placeholder="Price"
                        color={'gray.500'}
                        textAlign={'center'}
                        w={width / 3.2}
                        dropdownIcon={
                          <Icon
                            as={<EvilIcons name="chevron-down" />}
                            size={5}
                            mr={'10'}
                          />
                        }
                        borderColor={'transparent'}>
                        <Select.Item label="UX Research" value="ux" />
                        <Select.Item label="Web Development" value="web" />
                        <Select.Item
                          label="Cross Platform Development"
                          value="cross"
                        />
                        <Select.Item label="UI Designing" value="ui" />
                        <Select.Item
                          label="Backend Development"
                          value="backend"
                        />
                      </Select>
                      <Select
                        color={'gray.500'}
                        textAlign={'center'}
                        placeholder="Sort"
                        w={width / 3.2}
                        onClose={e => {
                          console.log(e);
                        }}
                        dropdownIcon={
                          <Icon
                            as={<EvilIcons name="chevron-down" />}
                            size={5}
                            mr={'10'}
                          />
                        }
                        borderColor={'transparent'}>
                        <Select.Item label="UX Research" value="ux" />
                        <Select.Item label="Web Development" value="web" />
                        <Select.Item
                          label="Cross Platform Development"
                          value="cross"
                        />
                        <Select.Item label="UI Designing" value="ui" />
                        <Select.Item
                          label="Backend Development"
                          value="backend"
                        />
                      </Select>
                    </Flex>
                  </Center>
                </ZStack>
              </HStack>
            </Center>
            <View mt={10} bg={'white'}>
              <FlatList
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                data={data}
                renderItem={({item}) => (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('DetialFlight', {
                        screen: 'DetialFlight',
                        Id: item.id,
                      });
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
                      <HStack
                        space={[2, 3]}
                        justifyContent="space-between"
                        p={3}>
                        <Avatar
                          size="md"
                          square={false}
                          alt="Avatar"
                          source={{
                            uri: item?.logo,
                          }}
                        />
                        <VStack>
                          <HStack space={7}>
                            <Text
                              fontSize={16}
                              _dark={{
                                color: 'warmGray.50',
                              }}
                              color="coolGray.800"
                              bold>
                              {item?.from_time}
                            </Text>
                            <Icon size={'lg'} as={<AntDesign name="swap" />} />
                            <Text
                              fontSize={16}
                              _dark={{
                                color: 'warmGray.50',
                              }}
                              color="coolGray.800"
                              bold>
                              {item?.to_time}
                            </Text>
                          </HStack>
                          <HStack justifyContent={'space-between'}>
                            <Text
                              color="coolGray.600"
                              _dark={{
                                color: 'warmGray.200',
                              }}>
                              {item?.code_from}
                            </Text>
                            <Text
                              textAlign={'center'}
                              fontSize={10}
                              color="coolGray.600"
                              _dark={{
                                color: 'warmGray.200',
                              }}>
                              {item?.time}
                            </Text>
                            <Text
                              color="coolGray.600"
                              _dark={{
                                color: 'warmGray.200',
                              }}>
                              {item?.code_to}
                            </Text>
                          </HStack>
                          <HStack>
                            <Text>{item?.name}</Text>
                          </HStack>
                          <HStack>
                            <Badge colorScheme="coolGray">
                              <HStack space={1}>
                                <Icon
                                  size={'md'}
                                  as={<FontAwesome5 name="suitcase" />}
                                />
                                <Icon
                                  size={'md'}
                                  as={
                                    <MaterialCommunityIcons name="bag-suitcase" />
                                  }
                                />
                                <Text color={'coolGray.500'}>Included</Text>
                              </HStack>
                            </Badge>
                          </HStack>
                          <HStack space={1} mt={1}>
                            <Icon
                              size={'md'}
                              as={<MaterialIcons name="bolt" />}
                            />
                            <Icon size={'md'} as={<Ionicons name="wifi" />} />
                            <Icon
                              size={'md'}
                              as={<Entypo name="folder-video" />}
                            />
                          </HStack>
                        </VStack>
                        <Spacer />
                        <VStack>
                          <Text
                            fontSize="md"
                            fontWeight={'medium'}
                            _dark={{
                              color: 'warmGray.50',
                            }}
                            color="red.500"
                            alignSelf="flex-start">
                            USD {item?.price}
                          </Text>
                          <Badge colorScheme="info" _text={{color: 'gray.600'}}>
                            Cheapest
                          </Badge>
                        </VStack>
                      </HStack>
                    </Box>
                  </TouchableOpacity>
                )}
                keyExtractor={item => item?.id}
              />
            </View>
          </VStack>
        </View>
      )}
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    width: width,
    height: height * 0.25,
    borderBottomEndRadius: 15, // Adjust the value to control the roundness
    borderBottomStartRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5,
    //alignItems: 'flex-start',
  },
});
