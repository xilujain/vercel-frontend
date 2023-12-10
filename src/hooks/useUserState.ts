import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'

const useUserState = () => {
  const { items, userData, isLoading, isLoggedIn, error, searchTerm, ban } = useSelector(
    (state: RootState) => state.usersReduser
  )

  return {
    items,
    userData,
    isLoading,
    isLoggedIn,
    error,
    searchTerm,
    ban
  }
}

export default useUserState
