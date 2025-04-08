import React, { useState } from "react";
import styled from "styled-components";
import avatar from "../../img/hui.webp";
import { menuItems } from "../../utils/menuItems";
import { signout } from "../../utils/icons";

function Navigation({ active, setActive }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prevState) => !prevState);
  };
  const handleSignOut = () => {
    localStorage.clear(); // Clear authentication data
    window.location.href = "/"; // Refresh page to redirect to login
  };

  return (
    <NavStyled>
      <div className="user-con">
        <img src={avatar} alt="" />
        <div className="text">
          <h2>John Doe</h2>
          <p>My Money</p>
        </div>
      </div>
      <div className="hamburger" onClick={toggleMenu}>
        <div className={`line ${menuOpen ? "open" : ""}`}></div>
        <div className={`line ${menuOpen ? "open" : ""}`}></div>
        <div className={`line ${menuOpen ? "open" : ""}`}></div>
      </div>
      <ul className={`menu-items ${menuOpen ? "show-menu" : ""}`}>
        {menuItems.map((item) => (
          <li
            key={item.id}
            onClick={() => setActive(item.id)}
            className={active === item.id ? "active" : ""}
          >
            {item.icon}
            <span>{item.title}</span>
          </li>
        ))}
      </ul>
      <div className="bottom-nav" onClick={handleSignOut}>
        {<li>{signout} SignOut</li>}
      </div>
    </NavStyled>
  );
}

const NavStyled = styled.nav`
  padding: 2rem 1.5rem;
  width: 274px;
  height: 100%;
  font-size: 12px;
  background: rgba(252, 246, 249, 0.78);
  border: 3px solid #FFFFF;
  border-radius: 32px;
  backdrop-filter: blur(4.5px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0rem;

  .hamburger {
    display: none;
    position: absolute;
    top: 1rem;
    right: 1rem;
    cursor: pointer;
    z-index: 1000;

    .line {
      width: 30px;
      height: 3px;
      background: #333;
      margin: 5px 0;
      transition: all 0.3s ease-in-out;
    }

    .open:nth-child(1) {
      transform: translateY(8px) rotate(45deg);
    }

    .open:nth-child(2) {
      opacity: 0;
    }

    .open:nth-child(3) {
      transform: translateY(-8px) rotate(-45deg);
    }
  }

  .menu-items {
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    list-style: none;
    padding: 1rem;
    border-radius: 10px;

    li {
      font-size: 1rem;
      cursor: pointer;
      padding: 0.5rem;
      border-radius: 5px;
      transition: background-color 0.3s ease-in-out;

      &:hover {
        background-color: ;
      }

      &.active {
        font-weight: bold;
        color: var(--primary-color);
      }

      span {
        margin-left: 0.5rem;
      }
    }
  }

  .user-con {
    height: 100px;
    display: flex;
    align-items: center;
    gap: 1rem;
    img {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      object-fit: cover;
      background-color: #fcf6f9;
      border: 2px solid #FFFFF;
      padding: 0.2rem;
      box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.06);
    }
    h2 {
      color: rgba(34, 34, 96, 1);
    }
    p {
      color: rgba(34, 34, 96, 0.6);
    }
  }
  .bottom-nav {
    li {
      cursor: pointer;
      font-size: 0.9rem;
    }
    cursor: pointer;
  }

  @media (max-width: 1000px) {
    width: 100%;
    height: 80px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    .user-con {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      gap: 0px;
      img {
        width: 50px;
        height: 50px;
      }
      h2 {
        font-size: 1rem;
      }
      p {
        font-size: 0.85rem;
      }
    }

    .menu-items {
      flex-direction: row;
      align-items: center;
      justify-content: space-evenly;
      height: 100%;
      width: 100%;
      align-items: center;
      text-align: center;
      li {
        grid-template-columns: auto;
        padding: 0.5rem;
        font-size: 0.9rem;
      }
    }

    .bottom-nav {
      li {
        cursor: pointer;
        font-size: 0.9rem;
      }
      cursor: pointer;
    }
  }

  @media (max-width: 580px) {
    .hamburger {
      display: block;
    }
    ul {
      background: white;
    }
    .menu-items {
      position: absolute;
      display: none;
      margin: 0px;
      padding: 0px;
      gap: 0rem;
      top: 70px;
      left: 0rem;
      height: 100%;
      background: white;
      backdrop-filter: blur(4.5px);
      width: 200px;
      border-radius: 32px;
      border: 2px solid #ddd;
      box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
    }

    .menu-items.show-menu {
      display: flex;
      width: 100%;
      background: white;
    }
    .bottom-nav {
      margin-right: 20%;
      li {
        cursor: pointer;
        font-size: 1rem;
      }
    }
  }
`;

export default Navigation;
