import {useLoaderData} from "react-router-dom";
import {deleteItem, fetchData} from "../util";
import Table from "../components/Table";
import {toast} from "react-toastify";

export const expensesLoader = () => {
    const expenses = fetchData("expenses");
    return {expenses}
}

export const expensesAction = async ({request}) => {
    const data = await request.formData();
    const {_action, ...values} = Object.fromEntries(data)

    if(_action === "deleteExpense"){
        try{
            deleteItem({
                key: "expenses",
                id: values.expenseId
            })
            return toast.success("Expense deleted")
        }catch (e){
            throw new Error("There was a problem deleting your expense");
        }
    }


}

const ExpensesPage = () => {
    const {expenses} = useLoaderData();

    return (
        <div className="dashboard">
            <h1>All Expenses</h1>
            {
                expenses && expenses.length > 0 ? (
                    <div>
                        <h2 className="expense-page-h2">Recent Expenses <small>({expenses.length} total)</small></h2>
                        <Table expenses={expenses}/>
                    </div>
                ) : (
                    <p>No Expenses to Show</p>
                )
            }
        </div>
    )
}

export default ExpensesPage;