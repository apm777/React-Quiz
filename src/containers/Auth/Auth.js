import React, { Component } from 'react';
import classes from './Auth.css'
import Button from '../../components/Ui/Button/Button'
import Input from "../../components/Ui/Input/Input";
import is from 'is_js'
import axios from 'axios'


class Auth extends Component {

  state = {
    isFormValid: false,
    formControls: {
      email: {
        value: '',
        type: 'email',
        label: 'Email',
        errorMessage: 'Введите корректний email',
        valid: false,
        touched: false,
        validation: {
          requred: true,
          email: true
        }
      },
      password: {
        value: '',
        type: 'password',
        label: 'Пароль',
        errorMessage: 'Введите корректний пароль',
        valid: false,
        touched: false,
        validation: {
          requred: true,
          minLength: 6
        }
      }
    }
  }

  loginHandler = async () => {
    const { email, password } = this.state.formControls
    const authData = {
      email: email.value,
      password: password.value,
      returnSecureToken: true
    }
    try {
      const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAWWLM9KdeNluDfLEoci-g6iwsDIS8670g', authData)
      console.log(response.data)
    } catch (e) {
      console.log(e)

    }
  }

  registerHandler = async () => {
    const { email, password } = this.state.formControls
    const authData = {
      email: email.value,
      password: password.value,
      returnSecureToken: true
    }
    try {
      const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAWWLM9KdeNluDfLEoci-g6iwsDIS8670g', authData)
      console.log(response.data)
    } catch (e) {
      console.log(e)

    }
  }

  submitHandler = (event) => {
    event.preventDefault()
  }

  validateControl(value, validation) {
    if (!validation) {
      return true
    }

    let isValid = true

    if (validation.requred) {
      isValid = value.trim() !== '' && isValid
    }

    if (validation.email) {
      isValid = is.email(value) && isValid
    }

    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid
    }

    return isValid
  }

  onChangeHandler = (event, controlName) => {
    const formControls = { ...this.state.formControls }
    const control = { ...formControls[controlName] }

    control.value = event.target.value
    control.touched = true
    control.valid = this.validateControl(control.value, control.validation)

    formControls[controlName] = control

    let isFormValid = true

    Object.keys(formControls).forEach(name => {
      isFormValid = formControls[name].valid && isFormValid
    })

    this.setState({
      formControls, isFormValid
    })
  }

  renderInputs() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName]
      return (
        <Input
          key={controlName + index}
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          label={control.label}
          shouldValidate={!!control.validation}
          errorMessage={control.errorMessage}
          onChange={event => this.onChangeHandler(event, controlName)}
        ></Input>
      )
    })
  }

  render() {
    return (
      <div className={classes.Auth}>
        <div>
          <h1>Авторизация</h1>
          <form onSubmit={this.submitHandler} className={classes.AuthForm}>

            {this.renderInputs()}

            <Button
              type="success"
              onClick={this.loginHandler}
              disabled={!this.state.isFormValid}
            >
              Войти
            </Button>
            <Button
              type="primary"
              onClick={this.registerHandler}
              disabled={!this.state.isFormValid}
            >
              Зарегестрироваться
            </Button>

          </form>
        </div>
      </div>
    );
  }
}

export default Auth;