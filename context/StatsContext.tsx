import { createContext, useState } from "react";
interface Loan {
    id: number;
    amount: number;
};
interface StatsContextInterface {
    loans: Loan[];
    saveAbono: (stats: Loan) => void;
    calculateTotal: () => number
}

const initialState: StatsContextInterface = {
    loans: [],
    saveAbono: (loan: Loan) => { },    
    calculateTotal: () => 0
};

const INITIALSTATELOAN: Loan[] = [
    {
        id: 0,
        amount: 0
    }
];

export const StatsContext = createContext(initialState);

const StatsContextProvider = ({ children }: React.PropsWithChildren) => {
    const [loans, setLoan] = useState<Loan[]>(INITIALSTATELOAN);

    const saveAbono = (loan: Loan) => {
        setLoan(prevLoans => {
            const existingLoan = prevLoans.find(l => l.id === loan.id);
            if (existingLoan) {
                return prevLoans.filter(l => l.id !== loan.id)
            } else {
                return [...prevLoans, loan];
            }
        })
    }

    const calculateTotal = () => {
        return loans.reduce((acc, loan) => acc + loan.amount, 0);
    }
         
    return (
        <StatsContext.Provider
            value={{
                loans,
                saveAbono,
                calculateTotal
            }}
        >
            {children}
        </StatsContext.Provider>
    );
};

export default StatsContextProvider;