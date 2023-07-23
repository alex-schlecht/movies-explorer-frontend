import { useState } from "react";

function useValidation() {
  const [state, setState] = useState({
    inputValue: {},
    inputValid: false,
    inputInvalid: {}
  });

  const handleFormChange = (event) => {
    const {name, value, validationMsg} = event.target;
    const formValid = event.target.closest('form').checkValidity();

    setState({
      inputValue: {...state.inputValue, [name]: value},
      inputValid: formValid,
      inputInvalid: {...state.inputInvalid, [name]: validationMsg},
    });
  };

  return {
    ...state,
    handleFormChange,
  };
};

export default useValidation;

