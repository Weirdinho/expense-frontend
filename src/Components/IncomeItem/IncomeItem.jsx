import React from "react";
import {
  calender,
  trash,
  comment,
  naira,
  money,
  freelance,
  stocks,
  users,
  bitcoin,
  card,
  yt,
  piggy,
  book,
  food,
  medical,
  tv,
  takeaway,
  clothing,
  circle,
} from "../../utils/icons";
import Button from "../Button/Button";
import styled from "styled-components";
import { dateFormat } from "../../utils/dateFormat";

function IncomeItem({
  id,
  title,
  amount,
  date,
  category,
  description,
  deleteItem,
  indicatorColor,
  type,
}) {
  const categoryIcon = () => {
    switch (category) {
      case "salary":
        return money;
      case "freelancing":
        return freelance;
      case "investments":
        return stocks;
      case "stocks":
        return users;
      case "bitcoin":
        return bitcoin;
      case "bank":
        return card;
      case "youtube":
        return yt;
      case "other":
        return piggy;
      default:
        return "";
    }
  };

  const expenseCatIcon = () => {
    switch (category) {
      case "education":
        return book;
      case "food":
        return food;
      case "health":
        return medical;
      case "subscriptions":
        return tv;
      case "takeaways":
        return takeaway;
      case "clothing":
        return clothing;
      case "travelling":
        return freelance;
      case "other":
        return circle;
      default:
        return "";
    }
  };

  return ( 
    <IncomeItemStyled indicator={indicatorColor}>
      <div className="icon">
        {type === "expense" ? expenseCatIcon() : categoryIcon()}
      </div>
      <div className="content">
        <h5>{title}</h5>
        <div className="inner-content">
          <div className="text">
            <p>
              {naira} {amount}
            </p>
            <p>
              {calender} {dateFormat(date)}
            </p>
            <p>
              {comment}
              {description}
            </p>
          </div>
          <div className="btn-con">
            <Button
              icon={trash}
              bPad={"1rem"}
              bRad={"50%"}
              color={"#fff"}
              iColor={"#fff"}
              onClick={() => deleteItem(id)}
            />
          </div>
        </div>
      </div>
    </IncomeItemStyled>
  );
}

const IncomeItemStyled = styled.div`
  background: #fcf6f9;
  border: 2px solid #ffffff;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
  border-radius: 20px;
  padding: 1rem;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  height:6rem;
  color: #222260;
  .icon {
    width: 80px;
    height: 80px;
    border-radius: 20px;
    background: #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #ffffff;
    i {
      font-size: 2.6rem;
    }
  }

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    h5 {
      font-size: 1.3rem;
      padding-left: 2rem;
      position: relative;
      &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 0.8rem;
        height: 0.8rem;
        border-radius: 50%;
        background: ${(props) => props.indicator};
      }
    }
    .inner-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .text {
        display: flex;
        align-items: center;
        gap: 1rem;
        p {
          display: flex;
          align-items: center;
          gap: 0.1rem;
          color: var(--primary-color);
          opacity: 0.8;
          font-size: 0.9rem;
        }
      }
      Button {
        margin-top:-20px;
        margin-left:15px;
        background: var(--primary-color);
        color: #fff;
        transition: transform 0.3s ease, background-color 0.3s ease;
        &:hover {
         transform: scale(1.2);
          background: red;
        }
      }
    }
  }
  @media (max-width: 575px){
    width:100%;
    .icon {
      width: 50px;
      height: 50px;
      font-size:0.2px;
    }
    i {
      font-size: 0.6rem;
      
    }
    p{
      display:flex;
      flex-direction:column;
    }
   Button{
    padding:0.5rem;
   }
  }
`;

export default IncomeItem;
