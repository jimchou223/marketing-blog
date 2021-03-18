import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import { API_URL } from "../utils/urls";
import Link from "next/link";
import AuthContext from "../context/AuthContext";

const useOrders = (user, getToken) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  // fetch and get order
  useEffect(() => {
    const fetchOrders = async () => {
      if (user) {
        try {
          setLoading(true);
          const token = await getToken();
          const order_res = await fetch(`${API_URL}/orders`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(token)
          const data = await order_res.json();
          setOrders(data);
        } catch (err) {
          setOrders([]);
        }
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user]);

  return { orders, loading };
};

const Account = () => {
  const { user, logoutUser, getToken } = useContext(AuthContext);
  const { orders, loading } = useOrders(user, getToken);
  console.log(orders);
  if (!user) {
    return (
      <div>
        <p>Please login or resgister</p>
        <Link href="/">
          <a>Go back</a>
        </Link>
      </div>
    );
  }
  return (
    <div>
      <Head>
        <title>Account Page</title>
        <meta name="description" content="account information page"></meta>
      </Head>

      <h2>Account info</h2>

      <h3>Your orders</h3>
      {loading && <p>Loading Your order</p>}
      {orders.map((order) => {
        return (
          <div key={order.id}>
            {new Date(order.created_at).toLocaleDateString()} {order.product.name} ${order.total} {order.status}
          </div>
        );
      })}

      <hr />
      <p>Logged in as {user.email}</p>
      <a onClick={logoutUser} href="#">
        Logout
      </a>
    </div>
  );
};

export default Account;
