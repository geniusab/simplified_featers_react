/* eslint-disable no-unused-vars */

import { useQuery } from "@tanstack/react-query";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { getCabins } from "../services/apiCabins";
import CabinTable from "../features/cabins/CabinTable";

import { useState } from "react";

import AddCabin from "./AddCabin";
import CabinTableOperations from "../features/cabins/CabinTableOperations";

function Cabins() {
  const [showForm, setShowForm] = useState(false);
  const query = useQuery({ queryKey: ["cabins"], queryFn: getCabins });

  // Mutations
  // const mutation = useMutation({
  //   mutationFn: postTodo,
  //   onSuccess: () => {
  //     // Invalidate and refetch
  //     queryClient.invalidateQueries({ queryKey: ["cabins"] });
  //   },
  // });

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        {/* <p>Filter / Sort</p> */}
        <CabinTableOperations />
      </Row>

      <Row>
        <CabinTable />
        {/* <Button onClick={() => setShowForm((show) => !show)}>
          Add new cabin
        </Button>
        {showForm && <CreateCabinForm />} */}
        <AddCabin />
      </Row>
    </>
  );
}

export default Cabins;
