
import {useMemo, useState} from "react";
import {useBudget} from "../hooks/useBudget";


export default function BudgetForm() {
    const [budget, setBudget] = useState(0);
    const {dispatch} = useBudget()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        
        setBudget(e.target.valueAsNumber || 0);
    };
    const isValid = useMemo(() => {
        return isNaN(budget) || budget <= 0;
    }, [budget])

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        dispatch({type: "add-budget", payload: {budget}})
    }

    return (
        <>
            <form className= "space-y-5" onSubmit={handleSubmit}>
                <div className= "flex flex-col space-y-5">
                    <label htmlFor="budget" className = "text-4xl text-blue-600 font-bold text-center"> Definir Presupuesto </label>
                    <input 
                    id="budget" 
                    type="number"
                    className = "border-2 border-gray-300 rounded-lg p-2   focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" 
                    placeholder="Define tu presupuesto"
                    name="budget"
                    value={budget}
                    onChange= {handleChange}
                    min={0}
                    />
                </div>
                <input
                type="submit"
                value="definir presupuesto"
                className="w-full bg-blue-600 uppercase text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer disabled:opacity-40"
                disabled={isValid}
                />
            </form>
        </>
    )
}
