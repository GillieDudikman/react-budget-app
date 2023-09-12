import ExpenseItem from "./ExpenseItem";

const Table = ({expenses, showBudget=true}) => {
    return (
        <div className="table-main">
            <table className="table">
                <thead>
                    <tr className="table-head-tr">
                        {
                            ["Name", "Amount", "Date", showBudget? "Budget" : "", ""].map((i, index) => (
                                <th key={index}>{i}</th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                {
                    expenses.map(expense => (
                        <tr key={expense.id}>
                            <ExpenseItem expense={expense} showBudget={showBudget}/>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    )
}

export default Table;