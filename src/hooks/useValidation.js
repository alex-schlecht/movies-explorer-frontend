import { useCallback, useState } from "react";

function useValidation() {
  const [state, setState] = useState({
    inputValue: {},
    inputInvalid: {},
    inputValid: false
  });

  const handleFormChange = useCallback((event) => {
    const target = event.target;
    const name = target.name;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const validationMsg = target.validationMsg;
    const formValid = event.target.closest('form').checkValidity();

    setState({
      inputValue: {...state.inputValue, [name]: value},
      inputInvalid: {...state.inputInvalid, [name]: validationMsg},
      inputValid: formValid
    });
  }, [state, setState]);

  const resetForm = useCallback(
    (
      inputValue = {}, 
      inputInvalid = {}, 
      inputValid = false
    ) => {
      setState({
        inputValue: inputValue,
        inputInvalid: inputInvalid,
        inputValid: inputValid,
      });
    }, [setState]);

  return {
    ...state,
    resetForm,
    setState,
    handleFormChange,
  };
};

export default useValidation;
