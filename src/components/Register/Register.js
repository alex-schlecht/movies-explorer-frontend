import React from "react";
import useValidation from "../../hooks/useValidation"
import { Link } from "react-router-dom";
import LogoLink from "../Header/LogoLink/LogoLink";
import { pattern_email, pattern_name } from "../../constants/uriPattern";

const Register = ({resumeOfErrors, onSignup, loggedIn, isLoading}) => {
  const {inputValue, inputInvalid, inputValid,  handleFormChange} = useValidation();

  const inputFields = [
    {
      name: "name",
      id: "name",
      required: true,
      type: "text",
      placeholder: "Имя",
      label: "Имя",
      pattern: pattern_name
    },
    {
      name: "email",
      id: "email",
      required: true,
      type: "email",
      placeholder: "E-mail",
      label: "E-mail",
      pattern: pattern_email
    },
    {
      name: "password",
      id: "password",
      required: true,
      type: "password",
      placeholder: "Пароль",
      label: "Пароль",
      minLength: 3,
    }
  ];

  function handleSelectField(event) {
    event.target.select();
  };

  function handleSubmit(event) {
    onSignup(inputValue.email, inputValue.password, inputValue.name);
    event.preventDefault();
  };

  const formClassSettings = {
    formNameOfClass: "register__form",
    labelNameOfClass: "register__label",
    inputNameOfClass: "register__input",
    inputInvalidNameOfClass: "register__input-invalid",
    textOfErrorNameOfClass: "register__input-text-of-error",
    buttonNameOfClass: "register__button",
    disabledButtonNameOfClass: "register__disabled-button",
    fieldsetNameOfClass: "register__fieldset",
    resumeOfErrorsNameOfClass: "register__errors-resume"
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
    <main className="register">
      <header className="register__heading">
        <LogoLink/>
        <h1 className="register__title">
          Добро пожаловать!
        </h1>
      </header>
      <form className={formClassSettings.formNameOfClass} onSubmit={handleSubmit} action="#">
        {formInputFields}
        <span className={formClassSettings.resumeOfErrorsNameOfClass}>{resumeOfErrors}</span>
        <button 
          className={`${!loggedIn && (!isLoading && inputValid) ? 
          "" : formClassSettings.disabledButtonNameOfClass} ${formClassSettings.buttonNameOfClass}`}
          disabled={isLoading || !inputValid}
          type="submit"
        >
          Зарегистрироваться
        </button>
      </form>
      <div className="register__question">
        Уже зарегистрированы?
        <Link className="register__link-to-login" to="/signin">
          Войти
        </Link>
      </div>
    </main>
  );
};

export default Register;
