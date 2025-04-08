import { useState, useEffect } from "react";
import { useGlobalContext } from "../context/globalContext";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Register chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Budget = () => {
  const { expenses } = useGlobalContext();
  const [budget, setBudget] = useState(50000); // Default budget
  const navigate = useNavigate();

  // Calculate total expenses
  const totalExpenses = expenses.reduce((acc, expense) => acc + Number(expense.amount), 0);

  // Determine budget status
  const budgetStatus = budget - totalExpenses;
  const isOverBudget = budgetStatus < 0;
  const percentageSpent = Math.min((totalExpenses / budget) * 100, 100); // Ensure max 100%

  // Handle budget change
  const handleBudgetChange = (e) => {
    const newBudget = Number(e.target.value);
    if (!isNaN(newBudget) && newBudget >= 0) {
      setBudget(newBudget);
    }
  };

  // Group expenses by category
  const categoryBreakdown = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + Number(expense.amount);
    return acc;
  }, {});

  // Prepare chart data
  const categoryLabels = Object.keys(categoryBreakdown);
  const categoryValues = Object.values(categoryBreakdown);

  const chartData = {
    labels: categoryLabels,
    datasets: [
      {
        label: "Amount Spent ₦",
        data: categoryValues,
        backgroundColor: ["#ff6384", "#36a2eb", "#ffce56", "#4caf50", "#f44336", "#9c27b0", "#ff9800"],
        borderRadius: 5,
      },
    ],
  };

  return (
    <BudgetStyled>
      <h2>Budget Tracker</h2>

      <div className="budget-card">
        <div className="budget-input">
          <h3>Set Your Budget (₦)</h3>
          <input type="number" value={budget} onChange={handleBudgetChange} min="0" />
        </div>

        <div className="budget-section">
          <h3>Total Expenses</h3>
          <p className={isOverBudget ? "over-budget" : "under-budget"}>
            ₦{totalExpenses.toLocaleString()}
          </p>
        </div>

        <div className="budget-status">
          <h3>Status</h3>
          <p className={isOverBudget ? "over-budget" : "under-budget"}>
            {isOverBudget
              ? `Over Budget by ₦${Math.abs(budgetStatus).toLocaleString()}`
              : `Remaining Budget: ₦${budgetStatus.toLocaleString()}`}
          </p>
        </div>

        <div className="progress-bar">
          <div className={`progress ${isOverBudget ? "progress-red" : "progress-green"}`} style={{ width: `${percentageSpent}%` }}></div>
        </div>
      </div>

      <div className="category-breakdown">
        <h3>Category-wise Breakdown</h3>
        {categoryLabels.length > 0 ? (
          <Bar data={chartData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
        ) : (
          <p>No expenses recorded yet.</p>
        )}
      </div>
    </BudgetStyled>
  );
};

const BudgetStyled = styled.div`
  text-align: center;
  padding: 30px;
  background-color: #f4f4f4;
  min-height: 100vh;

  h2 {
    color: #333;
    font-size: 2rem;
    margin-bottom: 20px;
  }

  .budget-card {
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 90%;
    margin: 0 auto;
  }

  .budget-input {
    margin-bottom: 15px;
  }

  .budget-input h3 {
    font-size: 1.2rem;
    color: #555;
  }

  .budget-input input {
    width: 100%;
    padding: 10px;
    font-size: 1.2rem;
    border: 2px solid #ccc;
    border-radius: 5px;
    text-align: center;
  }

  .budget-section {
    margin-bottom: 15px;
  }

  .budget-section h3 {
    color: #555;
    font-size: 1.2rem;
  }

  .budget-section p {
    font-size: 1.5rem;
    font-weight: bold;
  }

  .over-budget {
    color: red;
  }

  .under-budget {
    color: green;
  }

  .budget-status {
    margin-top: 10px;
  }

  .progress-bar {
    width: 100%;
    background: #ddd;
    height: 20px;
    border-radius: 10px;
    margin-top: 10px;
    overflow: hidden;
  }

  .progress {
    height: 100%;
    border-radius: 10px;
    transition: width 0.4s ease-in-out;
  }

  .progress-green {
    background-color: green;
  }

  .progress-red {
    background-color: red;
  }

  .category-breakdown {
    background: white;
    padding: 0px;
    margin-top: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 90%;
    margin: 20px auto;
  }

  .category-breakdown h3 {
    font-size: 1.5rem;
    margin-bottom: 15px;
    color: #333;
  }

  .back-btn {
    margin-top: 20px;
    padding: 10px 20px;
    border: none;
    background: var(--color-green);
    color: white;
    border-radius: 5px;
    cursor: pointer; 
    font-size: 1rem;
  }

  .back-btn:hover {
    background: darkgreen;
  }
`;

export default Budget;
