import React, { useState } from "react";
import Header from "./header/header.jsx";
import Body from "./body/body.jsx";

function App() {
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [cart, setCart] = useState([]);
  return (
    <div className="App">
      <Header
        isCartVisible={isCartVisible}
        setIsCartVisible={setIsCartVisible}
        cart={cart}
      />
      <Body
        isCartVisible={isCartVisible}
        setIsCartVisible={setIsCartVisible}
        setCart={setCart}
        cart={cart}
      />
    </div>
  );
}
export default App;
