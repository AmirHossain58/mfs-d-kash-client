import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import PaymentHistoryDataRow from "../../../components/TableRows/PaymentHistoryDataRow";

import { Helmet } from "react-helmet-async";

const TransactionHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["transactions-history", user.email],
    queryFn: async () => {
      const res = await axiosSecure(`/transactions-history/${user.email}`);
      return res?.data;
    },
  });

  return (
    <div>
      <Helmet>
        <title>Dashboard | Payment History</title>
      </Helmet>
      <div className="flex justify-evenly mt-20">
        <h4 className="text-4xl">Total Payments: {payments?.length}</h4>
      </div>
      <div className="container min-h-[calc(100vh-250px)] mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      #
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      EMAIL /Mobile
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      type
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      amount
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Send To
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      PAYMENT DATE
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* Table Row Data */}
                  {payments &&
                    payments?.map((payment, i) => (
                      <PaymentHistoryDataRow
                        i={i}
                        payment={payment}
                        key={i}
                      ></PaymentHistoryDataRow>
                    ))}
                </tbody>
              </table>
              {payments?.length === 0 && (
                <p className="text-center text-xl md:text-4xl">
                  No payment history found.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;
