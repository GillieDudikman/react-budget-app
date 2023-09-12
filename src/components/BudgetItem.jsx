import {calSpentByBudget, formatCurrency, formatPercentage} from "../util";
import {Form, Link} from "react-router-dom";
import {HiOutlineBanknotes} from "react-icons/hi2";
import {BsTrash3} from "react-icons/bs";

const BudgetItem = ({budget, showDelete= false}) => {
    const { id, name, amount, color } = budget;
    const spent = calSpentByBudget(id)

    return (
        <div className="budget" style={{
            '--custom-color': `hsl(${color})`
        }}>
            <div>
                <h3>{name}</h3>
                <p>
                    <b>{formatCurrency(amount)}</b> Budget
                </p>
                {
                    spent/amount > 1 ? (
                        <span className="exploded">The Budget exploded!!!</span>
                    ) : (<span></span>)
                }
            </div>
            <div className="progress-container">
                <div style={{
                   width: spent/amount >= 1 ? '100%' : formatPercentage(spent/amount)
                }}
                     className="progress-inner">
                    <span className="progress">{formatPercentage(spent/amount)}</span>
                </div>
            </div>
            <div className="small">
                <small>{formatCurrency(spent)} spent</small>
                <small>{formatCurrency(amount-spent)} remaining</small>
            </div>
            {
                showDelete ? (
                    <div className="budget-item-actions">
                        <Form method="post" action='delete'>
                            <button type="submit" className="budget-details">
                                <span>Delete</span>
                                <BsTrash3 className="budget-details-logo"/>
                            </button>
                        </Form>
                    </div>
                ) : (
                    <Link to={`/react-budget-app/budget/${id}`}  className="budget-details">
                        <span>View Details</span>
                        <HiOutlineBanknotes className="budget-details-logo"/>
                    </Link>

                )
            }
        </div>
    )
}

export default BudgetItem;