import React, { useContext, useState } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1/";

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [income, setIncome] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [expens, setExpens] = useState([]);
  const [error, setError] = useState(null);

  const addExpense = async (expense) => {
    const response = await axios
      .post(`${BASE_URL}add-expenses`, expense)
      .catch((err) => {
        setError(err.response.data.message);
      });
    getExpenses();
  };
  const addExpens = async (expense) => {
    const { title, amount, date, category, description } = expense;

    // Check if any field is missing
    if (!title || !amount || !date || !category || !description) {
      setError("All fields are required");
      return;
    }

    try {
      await axios.post(`${BASE_URL}add-expense`, expense);
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    }
  };

  const getExpenses = async (expense) => {
    const response = await axios.get(`${BASE_URL}get-expenses`);
    setExpenses(response.data);
  };

  async function deleteExpense(id) {
    try {
      const res = await axios.delete(`${BASE_URL}delete-expense/${id}`);
      console.log("expense deleted:", res.data);
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
    getExpenses();
  }

  const totalExpense = () => {
    let totalExpense = 0;
    expenses.forEach((expense) => {
      totalExpense = totalExpense + expense.amount;
    });

    return totalExpense;
  };

  //calculate incomes
  const addIncome = async (income) => {
    const response = await axios
      .post(`${BASE_URL}add-incomes`, income)
      .catch((err) => {
        setError(err.response.data.message);
      });
    getIncomes();
  };
  const addIncom = async (income) => {
    const { title, amount, date, category, description } = income;

    // Check if any field is missing
    if (!title || !amount || !date || !category || !description) {
      setError("All fields are required");
      return;
    }

    try {
      await axios.post(`${BASE_URL}add-income`, income);
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    }
  };

  const getIncomes = async (income) => {
    const response = await axios.get(`${BASE_URL}get-incomes`);
    setIncomes(response.data);
    console.log(response.data);
  };

  async function deleteIncome(id) {
    try {
      const res = await axios.delete(`${BASE_URL}delete-income/${id}`);
      console.log("Income deleted:", res.data);
    } catch (error) {
      console.error("Error deleting income:", error);
    }
    getIncomes();
  }

  const totalIncome = () => {
    let totalIncome = 0;
    incomes.forEach((income) => {
      totalIncome = totalIncome + income.amount;
    });

    return totalIncome;
  };

  const totalBalance = () => {
    return totalIncome() - totalExpense();
  };

  const transactionHistory = () => {
    const history = [...incomes, ...expenses];
    history.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    return history.slice(0, 5);
  };

  return (
    <GlobalContext.Provider
      value={{
        addIncome,
        addIncom,
        getIncomes,
        incomes,
        income,
        expenses,
        expens,
        deleteIncome,
        totalIncome,
        addExpense,
        addExpens,
        deleteExpense,
        getExpenses,
        totalExpense,
        totalBalance,
        transactionHistory,
        error,
        setError,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
