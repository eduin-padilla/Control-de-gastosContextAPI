import {createContext, useMemo, useReducer, type Dispatch, type PropsWithChildren} from "react"
import { budgetReducer, initialState, type BudgetActions, type BudgetState} from "../reducers/BudgetReducer"

type BudgetContextProps = {
    state: BudgetState
    dispatch:  Dispatch<BudgetActions>
    totalExpense: number
    remainingBudget: number
}



// eslint-disable-next-line react-refresh/only-export-components
export const BudgetContext = createContext<BudgetContextProps>(null!)

export const BudgetProvider = ({children}: PropsWithChildren) => {
    const [state, dispatch] = useReducer(budgetReducer, initialState)

    const totalExpense  =  useMemo(() => state.expense.reduce((total, expense) => total + expense.amount, 0) , [state.expense])
    
        const remainingBudget =  state.budget - totalExpense

    return (
        <BudgetContext.Provider 
        value={{state, dispatch, totalExpense, remainingBudget}}
        >
            {children}
        </BudgetContext.Provider>
    )
}
