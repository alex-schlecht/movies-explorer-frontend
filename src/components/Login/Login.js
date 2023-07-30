import React from "react";
import { Link } from "react-router-dom";
import LogoLink from "../Header/LogoLink/LogoLink";
import useValidation from "../../hooks/useValidation";
import { pattern_email } from "../../constants/uriPattern";

const Login = ({resumeOfErrors, onSignin, loggedIn, isLoading}) => {
  const {inputValue, inputInvalid, inputValid,  handleFormChange} = useValidation();

  const inputFields = [
    {
      name: "email",
      id: "email",
      required: true,
      type: "email",
      pattern: pattern_email,
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
    onSignin(inputValue.email, inputValue.password);
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
    disabledButtonNameOfClass: "login__disabled-button",
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
        <button 
          className={`${!loggedIn && (!isLoading && inputValid) ? "" : formClassSettings.disabledButtonNameOfClass} ${formClassSettings.buttonNameOfClass}`}
          disabled={isLoading || !inputValid}
          type="submit"
        >
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
