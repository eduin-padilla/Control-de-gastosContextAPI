import { formatDate } from "../helpers"
import {useMemo} from 'react'
import type { Expense } from "../types"
import AmountDisplay from "./AmountDisplay"
import { Categories } from "../data/Categories"

import {LeadingActions, SwipeableList, SwipeableListItem, 
    SwipeAction, TrailingActions} from 'react-swipeable-list'
import 'react-swipeable-list/dist/styles.css'
import { useBudget } from "../hooks/useBudget"




type ExpenseDetailProps = {

    expense: Expense
}


export default function ExpenseDtail({expense} : ExpenseDetailProps) {

    const {dispatch} = useBudget()

    const categoryInfo = useMemo(() => Categories.filter(cat => cat.id === expense.category)[0] , [expense])

    const leadingAction = () => (
        <LeadingActions>
            <SwipeAction
                onClick={() => dispatch({type: 'edit-expense-by-id', payload: {id: expense['id']}})}
            >
                editar
            </SwipeAction>
        </LeadingActions>
    )

    const trailingAction = () => (
        <TrailingActions>
            <SwipeAction
                onClick={() => dispatch({ type: 'remove-expense', payload: { id: expense['id'] } })}
                destructive={true}
            >
                Eliminar
            </SwipeAction>
        </TrailingActions>
    )
    
    return (

        <SwipeableList>
            <SwipeableListItem
            maxSwipe={1}
            leadingActions={leadingAction()}
            trailingActions={trailingAction()}
            >
                <div className = "bg-white shadow-lg p-10 w-full border-b rounded-lg border-gray-200 flex items-center gap-5 mb-2">
                    <div>
                        <img src={`/icono_${categoryInfo.icon}.svg`} alt="icono gasto" 
                        className="w-20"
                        />
                    </div>

                    <div className="flex-1 space-y-3 "> 
                        <p className="text-sm font-bold uppercase text-slate-500 ">{categoryInfo.name}</p>
                        
                        <p className="text-transform: capitalize">{expense.expenseName}</p>
                        <p className="text-slate-600 text-sm text-transform: capitalize">{ formatDate(expense.date!.toString()) }</p>
                        
                    </div>
                    <AmountDisplay          
                        amount={expense.amount}
                    />
                </div>
            </SwipeableListItem>
        </SwipeableList>
        
    )
}
