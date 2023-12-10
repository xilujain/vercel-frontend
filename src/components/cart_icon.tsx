const CartIcon = ({ value }: { value: number }) => {
  return (
    <div>
      Cart
      <span style={{ backgroundColor: 'red', color: 'white' }}>{value}</span>
    </div>
  )
}

export default CartIcon
