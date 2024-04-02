import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { signup as signupAPI } from "../../services/apiAuth";

export function useSignup() {
  const { mutate: signup, isPending: isLoading } = useMutation({
    mutationFn: signupAPI,
    onSuccess: () => {
      toast.success(
        "Account successfully created! Please verufy the new account from the user's email address.",
      );
    },
    onError: (err) => {
      toast.error("Something went wrong!", err.message);
    },
  });

  return { signup, isLoading };
}
