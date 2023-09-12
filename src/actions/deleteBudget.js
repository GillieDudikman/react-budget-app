import {deleteItem, getAllMatchingItems} from "../util";
import {toast} from "react-toastify";
import {redirect} from "react-router-dom";

export const deleteBudget = ({params}) => {
   try{
       deleteItem({
           key: "budgets",
           id: params.id
       })

       const associatedExpenses = getAllMatchingItems({
           category: "expenses",
           key: "budgetId",
           value: params.id
       });

       associatedExpenses.forEach(expense => {
           deleteItem({
               key: "expenses",
               id: expense.id
           })
       })

       toast.success("Budget deleted");
   }catch (e){
       throw new Error("There was a problem deleting your budget");
   }

   return redirect("/react-budget-app")
}