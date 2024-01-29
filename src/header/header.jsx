import react from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";
import "./style.scss";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
const Header = ({ isCartVisible, setIsCartVisible, cart }) => {
  const [totalQuantity, setTotalQuantity] = useState(0);

  useEffect(() => {
    const quantity = cart.reduce((total, item) => total + item.quantity, 0);
    setTotalQuantity(quantity);
  }, [cart]);
  return (
    <>
      <div className="Header-container">
        <div className="left-header">
          {" "}
          <ul className="header-logo">
            <li>
              <Link>Trang chủ</Link>
            </li>
            <li>
              <Link>Danh sách sản phẩm</Link>
            </li>
          </ul>
        </div>

        <div className="header_cart">
          <div className="header_cart_price"></div>
          <ul>
            <li>
              <button onClick={() => setIsCartVisible(!isCartVisible)}>
                <AiOutlineShoppingCart />
                <span>{totalQuantity}</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
Header.propTypes = {
  isCartVisible: PropTypes.bool.isRequired,
  setIsCartVisible: PropTypes.func.isRequired,
  cart: PropTypes.array.isRequired,
};
export default Header;
