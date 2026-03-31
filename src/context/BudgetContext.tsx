import {createContext, useReducer, type Dispatch} from "react"
import { budgetReducer, initialState, type BudgetActions, type BudgetState} from "../reducers/BudgetReducer"

type BudgetContextProps = {
    state: BudgetState
    dispatch:  Dispatch<BudgetActions>
}

type BudgetProviderProps = {
    children: React.ReactNode
}

// eslint-disable-next-line react-refresh/only-export-components
export const BudgetContext = createContext<BudgetContextProps>(null!)

export const BudgetProvider = ({children}: BudgetProviderProps) => {
    const [state, dispatch] = useReducer(budgetReducer, initialState)

    return (
        <BudgetContext.Provider 
        value={{state, dispatch}}
        >
            {children}
        </BudgetContext.Provider>
    )
}
