import React, { useEffect } from "react";
import styled from "styled-components";
import { InnerLayout } from "../../styles/Layout";
import Chart from "../Chart/Chart";
import { naira } from "../../utils/icons";
import { useGlobalContext } from "../context/globalContext";
import History from "../../History/History";

const Naira = "₦";

function Dashboard() {
  const {
    totalExpense,
    incomes,
    expenses,
    totalIncome,
    totalBalance,
    transactionHistory,
    getIncomes,
    getExpenses,
  } = useGlobalContext();

  useEffect(() => {
    getIncomes();
    getExpenses();
  }, []);

  return (
    <DashboardStyled>
      <InnerLayout>
        <h1>Dashboard</h1>
        <div className="stats-con">
          <div className="chart-con">
            <Chart />
            <div className="amount-con">
              <div className="income">
                <h2>Total Income</h2>
                <p>
                  {naira} {totalIncome()}
                </p>
              </div>
              <div className="expense">
                <h2>Total Expense</h2>
                <p>
                  {naira} {totalExpense()}
                </p>
              </div>
              <div className="balance">
                <h2>Total Balance</h2>
                <p
                  style={{
                    color: totalBalance() >= 0 ? "green" : "red",
                  }}
                >
                  {totalBalance() < 0
                    ? `-${Naira}${Math.abs(totalBalance())}`
                    : `${Naira}${totalBalance()}`}
                </p>
              </div>
            </div> 
          </div>
          <div className="history-con">
            <History />
            <h2 className="salary-title">
              Min <span>Salary</span>Max
            </h2>
            <div className="salary-item">
              <p>{naira}{Math.min(...incomes.map((item) => item.amount))}</p>
              <p>{naira}{Math.max(...incomes.map((item) => item.amount))}</p>
            </div>
            <h2 className="salary-title">
              Min <span>Expense</span>Max
            </h2>
            <div className="salary-item">
              <p>{naira}{Math.min(...expenses.map((item) => item.amount))}</p>
              <p>{naira}{Math.max(...expenses.map((item) => item.amount))}</p>
            </div>
          </div>
        </div>
      </InnerLayout>
    </DashboardStyled>
  );
}

const DashboardStyled = styled.div`
overflow-y:auto;
height:100%;
  .stats-con {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 1rem;
    .chart-con {
      grid-column: 1 / 4;
      height: 300px;
      .amount-con {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 1rem;
        margin-top: 0.5rem;
        .income,
        .expense {
          grid-column: span 2;
        }
        .income,
        .expense,
        .balance {
          background: #fcf6f9;
          border: 2px solid white;
          box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
          padding: 1rem;
          border-radius: 20px;
          p {
            font-size: 1.2rem;
            font-weight: 600;
            text-align:center;
          }
        }
        .income p {
          color: var(--color-green);
        }
        .expense p {
          color: red;
        }
        .balance {
          grid-column: 2 / 4;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          p {
            opacity: 0.6;
          }
        }
      }
    }
    .history-con {
      grid-column: 4 / -1;
      h2 {
        margin: 0.5rem 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .salary-title {
        font-size: 1rem;
        span {
          font-size: 1.5rem;
        }
      }
      .salary-item {
        background: #fcf6f9;
        border: 2px solid white;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        padding: 1rem;
        border-radius: 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        p{
            font-size:1rem;
            font-weight:700;
        }
      }
    }
  }
  @media (max-width: 950px){
    height:100%;
    .stats-con{
      display:flex;
      flex-direction:column;
    }
    .history-con{
      margin-top:30%;
    }
  }
  @media (max-width: 700px){
    .history-con{
      margin-top:40%;
    }
  }
  @media (max-width: 550px){
    .history-con{
      margin-top:70%;
    }}
    @media (max-width: 450px){
    .history-con{
      margin-top:85%;
    }}
    @media (max-width: 390px){
    .history-con{
      margin-top:300px;
    }}
    
   
`;

export default Dashboard;
