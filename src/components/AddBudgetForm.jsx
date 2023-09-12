import {useFetcher} from "react-router-dom";
import {HiCurrencyDollar} from "react-icons/hi";
import {useEffect, useRef} from "react";
import {BiRefresh} from "react-icons/bi";

const AddBudgetForm = () => {
    const fetcher = useFetcher();
    const isSubmitting = fetcher.state === "submitting";

    const formRef = useRef();
    const focusRef = useRef();

    useEffect(() => {
        if(!isSubmitting){
            formRef.current.reset()
            focusRef.current.focus()
        }
    }, [isSubmitting]);

    return (
        <div className="form-wrapper">
            <h2 className="form-wrapper-title">Create Budget</h2>
            <fetcher.Form ref={formRef} method="post">
                <div className="form-wrapper-section">
                    <label htmlFor="newBudget">Budget Name</label>
                    <input ref={focusRef} type="text" name="newBudget" id="newBudget" placeholder="e.g., Groceries" required/>
                </div>
                <div className="form-wrapper-section">
                    <label htmlFor="newBudgetAmount">Budget Amount</label>
                    <input type="number" step="0.01" name="newBudgetAmount" id="newBudgetAmount" placeholder="e.g., $350" required inputMode="decimal"/>
                </div>
                <input type="hidden" name="_action" value="createBudget"/>
                <div className="form-wrapper-buttons">
                    <button disabled={isSubmitting} type="submit">
                        {
                            isSubmitting ?  (<span>Submitting...</span>) :
                                (
                                    <>
                                        <span>Create Budget</span>
                                        <HiCurrencyDollar className="form-wrapper-logo"/>
                                    </>
                                )
                        }
                    </button>
                    <button type="reset" onClick={() => {formRef.current.reset(); focusRef.current.focus()}}>
                        <span>Reset</span>
                        <BiRefresh className="form-wrapper-logo"/>
                    </button>
                </div>
            </fetcher.Form>
        </div>
    )
}

export default AddBudgetForm;