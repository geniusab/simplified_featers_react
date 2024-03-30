import Button from "../ui/Button";
import Modal from "../ui/Modal";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
import CabinTable from "../features/cabins/CabinTable";

// function AddCabin() {
//   const [isOpenModal, setIsOpenModal] = useState(false);
//   return (
//     <>
//       <Button onClick={() => setIsOpenModal((show) => !show)}>
//         Add new cabin
//       </Button>
//       {isOpenModal && (
//         <Modal onClose={() => setIsOpenModal(false)}>
//           <CreateCabinForm onCloseModule={() => setIsOpenModal(false)} />
//         </Modal>
//       )}
//     </>
//   );
// }
function AddCabin() {
  return (
    <Modal>
      <Modal.Open opens="cabin-form">
        <Button type="button">Add new Cabin</Button>
      </Modal.Open>
      <Modal.Window name="cabin-form">
        <CreateCabinForm />
      </Modal.Window>

      {/* example */}
      {/* <Modal.Open opens="table">
        <Button type="button">Show table</Button>
      </Modal.Open>
      <Modal.Window name="table">
        <CabinTable />
      </Modal.Window> */}
    </Modal>
  );
}

export default AddCabin;
