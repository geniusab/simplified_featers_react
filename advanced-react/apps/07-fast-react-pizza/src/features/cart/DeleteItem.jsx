import Button from "../../ui/Button";
import { useDispatch } from "react-redux";
import { deleteItem } from "./cartSlice";

function DeleteItem({ pizzaId }) {
  const dispatch = useDispatch();
  function handleDelete() {
    dispatch(deleteItem(pizzaId));
  }
  return (
    <div>
      <Button type="small" onClick={handleDelete}>
        Delete
      </Button>
    </div>
  );
}

export default DeleteItem;
