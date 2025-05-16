import { createContext, use, useEffect, useState } from "react";
interface Loan {
    id: number;
    amount: number;
};
interface StatsContextInterface {
    loans: Loan[];
    saveAbono: (stats: Loan) => void;
    autoSum: number
    clearStsats: () => void;    
}

const initialState: StatsContextInterface = {
    loans: [],
    saveAbono: (loan: Loan) => { },    
    autoSum: 0,
    clearStsats: () => { }
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
    const [autoSum, setAutoSum] = useState<number>(0);

    useEffect(() => {
      setAutoSum(prev => loans.reduce((acc, loan) => acc + loan.amount, 0))
    }, [loans]);
    
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

    const clearStsats = () => {
        setLoan(INITIALSTATELOAN);
    }
         
    return (
        <StatsContext.Provider
            value={{
                loans,
                saveAbono,
                autoSum,
                clearStsats
            }}
        >
            {children}
        </StatsContext.Provider>
    );
};

export default StatsContextProvider;