import {View, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';
//import Lottie from 'lottie-react-native';
import {useNavigation} from '@react-navigation/native';
import {setItem, getItem, removeItem} from '../utils/asyncStorage';
import {Image, NativeBaseProvider, Button, Text, Heading} from 'native-base';

const {width, height} = Dimensions.get('window');

export default function OnboardingScreen() {
  const navigation = useNavigation();

  const handleDone = () => {
    setItem('onboarded', '1');
    navigation.navigate('Login');
  };

  const doneButton = ({...props}) => {
    return (
      <TouchableOpacity style={styles.doneButton} {...props}></TouchableOpacity>
    );
  };
  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <Onboarding
          onDone={handleDone}
          onSkip={handleDone}
          showDone={false}
          showSkip={false}
          bottomBarColor="#999"
          // bottomBarHighlight={false}
          DoneButtonComponent={doneButton}
          containerStyles={{paddingHorizontal: 15}}
          pages={[
            {
              backgroundColor: '#fff',
              image: (
                <View style={styles.lottie}>
                  {/* <Lottie
                  source={require('../assets/animations/boost.json')}
                  autoPlay
                  loop
                /> */}
                  <Image
                    alignSelf={'center'}
                    alt="logo"
                    source={require('../../screen/assets/images/LOGODOMNER.png')}
                  />
                  <Text></Text>
                </View>
              ),
              title: '',
              subtitle: '',
            },
            {
              backgroundColor: '#fff',
              image: (
                <View style={styles.lottie}>
                  {/* <Lottie
                  source={require('../assets/animations/work.json')}
                  autoPlay
                  loop
                /> */}
                </View>
              ),
              title: 'Work Seamlessly',
              subtitle: 'Get your work done seamlessly without interruption',
            },
            {
              backgroundColor: '#fff',
              image: (
                <View style={styles.lottie}>
                  {/* <Lottie
                  source={require('../assets/animations/work.json')}
                  autoPlay
                  loop
                /> */}
                </View>
              ),
              title: 'Work Res',
              subtitle: 'Get your work done seamlessly without interruption',
            },
            {
              backgroundColor: '#fff',
              image: (
                // <View style={styles.lottie}>
                //   {/* <Lottie
                //     source={require('../assets/animations/achieve.json')}
                //     autoPlay
                //     loop
                //   /> */}
                //   <Button className="p-20">Start</Button>
                // </View>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingHorizontal: 10,
                  }}>
                  <Image
                    alt="logo"
                    source={require('../../screen/assets/images/LOGODOMNER.png')}
                  />
                  <Text
                    style={{color: 'black', fontSize: 20, fontWeight: 'bold'}}>
                    WELCOME TO DOMNER
                  </Text>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 12,
                      fontFamily: 'nomal',
                      textAlign: 'center',
                      marginTop: 15,
                      width: 220,
                    }}>
                    EXPLORE CAMBODIA WITH US ANDCONNECT WITH OTHER EXPLORE
                  </Text>
                  {/* <TouchableOpacity
                    onPress={handleDone}
                    style={{
                      alignItems: 'center',
                      backgroundColor: 'cyan',
                      padding: 10,
                      width: 200,
                      borderRadius: 10,
                      marginTop: 10,
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        fontSize: 14,
                        fontWeight: 'bold',
                        color: 'white',
                      }}>
                      Start Now
                    </Text>
                  </TouchableOpacity> */}
                  <Button
                    onPress={handleDone}
                    mt={3}
                    size="sm"
                    variant="subtle"
                    width={40}>
                    Start now
                  </Button>
                </View>
              ),
              title: '',
              subtitle: '',
            },
          ]}
        />
      </View>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  lottie: {
    width: width * 0.9,
    height: width,
  },
  doneButton: {
    padding: 20,
    // backgroundColor: 'white',
    // borderTopLeftRadius: '100%',
    // borderBottomLeftRadius: '100%'
  },
});
