// authContext.js

import React, {createContext, useContext, useState, useEffect} from 'react';
import {getItem, setItem} from '../srceen/utils/asyncStorage';
const AuthContext = createContext();

export default AuthContext;
const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [client, setClient] = useState(null);
  const [clientToken, setClientToken] = useState(null);
  const [search, setSearch] = useState('');
  const [searchStay, setSearchStay] = useState('');
  const [searchFlightFrom, setSearchFlightFrom] = useState('');
  const [searchFlightTo, setSearchFlightTo] = useState('');
  const [searchTour, setSearchTour] = useState('');
  const [searchBusFrom, setSearchBusFrom] = useState('');
  const [searchBusTo, setSearchBusTo] = useState('');
  const [isO, setIsO] = useState(false);
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const storedToken = await getItem('access_token');
        const storeUser = await getItem('user');
        const storedTokenClient = await getItem('client_access_token');
        const storeClient = await getItem('client');
        if (storedToken) {
          setUser(storeUser);
          setToken(storedToken);
        }
        if (storedTokenClient) {
          setClient(storeClient);
          setClientToken(storedTokenClient);
        }
      } catch (error) {
        console.error('Error fetching token:', error);
      }
    };

    fetchToken();
  }, []);

  const signIn = async (userData, token) => {
    try {
      setUser(userData);
      setToken(token);
      console.log('user token--', token);
      setItem('user', JSON.stringify(userData));
      setItem('access_token', JSON.stringify(token));
    } catch (e) {
      console.log(e);
    }
  };

  const signInClient = async (clientData, token) => {
    try {
      setClient(clientData);
      setClientToken(token);
      console.log('client token--', token);
      setItem('client', JSON.stringify(clientData));
      setItem('client_access_token', JSON.stringify(token));
    } catch (e) {
      console.log(e);
    }
  };

  const authContextValue = {
    user,
    token,
    client,
    clientToken,
    signIn,
    signInClient,
    search,
    setSearch,
    searchBusFrom,
    searchBusTo,
    searchFlightFrom,
    searchFlightTo,
    searchStay,
    searchTour,
    isO,
    setSearchBusFrom,
    setSearchBusTo,
    setSearchStay,
    setSearchFlightFrom,
    setSearchFlightTo,
    setSearchTour,
    setIsO,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export {AuthProvider};
