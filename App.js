import React from 'react';
import {View, Button, Text} from 'react-native';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import Test from './src/view/test';
import {AuthProvider} from './src/component/authContext';
// import WalkthroughScreen from './src/screen/WalkthroughScreen/WalkthroughScreen';
// import WalkthroughAppConfig from './src/srceen/WalkthroughScreen/WalkthroughAppConfig';
// import DynamicAppStyles from './src/srceen/WalkthroughScreen/DynamicAppStyles';
//import {NativeBaseProvider, Center, Button} from 'native-base';

export default function App() {
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
    <Provider store={store}>
      <AuthProvider>
        <Test />
      </AuthProvider>
    </Provider>
  );
}
