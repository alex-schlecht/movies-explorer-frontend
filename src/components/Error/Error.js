import React from "react";

const Error = ({ code="404", description="Страница не найдена" }) => {
  return (
    <main className="error">
      <header className="error__heading">
        <h1 className="error__title">{code}</h1>
        <p className="error__description">{description}</p>
      </header>
      <button className="error__back" type="button" onClick={() => window.history.back()}>Назад</button>
    </main>
  );
};

export default Error;
