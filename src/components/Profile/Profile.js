import React, { useContext, useEffect } from "react";
import useValidation from "../../hooks/useValidation";
import { pattern_email, pattern_name } from "../../constants/uriPattern";
import { CurrentUser } from '../../context/CurrentUser';

const Profile = ({
    isLoading,
    onSignOut,
    onProfileUpdate,
    onProfileEditButton,
    isProfileEditButton,
    isProfileDataSaving
  }) => {
  const {inputValue, inputInvalid, inputValid,  handleFormChange, resetForm} = useValidation();
  const currentUser = useContext(CurrentUser);

  useEffect(() => {
    if (currentUser)
      resetForm(currentUser);
  }, [currentUser, resetForm]);

  useEffect(() => {
    if (inputValue.name === currentUser.name && inputValue.email === currentUser.email) {
      resetForm(inputValue, {}, false);
    }
  }, [inputValue]);

  const handleProfileEdit = () => {
    onProfileEditButton(true);
  };

  function handleSelectField(event) {
    event.target.select();
  };

  function handleSubmit(event) {
    event.preventDefault();
    onProfileUpdate(inputValue.name, inputValue.email);
  };

  function handleSignOut() {
    onSignOut();
  }

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
      pattern: pattern_name,
    },
    {
      name: "email",
      id: "email",
      required: true,
      type: "email",
      placeholder: "E-mail",
      label: "E-mail",
      pattern: pattern_email,
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
        disabled={!isProfileEditButton}
      />
      <span className={formClassSettings.textOfErrorNameOfClass}>
        {inputInvalid[input.name]}
      </span>
    </fieldset>
  ));

  return (
    <main className="profile">
      <h1 className="profile__heading">Привет, {currentUser.name}!</h1>
      <form className={formClassSettings.formNameOfClass} onSubmit={handleSubmit} action="#">
        {formInputFields}
        <div className="profile__buttons">
          {isProfileEditButton ?
            (
              <button 
                className={`${formClassSettings.buttonNameOfClass} ${(!isLoading && inputValid) ?
                "" : formClassSettings.disabledButtonNameOfClass}`} 
                disabled={isLoading || isProfileDataSaving || !inputValid} 
                type="submit"
              >
                Сохранить
              </button>
            ) 
              :
            (
              <nav className="profile__navigation">
                <button
                  type="button"
                  className={`profile__edit-button ${!isLoading && inputValid ? "" : 'profile__disabled-button'}`} 
                  onClick={handleProfileEdit}
                >
                  Редактировать
                </button>
                <button 
                  className="profile__button profile__quit-red" 
                  onClick={handleSignOut}
                  type="button"
                >
                  Выйти из аккаунта
                </button>
              </nav>
            )
          }
        </div>
      </form>
    </main>
  );
};

export default Profile;