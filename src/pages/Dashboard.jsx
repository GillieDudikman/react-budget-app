import {Link, useLoaderData} from "react-router-dom";
import {createBudget, createExpense, deleteItem, fetchData, waiting} from "../util";
import Intro from "../components/Intro";
import {toast} from "react-toastify";
import AddBudgetForm from "../components/AddBudgetForm";
import AddExpenseForm from "../components/AddExpenseForm";
import BudgetItem from "../components/BudgetItem";
import Table from "../components/Table";

export const dashboardLoader = () => {
    const userName = fetchData("userName");
    const budgets = fetchData("budgets");
    const expenses = fetchData("expenses")
    return {userName, budgets, expenses};
}

export const dashboardAction = async ({request}) => {
    await waiting();

    const data = await request.formData();
    const {_action, ...values} = Object.fromEntries(data)

    if(_action === "newUser") {
        try {
            localStorage.setItem("userName", JSON.stringify(values.userName));
            return toast.success(`Welcome ${values.userName}!`)
        } catch (e) {
            throw new Error("Problem accused while creating your account")
        }
    }
    if(_action === "createBudget"){
        try{
            createBudget({
                name: values.newBudget,
                amount: values.newBudgetAmount
            })
            return toast.success("Budget Created!")
        }catch (e){
            throw new Error("Problem accused while creating your budget: " + e.message)
        }
    }

    if(_action === "deleteExpense"){
        try {
            deleteItem({
                key: "expenses",
                id: values.expenseId
            })
            return toast.success(`Expense deleted`)
        }catch (e){
            throw new Error("There was a problem delete your expense")
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

const Dashboard = () => {
    const {userName, budgets, expenses} = useLoaderData();

    return (
        <>
            {userName ? (
                <div className="dashboard">
                    <h1 style={{textAlign: "center"}}>
                        Welcome Back <span>{userName}!</span></h1>
                    <p style={{color: "#6495ED", textAlign: "center", paddingBottom: "20px", fontWeight:"700"}}>
                        Create budgets and expenses to manage your life!
                    </p>
                    <div>
                        {
                            budgets && budgets.length > 0 ? (
                            <div className="dashboard-main">
                                <div className="dashboard-main-adding">
                                    <AddBudgetForm/>
                                    <AddExpenseForm budgets={budgets}/>
                                </div>
                                <h2>Existing Budgets</h2>
                                <div className="budgets-main">
                                    {
                                        budgets.map(budget => (
                                            <BudgetItem key={budget.id} budget={budget}/>
                                        ))
                                    }
                                </div>
                                {
                                    expenses && expenses.length > 0 && (
                                        <div className="all-expenses">
                                            <h2>Recent Expenses</h2>
                                            <Table expenses={expenses.sort((a, b) => b.createdAt - a.createdAt)
                                                .slice(0, 8)}/>
                                            {
                                                expenses.length > 8 && (
                                                        <Link  className="all-expenses-link" to="expenses">View all expenses</Link>
                                                )
                                            }
                                        </div>
                                    )
                                }
                            </div>
                            ) : (
                                <div className="dashboard-main">
                                    <AddBudgetForm/>
                                </div>
                            )
                        }
                    </div>
                </div>
            ) : <Intro/>}
        </>
    )
}
export default Dashboard;