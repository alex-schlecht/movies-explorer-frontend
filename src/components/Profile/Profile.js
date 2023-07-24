import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import useValidation from "../../hooks/useValidation";

const Profile = ({ resumeOfErrors = "Произошла ошибка при изменении профиля"}) => {
  const [editProfileButton, setEditProfileButton] = useState(false);
  const {inputValue, inputInvalid, inputValid,  handleFormChange} = useValidation();

  const handleEditProfile = () => {
    setEditProfileButton(!editProfileButton);
  };

  function handleSelectField(event) {
    event.target.select();
  };

  function handleSubmit(event) {
    event.preventDefault();
    setEditProfileButton(!editProfileButton);
  };

  const formClassSettings = {
    formNameOfClass: "profile__form",
    labelNameOfClass: "profile__label",
    inputNameOfClass: "profile__input",
    inputInvalidNameOfClass: "profile__input-invalid",
    textOfErrorNameOfClass: "profile__input-text-of-error",
    buttonNameOfClass: "profile__button",
    disabledButtonNameOfClass: "profile__disabled-button",
    fieldsetNameOfClass: "profile__fieldset",
    resumeOfErrorsNameOfClass: "profile__errors-resume"
  };

  const inputFields = [
    {
      name: "name",
      id: "name",
      required: true,
      type: "text",
      placeholder: "Имя",
      label: "Имя",
      pattern: "[А-Яа-яA-Za-z]{3,30}",
    },
    {
      name: "email",
      id: "email",
      required: true,
      type: "email",
      placeholder: "E-mail",
      label: "E-mail",
    }
  ];

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
    <main className="profile">
      <h1 className="profile__heading">Привет, Виталий!</h1>
      <form className={formClassSettings.formNameOfClass} onSubmit={handleSubmit} action="#">
        {formInputFields}
        <span className={formClassSettings.resumeOfErrorsNameOfClass}>{editProfileButton && resumeOfErrors}</span>
        {editProfileButton ? 
          (<button className={`${formClassSettings.buttonNameOfClass} ${inputValid ? "" : 
          formClassSettings.disabledButtonNameOfClass}`}>
            Сохранить
          </button>) :
          (<nav className="profile__navigation">
            <button className="profile__edit-button" onClick={handleEditProfile}>Редактировать</button>
            <Link className="profile__quit profile__quit-red" to="/signin">Выйти из аккаунта</Link>
          </nav>)
        }
      </form>
    </main>
  );
};

export default Profile;