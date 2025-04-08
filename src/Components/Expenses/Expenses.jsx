import React, { useEffect } from "react";
import styled from "styled-components";
import { InnerLayout } from "../../styles/Layout";
import { useGlobalContext } from "../context/globalContext";
import ExpenseForm from "./ExpenseForm";
import IncomeItem from "../IncomeItem/IncomeItem";
import { naira } from "../../utils/icons";

function Expenses() {
  const { addIncome, expenses, getExpenses, deleteExpense, totalExpense } =
    useGlobalContext();

  useEffect(() => {
    getExpenses(); 
  }, []);

  return (
    <ExpenseStyled>
      <InnerLayout>
        <h1>EXPENSES</h1>
        <h2 className="total-income">
          Total Expense:{" "}
          <span>
            {naira}
            {totalExpense()}
          </span>
        </h2>
        <div className="income-content">
          <div className="form-container">
            <ExpenseForm />
          </div>
          <div className="incomes">
            {expenses.map((expenses) => {
              const { _id, title, amount, date,type, category, description } =
                expenses;
              return (
                <IncomeItem
                  key={_id}
                  id={_id}
                  title={title}
                  description={description}
                  amount={amount}
                  date={date}
                  type={type}
                  category={category}
                  indicatorColor="red"
                  deleteItem={deleteExpense}
                />
              );
            })}
          </div>
        </div>
      </InnerLayout>
    </ExpenseStyled>
  );
}

const ExpenseStyled = styled.div`
  display: flex;
  overflow: auto;
  .total-income {
    display: flex;
    justify-content: center;
    background: #fcf6f9;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    padding: 0.5rem;
    margin: 0.5rem 0;
    font-size: 1.5rem;
    gap: 0.5rem;
    span {
      color: red;
      font-weight: 800;
    }
  }
  .income-content {
    display: flex;
    gap: 2rem;
    .incomes {
      flex: 1;
    }
  }
  @media (max-width: 770px) {
    .income-content {
      display: flex;
      flex-direction: column-reverse;
    }
  }
`;

export default Expenses;
