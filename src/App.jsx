import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import bg from "./img/bg.png";
import { MainLayout } from "./styles/Layout";
import Orb from "./Components/Orb/Orb";
import Navigation from "./Components/Navigation/Navigation";
import Dashboard from "./Components/Dashboard/Dashboard";
import Incomes from "./Components/Incomes/Incomes";
import Expenses from "./Components/Expenses/Expenses";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Transactions from "./Components/Transactions/Transactions";
import { useGlobalContext } from "./Components/context/globalContext";
import Budget from "./Components/Budget/budget";
import LoginSignup from "./Components/LoginSignup/LoginSignup";
import LandingPage from "./Components/LandingPage/LandingPage";

function App() {
  const [active, setActive] = React.useState(1);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
 
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsAuthenticated(!!token);
  }, []);

  const global = useGlobalContext();
  console.log(global);

  const displayData = () => {
    switch (active) {
      case 1:
        return <Dashboard />;
      case 2:
        return <Budget />;
      case 3:
        return <Incomes />;
      case 4:
        return <Expenses />;
      default:
        return <Dashboard />;
    }
  };

  const orbMemo = useMemo(() => {
    return <Orb />;
  }, []);
  return (
    <Routes>
      {!isAuthenticated ? (
        <>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<LoginSignup />} />
          <Route path="*" element={"/"} />
        </>
      ) : (
        <Route
          path="/"
          element={
            <AppStyled bg={bg} className="App">
              {orbMemo}
              <MainLayout className="Layout">
                <Navigation active={active} setActive={setActive} />
                <main>{displayData()}</main>
              </MainLayout>
            </AppStyled>
          }
        />
      )}
    </Routes>
  );
}
const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${(props) => props.bg});
  position: relative;
  main {
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFF;
    border-radius: 32px;
    backdrop-filter: blur(4.5px);
    overflow-x: hidden;
    &::-webkit-scrollbar {
      width: 0;
    }
  }
  @media (max-width: 1000px) {
    .Layout {
      display: flex;
      flex-direction: column;
    }
    main {
      margin-top: 50px;
      height: 100%;
      flex: 1;
    }
  }
`;

export default App;
