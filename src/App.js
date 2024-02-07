import { useState } from "react";
import "./App.css";

const items = [
  {
    name: "thing 1",
    id: 1,
    desc: "really nice thing 1",
    price: 25.5,
    image: "",
  },
  {
    name: "thing 2",
    id: 2,
    desc: "really nice thing 2",
    price: 12.25,
    image: "",
  },
  {
    name: "thing 3",
    id: 3,
    desc: "really nice thing 3",
    price: 42.25,
    image: "",
  },
];

function App() {
  const [cartItems, setCartItems] = useState([]);

  function handledAddToCart(item, itemQuantity) {
    const foundIndex = cartItems.findIndex((e) => e.id === item.id);
    if (foundIndex !== -1) {
      item.quantity = item.quantity + itemQuantity;
      let copy = [...cartItems];
      copy[foundIndex] = item;
      setCartItems(copy);
    } else {
      item.quantity = itemQuantity;
      setCartItems([...cartItems, item]);
    }
  }

  return (
    <div className="App">
      <ItemList items={items} onAddToCart={handledAddToCart} />
      <CartList cartItems={cartItems} />
    </div>
  );
}

function ItemList({ items, onAddToCart }) {
  return (
    <div>
      {items.map((item) => (
        <Item item={item} onAddToCart={onAddToCart} key={item.id} />
      ))}
    </div>
  );
}

function Item({ item, onAddToCart }) {
  const [itemQuantity, setItemQuantity] = useState(1);

  function handleQuantityChange(newQuantity) {
    if (newQuantity > 0 && newQuantity <= 10) setItemQuantity(newQuantity);
  }

  return (
    <div>
      <h2>{item.name}</h2>
      <p>{item.desc}</p>
      <p>{item.price}</p>
      <input
        type="number"
        value={itemQuantity}
        onChange={(e) => handleQuantityChange(Number(e.target.value))}
      />
      <button onClick={() => onAddToCart(item, itemQuantity)}>
        Add to Cart
      </button>
    </div>
  );
}

function CartList({ cartItems }) {
  return (
    <div>
      {cartItems.map((cartItem) => (
        <CartItem cartItem={cartItem} key={cartItem.id} />
      ))}
    </div>
  );
}

function CartItem({ cartItem }) {
  return (
    <div>
      <p>{cartItem.name}</p>
      <p>Quanity: {cartItem.quantity}</p>
    </div>
  );
}

export default App;
