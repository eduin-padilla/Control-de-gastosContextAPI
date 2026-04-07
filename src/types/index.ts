export type Expense = {
    id: number
    expenseName: string
    amount: number
    category: string
    date: Value
}

export type DraftExpense = Omit<Expense, "id"> 

type ValuePiece = Date | null;

export type Value = ValuePiece | [ValuePiece, ValuePiece];

export type Category = {
    id: number
    name: string
    icon: string
}