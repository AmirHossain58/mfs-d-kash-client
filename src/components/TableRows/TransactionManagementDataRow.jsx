import { useMutation } from '@tanstack/react-query';
import PropTypes from 'prop-types'
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
const TransactionManagementDataRow = ({payment,i,refetch}) => {
  const axiosSecure = useAxiosSecure();

  const { user, setUser, loading,} = useAuth();
  const { mutateAsync } = useMutation({
    mutationFn: async (senderData) => {
      const { data } = await axiosSecure.put(
        `/transactions-management/${user.email}`,
        senderData
      );
      console.log(data);
      return data;
    }
  });

  const handleApprove= async(data)=>{
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Approve it!"
    }).then(async(result) => {
      if (result.isConfirmed) {
         const res=await mutateAsync(data)
         if (res?.modifiedCount>0) {
          refetch()
           Swal.fire({
             title: "Approved!",
             text: "Your Transactions has been Approved.",
             icon: "success"
           });
         }
      }
    });
  }
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
        BDT: {payment?.totalAmount}
            </p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>
            
        {new Date(payment?.timeStamp).toLocaleString()}
            </p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <button onClick={()=>handleApprove(payment)} className='text-gray-900 p-2 bg-gray-300 rounded-xl whitespace-no-wrap'>
          Approves
        </button>
      </td>
    </tr>
  )
}

TransactionManagementDataRow.propTypes = {
  payment: PropTypes.object,
  i: PropTypes.number,
  refetch: PropTypes.func,
}

export default TransactionManagementDataRow