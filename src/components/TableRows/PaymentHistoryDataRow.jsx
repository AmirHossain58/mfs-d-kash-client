import PropTypes from 'prop-types'
const PaymentHistoryDataRow = ({payment,i}) => {
  return (
    <tr>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        {i+1}
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        {payment?.email}
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        {  <p className='text-gray-900 whitespace-no-wrap'>
            {payment?.type}
            </p>}
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>
        BDT: {payment?.amount}
            </p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>
            {payment?.receiver}
            </p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>
        {new Date(payment?.timeStamp).toLocaleString()}
        </p>
      </td>
    </tr>
  )
}

PaymentHistoryDataRow.propTypes = {
  payment: PropTypes.object,
  i: PropTypes.number,
  refetch: PropTypes.func,
}

export default PaymentHistoryDataRow