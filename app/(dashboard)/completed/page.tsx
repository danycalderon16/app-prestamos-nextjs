import { getStats } from "@/actions";
import { getCompleted } from "@/actions/get-completed";
import { getUser } from "@/lib/utilsServer";
import Completed from "./components/completed";
import TotalBalance from "./components/total-balance";

export default async function Complete() {
  const loansCompleted = await getCompleted();
  const userId = getUser();
  const stats = await getStats(userId?.user_id!);
  console.log(stats);

  return (
    <div className="p-6 mx-auto max-w-[500px]">
     <TotalBalance total={stats.totalCompletado}/>
      <div>
        {loansCompleted?.map((loanCompleted) => (
          <Completed key={loanCompleted.id} loanCompleted={loanCompleted} />
        ))}
      </div>
    </div>
  );
}
