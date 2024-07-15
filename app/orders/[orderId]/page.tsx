import OrderInfo from './OrderInfo'
import OrderProductList from './OrderProductList'
import OrderStatus from './OrderStatus'

interface OrderDetailParms {
  params: {
    orderId: String
  }
}

export default function OrderDetail({ params }: OrderDetailParms) {
  return (
    <div className='flex flex-col gap-3 w-full h-full'>
      Order detail {params.orderId}
      <OrderStatus />
      <OrderInfo />
      <OrderProductList />
    </div>
  )
}
