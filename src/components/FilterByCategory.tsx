import type { ChangeEvent } from "react";
import { Categories } from "../data/Categories";
import { useBudget } from "../hooks/useBudget";


export default function FilterByCategory() {

        const { dispatch } = useBudget()

        const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
            dispatch({type: 'filter-by-category', payload: {id: e.target.value}})
        }



    return (
        <div className="bg-gray-50 p-4 max-w-3xl mx-auto mt-10 rounded-lg shadow-lg">
        <form> 
            <div className=" flex flex-col md:flex-row md:items-center gap-5"> 
                <label htmlFor="category"> Filtrar gastos </label>
                <select id="category"
                className="bg-slate-100 p-3 flex-1 rounded"
                onChange={handleChange}> 
                    <option value="">
                        Todas las categorias
                    </option>
                    {Categories.map(category => (
                        <option 
                        value={category.id}
                        key={category.id}
                        > 
                        {category.name} 
                        </option>
                    ))}
                </select>
            </div> 

        </form>
        </div>
    )
}
