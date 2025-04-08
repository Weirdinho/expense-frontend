import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Orb from "../Orb/Orb";
import bg from "../../img/bg.png";

function LandingPage() {
  const navigate = useNavigate();

  const orbMemo = useMemo(() => {
    return <Orb />;
  }, []);

  return (
    <Container bg={bg}>
      {orbMemo}
      <ContentBox>
        <h1>Welcome to the Student Expense Tracking System</h1>
        <p>
          Manage your expenses efficiently and stay on top of your finances.
        </p>
        <button onClick={() => navigate("/auth")}>Get Started</button>
      </ContentBox>
    </Container>
  );
}

export default LandingPage;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
  padding: 20px;
`;

const ContentBox = styled.div`
  background: rgba(255, 255, 255, 0.15);
  padding: 40px;
  border-radius: 15px;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 500px;
  text-align: center;
  color: #fff;

  h1 {
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
    text-transform: uppercase;
    letter-spacing: 2px;
  }

  p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    color:black;
  }

  button {
    padding: 12px 25px;
    font-size: 1.2rem;
    font-weight: bold;
    color: white;
    background: #ff7eb3;
    border: none;
    border-radius: 30px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    box-shadow: 0 4px 15px rgba(255, 126, 179, 0.4);
  }

  button:hover {
    background: #ff4da6;
    box-shadow: 0 6px 20px rgba(255, 77, 166, 0.5);
    transform: translateY(-2px);
  }
`;
