import React from "react";
import { useNavigate } from "react-router-dom";

const Error = ({ code="404", description="Страница не найдена" }) => {
  const navigate = useNavigate();
  const returnBack = () => {
     navigate(-1);
  };

  return (
    <main className="error">
      <header className="error__heading">
        <h1 className="error__title">{code}</h1>
        <p className="error__description">{description}</p>
      </header>
      <button className="error__back" type="button" onClick={returnBack}>Назад</button>
    </main>
  );
};

export default Error;
