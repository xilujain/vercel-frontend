import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'

const useProductState = () => {
  const { items, isLoading, error, searchTerm, productData } = useSelector(
    (state: RootState) => state.productsReduser
  )

  return {
    items,
    isLoading,
    error,
    searchTerm,
    productData
  }
}

export default useProductState
