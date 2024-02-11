import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {useContext} from 'react';
//import CookieManager from 'react-native-cookies';
import axios from 'axios';
import {
  fetchItems,
  fetchItemById,
  createItem,
  updateItem,
  editItem,
  deleteItem,
} from '../../../api';
import {getItem, setItem} from '../../srceen/utils/asyncStorage';
import AuthContext from '../../component/authContext';

export const fetchItemsAsync = createAsyncThunk(
  'items/fetchItems',
  async ({endpoint}) => {
    const response = await fetchItems(endpoint);

    return response.data;
  },
);
export const fetchItemByIdAsync = createAsyncThunk(
  'items/fetchItemById',
  async ({endpoint, itemId}) => {
    try {
      const response = await fetchItemById(endpoint, itemId);
      console.log(response, 'response');
      return response.data;
    } catch (error) {
      console.log('Reject', error);
      if (error.response && error.response.data && error.response.data.errors) {
        return rejectWithValue({
          message: error.response.data.message,
          errors: error.response.data.errors,
          // other fields you want to include
        });
      } else if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        // Handle the case where the API returns a specific error message
        return rejectWithValue({message: error.response.data.message});
      } else {
        throw error; // Throw the original error if it doesn't match the expected structure
      }
    }
  },
);

export const createItemAsync = createAsyncThunk(
  'items/createItem',
  async ({endpoint, item}, {rejectWithValue}) => {
    try {
      const response = await createItem(endpoint, item);

      if (response.data.status) {
        return response.data;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.log('Reject', error);
      if (error.response && error.response.data && error.response.data.errors) {
        return rejectWithValue({
          message: error.response.data.message,
          errors: error.response.data.errors,
          // other fields you want to include
        });
      } else if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        // Handle the case where the API returns a specific error message
        return rejectWithValue({message: error.response.data.message});
      } else {
        throw error; // Throw the original error if it doesn't match the expected structure
      }
    }
  },
);

// export const loginAsync = createAsyncThunk(
//   'auth/login',
//   async ({endpoint, item}) => {
//     try {
//       // Perform login API call and get user and token data
//       const response = await createItem(endpoint, item);
//       console.log('dfdfs', response);
//       const user = response.data;
//       // const rawCookies = response.headers['set-cookie'];
//       // const accessTokenMatch =
//       //   rawCookies && rawCookies[0].match(/access_token=([^;]+)/);
//       // const accessToken = accessTokenMatch ? accessTokenMatch[1] : null;
//       // const token = accessToken;

//       // // Set user and token in the authentication context
//       // const {setUser, setToken} = useAuth();
//       // setUser(user);
//       // setToken(token);

//       // // Set user and token in the local storage
//       // setItem('user', JSON.stringify(user));
//       // setItem('access_token', token);

//       return user;
//     } catch (error) {
//       console.error('Error:', error.message);
//       throw error; // Handle login failure if needed
//     }
//   },
// );

export const updateItemAsync = createAsyncThunk(
  'items/updateItem',
  async ({endpoint, itemId, item}) => {
    try {
      const response = await updateItem(endpoint, itemId, item);
      return response.data;
    } catch (error) {
      throw new Error('Update failed');
    }
  },
);

export const editItemAsync = createAsyncThunk(
  'items/editItem',
  async ({endpoint, item}) => {
    try {
      const response = await editItem(endpoint, item);
      return response.data;
    } catch (error) {
      throw new Error('Edit failed');
    }
  },
);

export const deleteItemAsync = createAsyncThunk(
  'items/deleteItem',
  async ({endpoint, itemId}) => {
    try {
      await deleteItem(endpoint, itemId);
      return itemId;
    } catch (error) {
      throw new Error('Deleted failed');
    }
  },
);

const itemsSlice = createSlice({
  name: 'items',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
    item: null,
    itemId: null,
  },
  reducers: {
    setItemId: (state, action) => {
      state.itemId = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      // .addCase(loginAsync.fulfilled, (state, action) => {
      //   state.items = [action.payload];
      //   state.status = 'success';
      //   state.error = null;
      // })
      // .addCase(loginAsync.rejected, (state, action) => {
      //   state.status = 'fail';
      //   state.error = action.error.message;
      // })
      .addCase(fetchItemsAsync.pending, state => {
        state.loading = true;
        state.status = 'loading';
      })
      .addCase(fetchItemsAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchItemsAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchItemByIdAsync.pending, state => {
        state.loading = true;
        state.status = 'loading';
      })
      .addCase(fetchItemByIdAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.item = action.payload;
      })
      .addCase(fetchItemByIdAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createItemAsync.pending, (state, action) => {
        state.loading = true;
        state.status = 'loading';
      })
      .addCase(createItemAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = [action.payload];
      })
      .addCase(createItemAsync.rejected, (state, action) => {
        state.status = 'fail';
        state.error = action.error.message;
      })
      .addCase(updateItemAsync.pending, (state, action) => {
        state.loading = true;
        state.status = 'loading';
      })
      .addCase(updateItemAsync.fulfilled, (state, action) => {
        state.status = 'success';
        state.items = [action.payload];
      })
      .addCase(updateItemAsync.rejected, (state, action) => {
        state.status = 'fail';
        state.error = action.payload;
      })
      .addCase(editItemAsync.pending, (state, action) => {
        state.loading = true;
        state.status = 'loading';
      })
      .addCase(editItemAsync.fulfilled, (state, action) => {
        state.status = 'success';
        state.items = [action.payload];
      })
      .addCase(editItemAsync.rejected, (state, action) => {
        state.status = 'fail';
        state.error = action.payload;
      })
      .addCase(deleteItemAsync.pending, (state, action) => {
        state.loading = true;
        state.status = 'loading';
      })
      .addCase(deleteItemAsync.fulfilled, (state, action) => {
        state.status = 'success';
        state.items = action.payload;
      })
      .addCase(deleteItemAsync.rejected, (state, action) => {
        state.status = 'fail';
        state.error = action.payload;
      });
  },
});

export default itemsSlice.reducer;
