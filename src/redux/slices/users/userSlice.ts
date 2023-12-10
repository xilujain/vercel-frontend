import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../../api'
export const fetchUsers = createAsyncThunk('product/fetchUsers', async () => {
  const response = await api.get('/mock/e-commerce/users.json')
  return response.data
})

export type User = {
  id: number
  firstName: string
  lastName: string
  email: string
  password: string
  role: string
  ban: boolean
}

export type UsersState = {
  items: User[]
  error: null | string
  isLoading: boolean
  isLoggedIn: boolean
  userData: User | null
  searchTerm: string
  ban: boolean
}

const data =
  localStorage.getItem('loginData') !== null
    ? JSON.parse(String(localStorage.getItem('loginData')))
    : []

const initialState: UsersState = {
  items: [],
  error: null,
  isLoading: false,
  isLoggedIn: data.isLoggedIn,
  userData: data.userData,
  searchTerm: '',
  ban: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true
      state.userData = action.payload
      localStorage.setItem(
        'loginData',
        JSON.stringify({
          isLoggedIn: state.isLoggedIn,
          userData: state.userData
        })
      )
    },
    logout: (state) => {
      state.isLoggedIn = false
      state.userData = null
      localStorage.setItem(
        'loginData',
        JSON.stringify({
          isLoggedIn: state.isLoggedIn,
          userData: state.userData
        })
      )
    },
    searchUser: (state, action) => {
      state.searchTerm = action.payload
    },
    deleteUser: (state, action) => {
      const filterUsers = state.items.filter((user) => user.id !== action.payload)
      state.items = filterUsers
    },
    banUser: (state, action) => {
      const id = action.payload
      const foundUser = state.items.find((user) => user.id === id)
      if (foundUser) {
        foundUser.ban = !foundUser.ban
      }
    },
    addUser: (state, action) => {
      state.items.push(action.payload)
    },
    updateUser: (state, action) => {
      const { id, firstName, lastName } = action.payload
      const foundUser = state.items.find((user) => user.id === id)
      if (foundUser) {
        foundUser.firstName = firstName
        foundUser.lastName = lastName
        state.userData = foundUser
        localStorage.setItem(
          'loginData',
          JSON.stringify({
            isLoggedIn: state.isLoggedIn,
            userData: state.userData
          })
        )
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false
        state.items = action.payload
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.error = action.error.message || 'Error'
      })
  }
})

export const { login, logout, searchUser, deleteUser, banUser, addUser, updateUser } =
  userSlice.actions
export default userSlice.reducer
