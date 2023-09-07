import { useFetcher } from "react-router-dom";
import Button from "../../ui/Button";
import { updateOrder } from "../../services/apiRestaurant";

function UpdateOrder() {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";

  return (
    <fetcher.Form method="PATCH">
      <Button disabled={isSubmitting} type="primary">
        {isSubmitting ? "Making Priority" : "Make Priority"}
      </Button>
    </fetcher.Form>
  );
}

export async function action({ params }) {
  const data = { priority: true };
  await updateOrder(params.id, data);
  return null;
}

export default UpdateOrder;
