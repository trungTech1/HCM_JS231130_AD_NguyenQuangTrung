import react, { useEffect, useState } from "react";
import "./style.scss";
import PropTypes from "prop-types";
const Body = ({ isCartVisible, setIsCartVisible, cart, setCart }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const existingData = localStorage.getItem("data");
    const existingCart = localStorage.getItem("cart");
    if (existingData) {
      setData(JSON.parse(existingData));
    } else {
      const initialData = [
        {
          id: 1,
          name: "Điện thoại Samsung Galaxy S21",
          price: 1000,
          img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrTL_9TYnlvUUKLMbD_gK331FRWQmii6dcFw&usqp=CAU",
        },
        {
          id: 2,
          name: "Điện thoại Iphone14 Promax",
          price: 2000,
          img: "https://sieuthismartphone.vn/data/product/medium/medium_qip1662979019.jpg",
        },
        {
          id: 3,
          name: "Điện thoại Samsung Galaxy S20",
          price: 3000,
          img: "https://lh3.googleusercontent.com/tepPutXJRME_-af2PDjEIGykSKSm7jlgayO-LOoTXqwx3nhHa-rbH6zJrmad8yUFhUwoZPrC-p6VMgv6uQFsikvFj3oG8EY",
        },
        {
          id: 4,
          name: "Điện thoại Iphone11 Promax",
          price: 3000,
          img: "https://cdn.tgdd.vn/Products/Images/42/200533/iphone-11-pro-max-green-600x600.jpg",
        },
        {
          id: 5,
          name: "Điện thoại Samsung Galaxy S22",
          price: 3000,
          img: "https://cdn.tgdd.vn/Products/Images/42/231110/samsung-galaxy-s22-090222-102419-600x600.jpg",
        },
        {
          id: 6,
          name: "Điện thoại Samsung Galaxy S23",
          price: 3000,
          img: "https://cdn.tgdd.vn/Products/Images/42/264060/samsung-galaxy-s23-600x600.jpg",
        },
        {
          id: 7,
          name: "Điện thoại Oppo A9",
          price: 3000,
          img: "https://down-vn.img.susercontent.com/file/vn-11134201-23030-h7qtiiygz9nv74",
        },
        {
          id: 8,
          name: "Điện thoại Oppo V5",
          price: 3000,
          img: "https://cdn.tgdd.vn/Products/Images/42/89027/vivo-v5-1-600x600.jpg",
        },
        {
          id: 9,
          name: "Điện thoại Oppo A5s",
          price: 3000,
          img: "https://cdn.tgdd.vn/Products/Images/42/200330/oppo-a5s-do-600x600-1-600x600.jpg",
        },
        {
          id: 10,
          name: "Điện thoại Oppo A73",
          price: 3000,
          img: "https://cdn.tgdd.vn/Products/Images/42/227296/oppo-a73-600jpg-600x600.jpg",
        },
      ];
      setData(initialData);
      localStorage.setItem("data", JSON.stringify(initialData));
    }
    if (existingCart) {
      setCart(JSON.parse(existingCart));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  const addToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };
  const decreaseQuantity = (id) => {
    setCart(
      cart
        .map((item) =>
          item.id === id && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0) // Xóa sản phẩm khỏi giỏ hàng nếu số lượng về 0
    );
  };
  const increaseQuantity = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  return (
    <>
      <div className="container" onClick={() => setIsCartVisible(false)}>
        <h1>DANH SÁCH SẢN PHẨM</h1>
        <div className="row">
          {data.map((item) => (
            <div className="col-3" key={item.id}>
              <div className="card">
                <img src={item.img} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">{item.price}</p>
                  <button onClick={() => addToCart(item)}>
                    Thêm vào giỏ hàng
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={`cart ${isCartVisible ? "show" : ""}`}>
        <div className="title">
          {" "}
          <h3>Cart</h3>
        </div>

        {cart.map((item, index) => (
          <div key={index} className="showCart">
            <div className="cart-hero">
              <div className="cart-info">
                <img src={item.img} alt="" />
                <h5>{item.name}</h5>
              </div>
              <div className="cartButton-group">
                <button onClick={() => increaseQuantity(item.id)}>+</button>
                <p>{item.quantity}</p>
                <button onClick={() => decreaseQuantity(item.id)}>-</button>
                <button onClick={() => removeFromCart(item.id)}>Xóa</button>
              </div>
            </div>
          </div>
        ))}
        <div className="cart-total">
          <h4>Total Price: {totalPrice}</h4>
        </div>
      </div>
    </>
  );
};

Body.propTypes = {
  isCartVisible: PropTypes.bool.isRequired,
  setIsCartVisible: PropTypes.func.isRequired,
  cart: PropTypes.array.isRequired,
  setCart: PropTypes.func.isRequired,
};

export default Body;
