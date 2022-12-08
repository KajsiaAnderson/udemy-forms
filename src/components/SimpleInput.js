// ---- use either useRef or useState to get inputs on forms ---- //
// useState: use this on forms when you need the entered value after every keystroke (instant validation)
// or if you want to reset the entered input //
// useRef: use this when you only want the input once the form is submitted //

import { useState,  } from "react";
// import { useRef } from "react";

const SimpleInput = (props) => {
  // const nameInputRef = useRef()
  const [enteredName, setEnteredName] = useState('')
  const [enteredNameTouched, setEnteredNameTouched] = useState(false)
  const [enteredEmail, setEnteredEmail] = useState('')
  const [enteredEmailTouched, setEnteredEmailTouched] = useState(false)
  
  // add validation to form
  const enteredNameIsValid = enteredName.trim() !== '';
  const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched

  const enteredEmailIsValid = enteredEmail.includes('@')
  const emailInputIsInvalid = !enteredEmailIsValid && enteredEmailTouched

  let formIsValid = false

    if (enteredNameIsValid && enteredEmailIsValid) {
      formIsValid = true
  }

  const nameInputChangeHandler = e => {
    setEnteredName(e.target.value)
  }
  const nameInputBlurHandler = e => {
    setEnteredNameTouched(true)
  }
  const emailInputChangeHandler = e => {
    setEnteredEmail(e.target.value)
  }
  const emailInputBlurHandler = e => {
    setEnteredEmailTouched(true)
  }

  const formSubmissionHandler = e => {
    e.preventDefault()

    setEnteredNameTouched(true)
    setEnteredEmailTouched(true)

    if (!enteredNameIsValid) {
      return;
    }
    if (!enteredEmailIsValid) {
      return;
    }

    console.log(enteredName)
    setEnteredName('')
    setEnteredNameTouched(false)

    console.log(enteredEmail)
    setEnteredEmail('')
    setEnteredEmailTouched(false)

    // const enteredValue = nameInputRef.current.value
    // console.log(enteredValue)
  }

  const nameInputClasses = nameInputIsInvalid ? 'form-control invalid' : 'form-control';
  const emailInputClasses = emailInputIsInvalid ? 'form-control invalid' : 'form-control';

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input
          // ref={nameInputRef}
          type='text'
          id='name'
          onChange={nameInputChangeHandler}
          onBlur={nameInputBlurHandler}
          value={enteredName}
        />
        </div>
        <div className={emailInputClasses}>
        {nameInputIsInvalid && <p className='error-text'>Name must not be empty.</p>}
        <label htmlFor='email'>Your Email</label>
        <input
          type='email'
          id='email'
          onChange={emailInputChangeHandler}
          onBlur={emailInputBlurHandler}
          value={enteredEmail}
          />
          {emailInputIsInvalid && <p className='error-text'>Please enter a valid email.</p>}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
