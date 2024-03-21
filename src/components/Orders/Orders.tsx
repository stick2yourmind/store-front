import { FaCircleCheck, FaCircleXmark } from 'react-icons/fa6';

export interface IOrder {
  createdAt: string;
  userId: number;
  id: number;
  isApproved: boolean;
  total: number;
  updatedAt: string;
}

export interface IOrdersProps {
  orders: IOrder[];
}

function Orders({ orders }: IOrdersProps) {
  return (
    <table className="w-full table-auto border-collapse text-sm">
      <thead>
        <tr>
          <th className="border-b p-4 pb-3 pl-8 pt-0 text-left font-medium text-slate-400">Order Nº</th>
          <th className="border-b p-4 pb-3 pl-8 pt-0 text-left font-medium text-slate-400">Amount</th>
          <th className="border-b p-4 pb-3 pl-8 pt-0 text-left font-medium text-slate-400">Date</th>
          <th className="border-b p-4 pb-3 pl-8 pt-0 text-left font-medium text-slate-400">Approved</th>
        </tr>
      </thead>
      <tbody className="bg-white">
        {orders.map((order) => (
          <tr key={order.id}>
            <td className="border-b border-slate-100 p-4 pl-8 text-slate-500">{order.id}</td>
            <td className="border-b border-slate-100 p-4 pl-8 text-slate-500">{order.total}</td>
            <td className="border-b border-slate-100 p-4 pl-8 text-slate-500">
              {new Intl.DateTimeFormat('en-US', {
                dateStyle: 'full',
                timeStyle: 'long',
              }).format(new Date(order.createdAt))}
            </td>
            <td className="border-b border-slate-100 p-4 pl-8 text-slate-500">
              {order.isApproved ? <FaCircleCheck /> : <FaCircleXmark />}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
export default Orders;
