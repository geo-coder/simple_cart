import { useState } from "react";
import "./App.css";

const picSize = 250;

const items = [
  {
    name: "computer",
    id: 1,
    desc: "really nice thing 1",
    price: 25.5,
    image: `https://picsum.photos/id/1/${picSize}`,
  },
  {
    name: "mug",
    id: 2,
    desc: "really nice thing 2",
    price: 12.25,
    image: `https://picsum.photos/id/30/${picSize}`,
  },
  {
    name: "Lighthouse",
    id: 3,
    desc: "really nice thing 3",
    price: 42.25,
    image: `https://picsum.photos/id/58/${picSize}`,
  },
  {
    name: "Grapes",
    id: 4,
    desc: "really nice thing 3",
    price: 5.25,
    image: `https://picsum.photos/id/75/${picSize}`,
  },
  {
    name: "Game controller",
    id: 5,
    desc: "really nice thing 3",
    price: 42.25,
    image: `https://picsum.photos/id/96/${picSize}`,
  },
  {
    name: "Raspberries",
    id: 6,
    desc: "really nice thing 3",
    price: 2.25,
    image: `https://picsum.photos/id/102/${picSize}`,
  },
];

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(true);

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

  function handleChangeQuantity(item, newQuantity) {
    if (newQuantity < 1 || newQuantity > 10) return;
    const foundIndex = cartItems.findIndex((e) => e.id === item.id);
    item.quantity = newQuantity;
    let copy = [...cartItems];
    copy[foundIndex] = item;
    setCartItems(copy);
  }

  function handleRemoveFromCart(id) {
    const foundIndex = cartItems.findIndex((e) => e.id === id);
    setCartItems(cartItems.toSpliced(foundIndex, 1));
  }

  function handleToggleShowCart() {
    setShowCart((currentState) => !currentState);
  }

  return (
    <div className="App">
      <header>
        <h1>Retail Corp</h1>
        <input type="text" placeholder="Placeholder"></input>
        <div className="header-cart">
          <CartTotal
            cartItems={cartItems}
            handleToggleShowCart={handleToggleShowCart}
            showCart={showCart}
          />
        </div>
      </header>
      <div className="shop">
        <div className="filters"></div>
        <ItemList
          items={items}
          onAddToCart={handledAddToCart}
          cartItems={cartItems}
        />
        {showCart ? (
          <div className="cart">
            <Total cartItems={cartItems} />
            <CartList
              cartItems={cartItems}
              onRemoveFromCart={handleRemoveFromCart}
              handleChangeQuantity={handleChangeQuantity}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}

function ItemList({ items, onAddToCart }) {
  return (
    <div className="item-list">
      {items.map((item) => (
        <Item item={item} onAddToCart={onAddToCart} key={item.id} />
      ))}
    </div>
  );
}

function Item({ item, onAddToCart }) {
  return (
    <div className="item">
      <img src={item.image} alt={item.name} />

      <h2>{item.name}</h2>
      <p>{item.desc}</p>

      <p>${item.price}</p>

      <button className="add-button" onClick={() => onAddToCart(item, 1)}>
        Add to Cart
      </button>
    </div>
  );
}

function CartList({ cartItems, onRemoveFromCart, handleChangeQuantity }) {
  return (
    <div>
      {cartItems.map((cartItem) => (
        <CartItem
          cartItem={cartItem}
          key={cartItem.id}
          onRemoveFromCart={onRemoveFromCart}
          handleChangeQuantity={handleChangeQuantity}
        />
      ))}
    </div>
  );
}

function CartItem({ cartItem, onRemoveFromCart, handleChangeQuantity }) {
  return (
    <div className="cart-item">
      <button
        className="cart-item-close"
        onClick={() => onRemoveFromCart(cartItem.id)}
      >
        ✖️
      </button>
      <img src={cartItem.image} alt={cartItem.name} />
      <h3>{cartItem.name}</h3>
      <p>Quanity: {cartItem.quantity}</p>
      <span>
        Quantity:{" "}
        <input
          className="quantity-input"
          type="number"
          value={cartItem.quantity}
          onChange={(e) =>
            handleChangeQuantity(cartItem, Number(e.target.value))
          }
        ></input>
      </span>
    </div>
  );
}

function Total({ cartItems }) {
  const pricesPerItem = cartItems.map((item) => item.price * item.quantity);
  const total = pricesPerItem.reduce((total, num) => total + num, 0);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const numberOfItems = cartItems.reduce(
    (total, num) => total + num.quantity,
    0
  );

  const totalString = formatter.format(total);

  return (
    <div>
      <p>
        {numberOfItems} {numberOfItems > 1 ? "items" : "item"} in Cart
      </p>
      <p>Subtotal</p>
      <h2>
        <span className="cents">$</span>
        {totalString.slice(1, totalString.length - 3)}
        <span className="cents">{totalString.slice(-2)}</span>
      </h2>
    </div>
  );
}

function CartTotal({ cartItems, handleToggleShowCart, showCart }) {
  const numberOfItems = cartItems.reduce(
    (total, num) => total + num.quantity,
    0
  );
  return (
    <span onClick={handleToggleShowCart}>
      🛒{numberOfItems}
      {showCart ? "🔻" : null}
    </span>
  );
}

export default App;
