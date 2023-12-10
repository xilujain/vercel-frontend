import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'

const useCategoryState = () => {
  const { categories, isLoading, error } = useSelector(
    (state: RootState) => state.categoriesReducer
  )

  return {
    categories,
    isLoading,
    error
  }
}

export default useCategoryState
