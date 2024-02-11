import React, {useContext, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/authorication/LoginScreen.js';
import OnboardingScreen from '../screens/OnboardingScreen.js';
import {getItem} from '../utils/asyncStorage.js';
import RegisterScreen from '../screens/authorication/RegisterScreen.js';
import ForgetPassword from '../screens/authorication/ForgetPassword.js';
import HomeScreen from '../screens/HomeScreen.js';
import SearchScreen from '../screens/SearchScreen.js';
import HotelSearch from '../screens/service/hotel/HotelSearch.js';
import AirportSearch from '../screens/service/transport/AirportSearch.js';
import BusSearch from '../screens/service/transport/BusSearch.js';
import TouringDetailScreen from '../screens/service/tour/TouringDetailScreen.js';
import TourDetaiIImage from '../screens/service/tour/TourDetaiIImage.js';
import HotelDetailScreen from '../screens/service/hotel/HotelDetailScreen.js';
import HotelDetailImage from '../screens/service/hotel/HotelDetailImage.js';
import NotificationScreen from '../screens/NotificationScreen.js';
import ProfileScreen from '../screens/authorication/ProfileScreen.js';
import HistoryBooking from '../screens/service/HistoryBooking.js';
import MyFavorite from '../screens/service/MyFavorite.js';
import SettingScreen from '../screens/SettingScreen.js';
import MyBooking from '../screens/service/MyBooking.js';
import CardPaymentScreen from '../screens/service/CardPaymentScreen.js';
import DetialFlightScreen from '../screens/service/transport/DetialFlightScreen.js';
import PlaceListScreen from '../screens/service/PlaceListScreen.js';
import MyPayment from '../screens/MyPayment.js';
import Stay from '../screens/client/Stay.js';
import CreateStay from '../screens/client/CreateStay.js';
import AuthContext from '../../component/authContext.js';

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  const [showOnboarding, setShowOnboarding] = useState(null);
  const [showLogin, setShowLogin] = useState();
  const [user, setUser] = useState();
  const [client, setClient] = useState();
  //const {user, client} = useContext(AuthContext);
  useEffect(() => {
    const fetchData = async () => {
      const c = await getItem('client');
      const u = await getItem('user');
      setClient(c);

      setUser(u);

      checkIfAlreadyOnboarded();
    };
    fetchData();
  }, []);

  const checkIfAlreadyOnboarded = async () => {
    let onboarded = await getItem('onboarded');
    if (onboarded == 1) {
      // hide onboarding
      setShowOnboarding(false);
    } else {
      // show onboarding
      setShowOnboarding(true);
    }
  };

  if (showOnboarding == null) {
    return null;
  }

  return (
    <NavigationContainer>
      {showOnboarding ? (
        <>
          <Stack.Navigator initialRouteName="Onboarding">
            <Stack.Screen
              name="Onboarding"
              options={{headerShown: false}}
              component={OnboardingScreen}
            />
            <Stack.Screen
              name="Login"
              options={{headerShown: false}}
              component={LoginScreen}
            />
          </Stack.Navigator>
        </>
      ) : (
        <Stack.Navigator
          initialRouteName={user ? 'Home' : client ? 'Stay' : 'Login'}>
          <Stack.Screen
            name="Login"
            options={{headerShown: false}}
            component={LoginScreen}
          />
          <Stack.Screen
            name="Rigister"
            options={{headerShown: false}}
            component={RegisterScreen}
          />
          <Stack.Screen
            name="Forget"
            options={{headerShown: false}}
            component={ForgetPassword}
          />
          <Stack.Screen
            name="Home"
            options={{headerShown: false}}
            component={HomeScreen}
          />
          <Stack.Screen
            name="Search"
            options={{headerShown: false}}
            component={SearchScreen}
          />
          <Stack.Screen
            name="HotelSearch"
            options={{headerShown: false}}
            component={HotelSearch}
          />
          <Stack.Screen
            name="AirportSearch"
            options={{headerShown: false}}
            component={AirportSearch}
          />
          <Stack.Screen
            name="BusSearch"
            options={{headerShown: false}}
            component={BusSearch}
          />
          <Stack.Screen
            name="TouringDetail"
            options={{headerShown: false}}
            component={TouringDetailScreen}
          />
          <Stack.Screen
            name="TourDetailImage"
            options={{headerShown: false}}
            component={TourDetaiIImage}
          />
          <Stack.Screen
            name="HotelDetail"
            options={{headerShown: false}}
            component={HotelDetailScreen}
          />
          <Stack.Screen
            name="HotelDetailImage"
            options={{headerShown: false}}
            component={HotelDetailImage}
          />
          <Stack.Screen
            name="Notification"
            options={{headerShown: false}}
            component={NotificationScreen}
          />
          <Stack.Screen
            name="Profile"
            options={{headerShown: false}}
            component={ProfileScreen}
          />
          <Stack.Screen
            name="History"
            options={{headerShown: false}}
            component={HistoryBooking}
          />
          <Stack.Screen
            name="Favorite"
            options={{headerShown: false}}
            component={MyFavorite}
          />
          <Stack.Screen
            name="Setting"
            options={{headerShown: false}}
            component={SettingScreen}
          />
          <Stack.Screen
            name="MyBooking"
            options={{headerShown: false}}
            component={MyBooking}
          />
          <Stack.Screen
            name="CreditCard"
            options={{headerShown: false}}
            component={CardPaymentScreen}
          />
          <Stack.Screen
            name="DetialFlight"
            options={{headerShown: false}}
            component={DetialFlightScreen}
          />
          <Stack.Screen
            name="PlaceSearch"
            options={{headerShown: false}}
            component={PlaceListScreen}
          />
          <Stack.Screen
            name="MyPayment"
            options={{headerShown: false}}
            component={MyPayment}
          />
          <Stack.Screen
            name="Stay"
            options={{headerShown: false}}
            component={Stay}
          />
          <Stack.Screen
            name="CreateStay"
            options={{headerShown: false}}
            component={CreateStay}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
