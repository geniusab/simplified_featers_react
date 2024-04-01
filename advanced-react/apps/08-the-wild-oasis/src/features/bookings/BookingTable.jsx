import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useBookings } from "./useBooking";
import Spinner from "../../ui/Spinner";
import Empty from "./../../ui/Empty";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../ui/Pagination";

function BookingTable() {
  const { isLoading, bookings, count } = useBookings();
  // const [searchParams] = useSearchParams();

  if (isLoading) {
    return <Spinner></Spinner>;
  }

  if (!bookings?.length) {
    return <Empty resource="bookings"></Empty>;
  }

  // const filterValue = searchParams.get("status");
  // const sortValue = searchParams.get("sortBy");

  // let filteredBookings = [];

  // if (filterValue === "checked-in") {
  //   filteredBookings = bookings.filter(({ status }) => status === filterValue);
  // } else if (filterValue === "checked-out") {
  //   filteredBookings = bookings.filter(({ status }) => status === filterValue);
  // } else if (filterValue === "unconfirmed") {
  //   filteredBookings = bookings.filter(({ status }) => status === filterValue);
  // } else {
  //   filteredBookings = bookings;
  // }

  // const [field, direction] = sortValue ? sortValue.split("-") : ["asc", "date"];
  // const modifier = direction === "asc" ? 1 : -1;

  // const sortableBookings = filteredBookings.sort(
  //   (a, b) => (a[field] - b[field]) * modifier,
  // );

  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />
        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
