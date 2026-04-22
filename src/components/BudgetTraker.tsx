import AmountDisplay from "./AmountDisplay";
import {useBudget} from "../hooks/useBudget";
import  {  CircularProgressbar, buildStyles} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css';

export default function BudgetTraker() {
    const {state, totalExpense, remainingBudget, dispatch} = useBudget()

    const  percentage = +((totalExpense / state.budget) * 100).toFixed(2)


    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 border-gray-300 rounded-lg p-5 shadow-lg ">
                <div className="flex justify-center">
                    <CircularProgressbar
                    value={percentage}
                    styles={buildStyles({
                        pathColor: percentage === 100  ? '#DC2626' : '#3b82f6',
                        trailColor: '#f5f5f5',
                        textSize: 8,
                        textColor: percentage === 100  ? '#DC2626' : '#3b82f6'
                    })}
                    text={`${percentage}%Gastado`}
                    />
                </div>
                <div className="flex flex-col justify-center items-center gap-5">
                    <button 
                    type="button"
                    onClick={() => dispatch({type: 'reset-app'})}
                    className="bg-pink-600 w-full p-2 text-white uppercase font-bold rounded-lg hover:bg-pink-700 transition-colors cursor-pointer">
                        Actualizar Presupuesto
                    </button>

                    <AmountDisplay 
                    label = "presupuesto"
                    amount={state.budget}
                    />

                    <AmountDisplay
                    label = "disponible"
                    amount={remainingBudget}
                    />

                    <AmountDisplay
                    label = "gastado"
                    amount={totalExpense}
                    />
                </div>
            </div>
        </>
    )
}
