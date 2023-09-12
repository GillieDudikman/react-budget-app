import {formatCurrency, formatDate, getAllMatchingItems} from "../util";
import {Link, useFetcher} from "react-router-dom";
import {BsFillTrash3Fill} from "react-icons/bs";

const ExpenseItem = ({expense, showBudget}) => {
    const fetcher = useFetcher();
    const budget = getAllMatchingItems({
        category: "budgets",
        key: "id",
        value: expense.budgetId
    })[0]
    return (
        <>
            <td>{expense.name}</td>
            <td>{formatCurrency(expense.amount)}</td>
            <td>{formatDate(expense.createdAt)}</td>
            {
                showBudget && (
                    <td className="table-budget">
                        <Link style={showBudget?{"--custom-color": `hsl(${budget.color})`}:""}
                        to={`budget/${budget.id}`}>{budget.name}
                        </Link></td>
                )
            }
            <td>
                <fetcher.Form method="post">
                    <input type="hidden" name="_action" value="deleteExpense"/>
                    <input type="hidden" name="expenseId" value={expense.id}/>
                    <button type="submit" aria-label={`Delete ${expense.name}`}>
                        <BsFillTrash3Fill  className="expense-trash-logo"/>
                    </button>
                </fetcher.Form>
            </td>
        </>
    )
}

export default ExpenseItem;