import React from "react";
import { Link, useNavigate } from "react-router-dom";
import LogoLink from "../Header/LogoLink/LogoLink";
import useValidation from "../../hooks/useValidation";

const Login = ({loggedIn, resumeOfErrors}) => {
  const navigate = useNavigate();
  const {inputValue, inputValid, inputInvalid, handleFormChange} = useValidation();

  const inputFields = [
    {
      name: "email",
      id: "email",
      required: true,
      type: "email",
      placeholder: "E-mail",
      label: "E-mail",
    },
    {
      name: "password",
      id: "password",
      required: true,
      type: "password",
      placeholder: "Пароль",
      label: "Пароль",
      minLength: 3,
    },
  ];

  function handleSubmit(event) {
    event.preventDefault();
    loggedIn(true);
    navigate("/movies");
  };

  function handleSelectField(event) {
    event.target.select();
  };

  const formClassSettings = {
    formNameOfClass: "login__form",
    labelNameOfClass: "login__label",
    inputNameOfClass: "login__input",
    inputInvalidNameOfClass: "login__input-invalid",
    textOfErrorNameOfClass: "login__input-text-of-error",
    buttonNameOfClass: "login__button",
    disabledButtonNameOfClass: "login__disabled_button",
    fieldsetNameOfClass: "login__fieldset",
    resumeOfErrorsNameOfClass: "login__errors-resume"
  };

  const formInputFields = inputFields.map((input, index) => (
    <fieldset key={index} className={formClassSettings.fieldsetNameOfClass}>
      <label className={formClassSettings.labelNameOfClass}>{input.label}</label>
      <input
        name={input.name}
        id={input.id}
        className={`${formClassSettings.inputNameOfClass} ${inputInvalid[input.name] ? formClassSettings.inputInvalidNameOfClass : ""}`}
        type={input.type}
        pattern={input.pattern}
        required
        minLength={input.minLength}
        maxLength={input.maxLength}
        value={inputValue[input.name] || ""}
        onClick={handleSelectField}
        onChange={handleFormChange}
      />
      <span className={formClassSettings.textOfErrorNameOfClass}>
        {inputInvalid[input.name]}
      </span>
    </fieldset>
  ));
  
  return (
    <main className="login">
      <header className="login__heading">
        <LogoLink/>
        <h1 className="login__title">
          Рады видеть!
        </h1>
      </header>
      <form className={formClassSettings.formNameOfClass} onSubmit={handleSubmit} action="#">
        {formInputFields}
        <span className={formClassSettings.resumeOfErrorsNameOfClass}>{resumeOfErrors}</span>
        <button className={`${inputValid ? "" : formClassSettings.disabledButtonNameOfClass} ${formClassSettings.buttonNameOfClass}`}>
          Войти
        </button>
      </form>
      <div className="login__question">
        Ещё не зарегистрированы?
        <Link className="login__link-to-register" to="/signup">
          Регистрация
        </Link>
      </div>
    </main>
  );
};

export default Login;
