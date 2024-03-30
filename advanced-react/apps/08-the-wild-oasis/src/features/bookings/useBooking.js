import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useBookings() {
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get("status");
  const sortValue = searchParams.get("sortBy") || "startDate-desc";

  const [field, direction] = sortValue.split("-");

  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };
  const sortBy =
    !sortValue || sortValue === "startDate"
      ? null
      : {
          field,
          direction,
        };
  // whith method
  // grated 5000
  // { field: "totalPrice", value: 5000, method: "gte" }

  const { isLoading, data: bookings } = useQuery({
    queryKey: ["bookings", filter, sortBy],
    queryFn: () => getBookings({ filter, sortBy }),
  });

  return { isLoading, bookings };
}
