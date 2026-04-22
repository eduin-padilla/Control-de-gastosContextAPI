import { useState, useEffect} from "react"
import type {DraftExpense, Value} from "../types"
import { Categories } from "../data/Categories";
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css'
import 'react-calendar/dist/Calendar.css'
import ErrorMessage from "./ErrorMessage";
import { useBudget }  from "../hooks/useBudget";

export default function ExpenseForm() {


    const [expense, setExpense] = useState<DraftExpense>({
        expenseName: '',
        amount: 0,
        category: '',
        date: new Date()
    })

    const [error , setError] = useState<string>('')
    
    const {dispatch, state, remainingBudget} = useBudget()
    const [previusAmount,  setPreviusAmount] = useState(0)

    useEffect(() => {
        if(state.editingId) {
            const editingExpense = state.expense.find(currenteExpense => currenteExpense.id === state.editingId)
            if(editingExpense) {
                // eslint-disable-next-line react-hooks/set-state-in-effect
                setExpense(editingExpense)
                setPreviusAmount(editingExpense.amount)
            }
        }
    },[state.editingId, state.expense])


    //coonvirtiendo el valor del input a numero en caso de ser el campo de monto, de lo contrario se mantiene como string
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value } = e.target
        const isAmountField = ['amount'].includes(name)

        setExpense({
            ...expense,
            [name]: isAmountField ? +value : value
        })
    }
    
    //leyendo la fecha 
    const handleChangeDate = (value : Value) => {
        setExpense({
            ...expense,
            date: value
        })
    }

    //validando el formulario 
    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) =>{

        e.preventDefault()
        
        if(Object.values(expense).includes('')) {
            setError('todos los campos son obligatorios')
            return 
        }
        if((expense.amount - previusAmount) > remainingBudget) {
            setError('te estas pasando del presupuesto')
            return
        }

        if(state.editingId) {
            dispatch({type: 'update-expense', payload:{expense: {id: state.editingId, ...expense}}})
        }else{

            dispatch({type: 'add-expense', payload: {expense}})
        }

        //reiniciar formulario
        setExpense({
            expenseName: '',
            amount: 0,
            category: '',
            date: new Date()
        })
        setPreviusAmount(0)

    }
    

    return (
        <>
            <form action="" className="space-y-5" onSubmit={handleSubmit}>
                <legend className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2"> {state.editingId ? 'Editar Gasto' : 'Nuevo Gasto'} </legend>

                {error && <ErrorMessage>{error}</ErrorMessage>}

                <div className=" flex flex-col gap-2"> 
                    <label
                    htmlFor="expenseName"
                    className="text-xl font-black "
                    >
                        Nombre del Gasto
                    </label>

                    <input
                    type="text"
                    id="expenseName"
                    placeholder="Nombre del gasto"
                    className="border  border-gray-400 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 "
                    name="expenseName"
                    value={expense.expenseName}
                    onChange={handleChange}
                    />
                </div>

                <div className=" flex flex-col gap-2"> 
                    <label
                    htmlFor="expenseAmount"
                    className="text-xl font-black"
                    >
                        Monto del Gasto
                    </label>

                    <input
                    type="number"
                    min={1}
                    id="amount"
                    placeholder="Monto del gasto"
                    className="border border-gray-400 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 "
                    name="amount"
                    value={expense.amount}
                    onChange={handleChange}
                    />
                </div>

                <div className=" flex flex-col gap-2"> 
                    <label
                    htmlFor="category"
                    className="text-xl font-black"
                    >
                        Categorias
                    </label>

                    <select
                    id="category"
                    className="border border-gray-400 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 "
                    name="category"
                    value={expense.category}
                    onChange={handleChange}
                    > 
                    <option
                    
                    value="">-- Selecciona la categoria --</option>
                    {Categories.map(category => (
                        <option 
                        key={category.id}
                        value={category.id}                        
                        >
                            {category.name}
                        </option>
                    ))}
                    </select>
                </div>

                <div className=" flex flex-col gap-2"> 
                    <label
                    className="text-xl font-black"
                    htmlFor="date"
                    >
                        Fecha del gasto
                    </label>

                    <DatePicker 
                    className="rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 "
                    
                    value={expense.date}
                    onChange={handleChangeDate}
                    />
                </div>

                <input
                type="submit"
                value={state.editingId ? 'Actualizar Gasto' : 'Agregar Gasto'}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold w-full p-2 px-4 rounded-md cursor-pointer "
                />
            </form>
        </>
    )
}
