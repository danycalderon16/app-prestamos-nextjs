import { getDeletes } from "@/actions/get-deletes";
import { DeletesLoans } from "./components/loans";

export default async function DeletePage() {
  const deletes = await getDeletes();
  return (
    <div className="m-4">
      <DeletesLoans deletes={deletes??[]} />
    </div>
  );
}