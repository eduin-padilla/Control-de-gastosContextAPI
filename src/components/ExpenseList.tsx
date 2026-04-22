import { useMemo } from "react"
import {useBudget} from "../hooks/useBudget"
import ExpenseDtail from "./ExpenseDtail"

export default function ExpenseList() {

    const {state} = useBudget()
    
    const filterExpense = state.currentCategory ? state.expense.filter(expense => expense.category === state.currentCategory) : state.expense

    const isEmpty = useMemo(() => filterExpense.length === 0,
    [filterExpense])

    return (
        
        <div className="bg-gray-50 p-4 max-w-3xl mx-auto mt-10 rounded-lg shadow-lg"> 
            {isEmpty ? <p className="text-gray-600 text-2xl font-bold">No hay gastos</p> : (
                <>  
                    <p className=" text-gray text-2xl font-bold my-5">Tus gastos</p>

                    {filterExpense.map(expense => (
                        <ExpenseDtail 
                            key={expense.id}
                            expense={expense}
                        />
                    ))}
                </>

            )}
        </div>
        
    )

}