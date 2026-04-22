import { useEffect } from "react"
import BudgetForm from "./components/BudgetForm"
import BudgetTraker from "./components/BudgetTraker"
import ExpenseList from "./components/ExpenseList"
import ExpenseModal from "./components/ExpenseModal"
import { useBudget } from "./hooks/useBudget"
import FilterByCategory from "./components/FilterByCategory"

function App() {
  const { state } = useBudget()
  const isValidBudget = state.budget > 0
  

  useEffect(() => {
  localStorage.setItem('budget', state.budget.toString())
  localStorage.setItem('expense', JSON.stringify(state.expense))
  },[state])

  return (
    <>
      <header className="bg-blue-600 py-8 max-h-72"> 
        <h1 className="uppercase text-center font-black text-4xl text-white">
          planificador de gastos
        </h1>
      </header>

      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-10 mt-10"> 
        {isValidBudget ? <BudgetTraker /> : <BudgetForm />}
      </div>

      {isValidBudget && (
        <main className="max-w-3xl mx-auto py-10">
          <FilterByCategory/>
          <ExpenseList />
          <ExpenseModal />
        </main>
      )}

      

      
    </>
  )
}

export default App