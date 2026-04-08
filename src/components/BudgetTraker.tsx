import AmountDisplay from "./AmountDisplay";

export default function BudgetTraker() {
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 border-gray-300 rounded-lg p-5 shadow-lg ">
                <div className="flex justify-center">
                    <img className="" src="/public/grafico.jpg" alt="grafico" />
                </div>
                <div className="flex flex-col justify-center items-center">
                    <button 
                    type="button"
                    
                    className="bg-pink-600 w-full p-2 text-white uppercase font-bold rounded-lg hover:bg-pink-700 transition-colors cursor-pointer">
                        Actualizar Presupuesto
                    </button>

                    <AmountDisplay 
                    label = "presupuesto"
                    amount={2000}
                    />

                    <AmountDisplay
                    label = "gastado"
                    amount={900}
                    />

                    <AmountDisplay
                    label = "total"
                    amount={100}
                    />
                </div>
            </div>
        </>
    )
}
