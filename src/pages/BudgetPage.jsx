import {createExpense, deleteItem, getAllMatchingItems} from "../util";
import {useLoaderData} from "react-router-dom";
import BudgetItem from "../components/BudgetItem";
import AddExpenseForm from "../components/AddExpenseForm";
import Table from "../components/Table";
import {toast} from "react-toastify";

export const budgetLoader = async ({params}) => {
    const budget = await getAllMatchingItems({
        category: "budgets",
        key: "id",
        value: params.id
    })[0];

    const expenses = await getAllMatchingItems({
        category: "expenses",
        key: "budgetId",
        value: params.id
    });

    if(!budget){
        throw new Error("The budget you are trying to get does not exist");
    }

    return {budget, expenses};
}

export const budgetAction = async ({request}) => {
    const data = await request.formData();
    const {_action, ...values} = Object.fromEntries(data);

    if(_action === "deleteExpense"){
        try{
            deleteItem({
                key: "expenses",
                id: values.expenseId
            })
            return toast.success("Expense deleted")
        }catch (e){
            throw new Error("There was a problem delete expense")
        }
    }

    if(_action === "createExpense"){
        try{
            createExpense({
                name: values.newExpense,
                amount: values.newExpenseAmount,
                budgetId: values.newExpenseBudget
            })
            return toast.success(`Expense ${values.newExpense} created!`)
        }catch (e) {
            throw new Error("Problem accused while creating your expense")
        }
    }
}

const BudgetPage = () => {
    const {budget, expenses} = useLoaderData();
    return (
        <div className="dashboard">
            <h1><span style={{color: `hsl(${budget.color})`}}>{budget.name}</span> Overview</h1>
            <div className="overview-top">
                <BudgetItem budget={budget} showDelete={true}/>
                <AddExpenseForm budgets={[budget]}/>
            </div>
            {
                expenses && expenses.length > 0 && (
                    <div className="overview-table">
                        <h2><span style={{color: `hsl(${budget.color})`}}>{budget.name}</span> Expenses</h2>
                        <Table expenses={expenses} showBudget={false}/>
                    </div>
                )
            }
        </div>
    )
}

export default BudgetPage;