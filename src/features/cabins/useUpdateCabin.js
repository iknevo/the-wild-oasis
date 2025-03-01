import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";

export function useUpdateCabin() {
  const queryClient = useQueryClient();
  const { mutate: updateCabin, isPending: isUpdating } = useMutation({
    mutationFn: ({ cabinData, id }) => createEditCabin(cabinData, id),
    onSuccess: () => {
      toast.success("New cabin successfully updated");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { updateCabin, isUpdating };
}
