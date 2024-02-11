import {useContext, useState} from 'react';
import {
  NativeBaseProvider,
  Center,
  HStack,
  Text,
  Menu,
  View,
  IconButton,
  Input,
  Modal,
  FormControl,
  Button,
  VStack,
  Box,
  Avatar,
  Slider,
  Icon,
  Pressable,
  Heading,
  Divider,
} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  Dimensions,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import AuthContext from '../../../../component/authContext';

const {width, height} = Dimensions.get('window');
export default function BusScreen() {
  const {searchBusFrom, searchBusTo} = useContext(AuthContext);
  const [date, setDate] = useState(new Date());
  const [dateTo, setDateTo] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [placement, setPlacement] = useState(undefined);
  const [isopen, setIsOpen] = useState(false);
  const [countRoom, setCountRoom] = useState(1);
  const [countAdults, setCountAdults] = useState(1);
  const [countChildren, setCountChildren] = useState(0);
  const [list, setList] = useState([]);
  const [age, setAge] = useState(10);
  const navigation = useNavigation();
  const options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',

    year: 'numeric',
  };

  const onChangeDateFrom = (event, selectedDate) => {
    setOpen(false);
    const currentDate = selectedDate;
    setDate(currentDate);
    console.log(event);
  };
  const onChangeDateTo = (event, selectedDate) => {
    setShow(false);
    const currentDate = selectedDate;
    setDateTo(currentDate);
  };

  const handleBus = () => {
    const data = {
      from: searchBusFrom.from,
      to: searchBusTo.to,
      check_in: date.toISOString(),
      member: countAdults,
      children: countChildren,
    };
    navigation.navigate('BusSearch', {
      screen: 'BusSearch',
      dataUser: data,
    });
  };
  const openModal = placement => {
    setIsOpen(true);
    setPlacement(placement);
  };

  const handleSearchFrom = v => {
    navigation.navigate('Search', {
      screen: 'Bus',
      type: 'From',
      api: 'bus-info',
    });
  };
  const handleSearchTo = v => {
    navigation.navigate('Search', {
      screen: 'Bus',
      type: 'To',
      api: 'bus-info',
    });
  };
  return (
    <ImageBackground
      style={{
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
        width: width,
        height: height / 2,
      }}
      source={{
        uri: 'https://live.staticflickr.com/8203/8267293675_8be7e450fe_b.jpg',
      }}>
      <View
      // justifyContent={'center'}
      // flex={1}
      // alignItems={'center'}
      // style={{backgroundColor: 'white'}}
      >
        <VStack
          bg="gray.100"
          _text={{
            color: 'white',
            fontWeight: 'bold',
          }}
          width={width / 1.1}
          height={height / 2}
          rounded={10}
          shadow={3}>
          <HStack justifyContent={'center'} marginTop={5}>
            <Pressable width="90%" onPress={handleSearchFrom}>
              <Input
                placeholder="From"
                variant="filled"
                _focus={{bg: 'white'}}
                bg={'white'}
                // height={20}
                value={searchBusFrom.from}
                isReadOnly={true}
              />
            </Pressable>
          </HStack>
          <HStack justifyContent={'center'} marginTop={5}>
            <Pressable width="90%" onPress={handleSearchTo}>
              <Input
                placeholder="To"
                _focus={{bg: 'white'}}
                variant="filled"
                bg={'white'}
                isReadOnly={true}
                value={searchBusTo.to}
                // height={20}
              />
            </Pressable>
          </HStack>
          <HStack justifyContent={'center'} marginTop={5}>
            <Pressable
              width="90%"
              onPress={() => {
                setOpen(true);
                console.log(open);
              }}>
              <Input
                value={date.toLocaleString('en-US', options)}
                variant="filled"
                placeholder="Search"
                editable={false}
                InputLeftElement={
                  <Icon
                    as={<FontAwesome name="calendar" />}
                    size={5}
                    ml="4"
                    color="muted.400"
                  />
                }
                _focus={{bg: 'white'}}
                bg={'white'}
                // height={20}
              />
            </Pressable>
          </HStack>
          {/* <HStack justifyContent={'center'} marginTop={5}>
            <Pressable
              width="90%"
              onPress={() => {
                setShow(true);
              }}>
              <Input
                value={dateTo.toLocaleString('en-US', options)}
                placeholder="Search"
                editable={false}
                InputLeftElement={
                  <Icon
                    as={<FontAwesome name="calendar" />}
                    size={5}
                    ml="4"
                    color="muted.400"
                  />
                }
                _focus={{bg: 'white'}}
                bg={'white'}
                // height={20}
              />
            </Pressable>
          </HStack> */}
          <HStack justifyContent={'center'} marginTop={5}>
            <Button
              width="90%"
              bg={'white'}
              variant="filled"
              justifyContent={'flex-start'}
              _pressed={{bg: 'white'}}
              onPress={() => openModal('center')}>
              <HStack space={2}>
                <Icon
                  as={<Ionicons name="people" />}
                  size={5}
                  color="muted.400"></Icon>

                <Text>
                  {countAdults + countChildren} passengers
                  {countChildren > 0 ? <>, {countChildren} children</> : null}
                </Text>
              </HStack>
            </Button>
            <Modal
              isOpen={isopen}
              onClose={() => setIsOpen(false)}
              safeAreaTop={true}>
              <Modal.Content width={'90%'}>
                <Modal.CloseButton />
                <Modal.Header>More Options</Modal.Header>
                <Modal.Body>
                  {/* <FormControl>
                    <FormControl.Label>Name</FormControl.Label>
                    <Input />
                  </FormControl>
                  <FormControl mt="3">
                    <FormControl.Label>Email</FormControl.Label>
                    <Input />
                  </FormControl> */}

                  <HStack>
                    <Heading size={'sm'}>Adults</Heading>
                    <HStack space={4} style={{marginLeft: 'auto'}}>
                      <HStack
                        justifyContent="center"
                        mx={{
                          base: 'auto',
                          md: '0',
                        }}>
                        <IconButton
                          disabled={countAdults == 1}
                          onPress={() => setCountAdults(countAdults - 1)}
                          size="xs"
                          variant={'outline'}
                          // colorScheme="trueGray"
                          icon={
                            <Icon
                              as={Entypo}
                              name="minus"
                              size="sm"
                              color="trueGray.400"
                            />
                          }
                        />
                      </HStack>
                      <Text fontSize={18} fontWeight={'medium'}>
                        {countAdults}
                      </Text>
                      <HStack
                        justifyContent="center"
                        mx={{
                          base: 'auto',
                          md: '0',
                        }}>
                        <IconButton
                          onPress={() => setCountAdults(countAdults + 1)}
                          size="xs"
                          variant={'outline'}
                          // colorScheme="trueGray"
                          icon={
                            <Icon
                              as={Entypo}
                              name="plus"
                              size="sm"
                              color="trueGray.400"
                            />
                          }
                        />
                      </HStack>
                    </HStack>
                  </HStack>

                  <HStack mt={10}>
                    <Heading size={'sm'}>Children</Heading>
                    <HStack space={4} style={{marginLeft: 'auto'}}>
                      <HStack
                        justifyContent="center"
                        mx={{
                          base: 'auto',
                          md: '0',
                        }}>
                        <IconButton
                          onPress={() => {
                            setCountChildren(countChildren - 1);
                            list.pop();
                          }}
                          disabled={countChildren == 0}
                          size="xs"
                          variant={'outline'}
                          // colorScheme="trueGray"
                          icon={
                            <Icon
                              as={Entypo}
                              name="minus"
                              size="sm"
                              color="trueGray.400"
                            />
                          }
                        />
                      </HStack>
                      <Text fontSize={18} fontWeight={'medium'}>
                        {countChildren}
                      </Text>
                      <HStack
                        justifyContent="center"
                        mx={{
                          base: 'auto',
                          md: '0',
                        }}>
                        <IconButton
                          onPress={() => {
                            setCountChildren(countChildren + 1);

                            const dobj = {
                              num: countChildren + 1,
                              a: 10,
                            };
                            setList([...list, dobj]);
                            console.log(list);
                          }}
                          size="xs"
                          variant={'outline'}
                          // colorScheme="trueGray"
                          icon={
                            <Icon
                              as={Entypo}
                              name="plus"
                              size="sm"
                              color="trueGray.400"
                            />
                          }
                        />
                      </HStack>
                    </HStack>
                  </HStack>
                  {list.map((item, k) => (
                    <HStack mt={10} key={k.toString()}>
                      <Text>Child {item.num}</Text>
                      <HStack style={{marginLeft: 'auto'}}>
                        <Text>{item.a}y</Text>

                        <Box w="70%" style={{marginLeft: 'auto'}}>
                          <Slider
                            w="4/4"
                            onChange={v => {
                              setAge(v);
                              setList(prevList => {
                                const newList = [...prevList];
                                newList[k].a = v;
                                console.log(newList);
                                return newList;
                              });
                            }}
                            defaultValue={item.a}
                            //value={age}
                            minValue={1}
                            maxValue={17}
                            //accessibilityLabel="hello world"
                            step={1}>
                            <Slider.Track>
                              <Slider.FilledTrack />
                            </Slider.Track>
                            <Slider.Thumb />
                          </Slider>
                        </Box>
                      </HStack>
                    </HStack>
                  ))}
                </Modal.Body>
                <Modal.Footer>
                  <Button.Group space={2}>
                    <Button
                      variant="ghost"
                      colorScheme="blueGray"
                      onPress={() => {
                        setIsOpen(false);
                      }}>
                      Cancel
                    </Button>
                    <Button
                      variant="ghost"
                      colorScheme="blueGray"
                      onPress={() => {
                        setIsOpen(false);
                      }}>
                      Apply
                    </Button>
                  </Button.Group>
                </Modal.Footer>
              </Modal.Content>
            </Modal>
          </HStack>
          <HStack
            justifyContent={'center'}
            zIndex={1}
            mb={-5}
            style={{marginTop: 'auto'}}
            //</VStack> style={{marginTop: 'auto'}}
          >
            <Button
              onPress={handleBus}
              variant="subtle"
              width={'50%'}
              borderRadius={'none'}
              _text={{color: 'white'}}
              bg={'blue.500'}>
              Search
            </Button>
          </HStack>
          <HStack>
            {open && (
              <View style={{backgroundColor: 'white'}}>
                <DateTimePicker
                  // isVisible={open}
                  testID="dateTimePicker"
                  value={date}
                  mode="date"
                  is24Hour={true}
                  onChange={onChangeDateFrom}
                  style={{backgroundColor: 'white'}}
                  onConfirm={() => {
                    setOpen(false);
                  }}
                  onCancel={() => {
                    setOpen(false);
                  }}
                />
              </View>
            )}
            {show && (
              <View style={{backgroundColor: 'white'}}>
                <DateTimePicker
                  // isVisible={open}
                  testID="dateTimePicker2"
                  value={dateTo}
                  mode="date"
                  is24Hour={true}
                  onChange={onChangeDateTo}
                  style={{backgroundColor: 'white'}}
                  onConfirm={() => {
                    setShow(false);
                  }}
                  onCancel={() => {
                    setShow(false);
                  }}
                />
              </View>
            )}
          </HStack>
        </VStack>
      </View>
    </ImageBackground>
  );
}
