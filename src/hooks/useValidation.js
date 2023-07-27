import { useState } from "react";

function useValidation() {
  const [state, setState] = useState({
    inputValue: {},
    inputInvalid: {},
    inputValid: false
  });

  const handleFormChange = (event) => {
    const {name, value, validationMsg} = event.target;
    const formValid = event.target.closest('form').checkValidity();

    setState({
      inputValue: {...state.inputValue, [name]: value},
      inputInvalid: {...state.inputInvalid, [name]: validationMsg},
      inputValid: formValid
    });
  };

  return {
    ...state,
    handleFormChange,
  };
};

export default useValidation;

