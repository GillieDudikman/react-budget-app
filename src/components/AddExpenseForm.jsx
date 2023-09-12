import {useFetcher} from "react-router-dom";
import {useEffect, useRef} from "react";
import {AiFillPlusCircle} from "react-icons/ai";
import {BiRefresh} from "react-icons/bi";

const AddExpenseForm = ({budgets}) => {
    const fetcher = useFetcher();
    const formRef = useRef();
    const focusRef = useRef();

    const isSubmitting = fetcher.state === "submitting";

    useEffect(() => {
        if(!isSubmitting){
            formRef.current.reset();
            focusRef.current.focus();
        }
    }, [isSubmitting]);

    return(
        <div className="form-wrapper">
            <h2 className="form-wrapper-title">Add New <span>
                {budgets.length === 1 && `${budgets.map(budget => budget.name)}`}
            </span>{" "}Expense</h2>
            <fetcher.Form method="post" ref={formRef}>
                <div>
                    <div className="form-wrapper-section">
                        <label htmlFor="newExpense">Expense Name</label>
                        <input type="text" name="newExpense" id="newExpense" placeholder="e.g., Coffee" ref={focusRef} required/>
                    </div>
                    <div className="form-wrapper-section">
                        <label htmlFor="newExpenseAmount">Amount</label>
                        <input type="number" step="0.01" name="newExpenseAmount" inputMode="decimal" id="newExpenseAmount" placeholder="e.g., 3.50" required/>
                    </div>
                    <div hidden={budgets.length === 1} className="form-wrapper-section">
                        <label htmlFor="newExpenseBudget">Budget Category</label>
                        <select name="newExpenseBudget" id="newExpenseBudget" required>
                            {
                                budgets.sort((a, b) => a.createdAt - b.createdAt)
                                    .map(budget => {
                                        return (
                                            <option key={budget.id} value={budget.id}>{budget.name}</option>
                                        )
                                    })
                            }
                        </select>
                    </div>
                </div>
                <input type="hidden" name="_action" value="createExpense"/>
                <div className="form-wrapper-buttons">
                    <button type="submit" disabled={isSubmitting}>
                        {
                            isSubmitting ? <span>Submitting...</span> : (
                                <>
                                    <span>Add Expense</span>
                                    <AiFillPlusCircle className="form-wrapper-logo"/>
                                </>
                            )
                        }
                    </button>
                    <button type="reset" onClick={() => {focusRef.current.focus(); formRef.current.reset()}}>
                        <span>Reset</span>
                        <BiRefresh className="form-wrapper-logo"/>
                    </button>
                </div>
            </fetcher.Form>
        </div>
    )
}

export default AddExpenseForm;