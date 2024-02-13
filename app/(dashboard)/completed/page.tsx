import { getStats } from "@/actions";
import { getCompleted } from "@/actions/get-completed";
import { getUser } from "@/lib/utilsServer";
import Completed from "./components/completed";

export default async function Complete() {
  const loansCompleted = await getCompleted();
  const userId = getUser()
  const stats = await getStats(userId?.user_id!);
  
  return (
    <div className="p-6 mx-auto max-w-[500px]">
      <div className="flex gap-">
        <span className="text-xl">Total</span>
        <span className="text-xl text-green-500">{stats.totalCompletado.toLocaleString("es-MX", {
            style: "currency",
            currency: "MXN",
          })}</span>
      </div>
      <div>
        {loansCompleted?.map(loanCompleted=>(
          <Completed 
            key={loanCompleted.id}
            loanCompleted={loanCompleted}
          />
        ))}
      </div>
    </div>
  );
}