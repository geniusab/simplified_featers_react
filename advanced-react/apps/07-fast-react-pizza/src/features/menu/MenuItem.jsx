import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  getCurrentQuantityById,
  increaseItemQuantity,
} from "../cart/cartSlice";
import DeleteItem from "../cart/DeleteItem";

function MenuItem({ pizza }) {
  const dispatch = useDispatch();
  const currentQuantity = useSelector(getCurrentQuantityById(pizza.id));
  const { cart } = useSelector((state) => state.cart);
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const isInCart = currentQuantity > 0;

  function handleToCart() {
    const newItem = {
      pizzaId: id,
      name,
      unitPrice,
      quantity: 1,
      totalPrice: unitPrice * 1,
    };
    if (cart.map((item) => item.pizzaId).indexOf(id) === -1) {
      dispatch(addItem(newItem));
    } else {
      dispatch(increaseItemQuantity(newItem));
    }
  }

  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? "opacity-70 grayscale" : ""}`}
      />
      <div className="flex grow flex-col pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="text-sm capitalize italic text-stone-500">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}

          {isInCart && <DeleteItem pizzaId={id} />}

          {!soldOut && !isInCart && (
            <Button type="small" onClick={handleToCart}>
              Add to cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
