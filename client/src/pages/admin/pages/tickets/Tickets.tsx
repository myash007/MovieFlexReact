import "./tickets.css";
import { Visibility } from "@material-ui/icons";
import { useEffect, useState } from "react";
import axios from "axios";

type OrdersProps = {
  orderId: 1,
  userId: UserProps,
  theatreId: 1,
  [movieId: string]: any;
  orderDate: Object,
  showDate: Object,
  showTime: String,
  seats: [],
  orderTotal: Number,
  paymentMethod: String
}
type UserProps = {
  name: String
}

const Tickets = () => {

  const [orders, setOrders] = useState<OrdersProps[]>([]);

  useEffect(() => {
    const getAllOrders = async () => {
      try {
        const url = `http://localhost:4000/get-all-user-orders`;
        const response = await axios.get(url);
        console.log(response.data);
        setOrders(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getAllOrders();
  }, []);
  
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Booked Tickets</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Customer</th>
          <th className="widgetLgTh">Movie</th>
          <th className="widgetLgTh">Date / Time</th>
          <th className="widgetLgTh">Amount</th>
          <th className="widgetLgTh">Seats</th>
          <th className="widgetLgTh">Theatre</th>
        </tr>
        {orders.map((order) => (
        <tr className="widgetLgTr">
          <td className="widgetLgUser">

            <span className="widgetLgName">{order.userId.name}</span>
          </td>
          <td className="widgetLgName">
            <img
              src={order.movieId.image}
              alt=""
              className="widgetLgImg"
            />{order.movieId.title}</td>
          <td className="widgetLgDate"><>{order.showDate}/{order.showTime}</></td>
          <td className="widgetLgAmount"><>${order.orderTotal}</></td>
          <td className="widgetLgDate"><>{(order.seats.map((data,index) => (<>{index == order.seats.length-1 ? data : data + ", "}</>)))} </></td>
          <td className="widgetLgDate">{order.theatreId}</td>
        </tr>
        ))}
      </table>
    </div>
  )
};

export default Tickets;