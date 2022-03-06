import React from 'react';
import './App.css';
import InputField from './InputField';
import SubmitButton from './SubmitButton';
import userstore from './stores/userstore';
import './css/Login.css';
class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            buttonDisabled: false
        }
    }
    setInputValue(property, val) {
        val = val.trim();
        if (val.length > 12) {
            return;
        }
        this.setState({
            [property]: val
        })
    }
    resetForm() {
        this.setState({
            username: '',
            password: '',
            buttonDisabled: false

        })
    }
    async doLogin() {
        if (!this.state.username) {
            return;
        }
        if (!this.state.password) {
            return;
        }
        this.setState({
            buttonDisabled: true
        })
        try {
            let res = await fetch('/login', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: this.state.username,
                    password: this.state.password
                })
            });
            let result = await res.json();
            if (result && result.success) {
                userstore.isLoggedIn = true;
                userstore.username = result.username;
            }
            else if (result && result.success === false) {
                this.resetForm();
                alert(result.msg);
            }
        }
        catch (e) {
            console.log(e);
            this.resetForm();
        }
    }
    render() {
        return (
            <body>
           <div class="container">
	        <div class="screen">
		        <div class="screen__content">
			<form class="login">
                <h3>Nursing Schedular login</h3>
				<div class="login__field">
					<i class="login__icon fas fa-user"></i>
                                    <InputField
                                        type='text'
                                         placeholder='Username'
                                        value={this.state.username ? this.state.username : ''}
                                        onChange={(val) => this.setInputValue('username', val)}
                                       
                                    />
                                        </div>
                                        <div class="login__field">
					                    <i class="login__icon fas fa-lock"></i>
                                    <InputField
                                        type='password'
                                        placeholder='Password'
                                        value={this.state.password ? this.state.password : ''}
                                        onChange={(val) => this.setInputValue('password', val)}

                                    />
                                     </div>
                                     
                                   
                                    <SubmitButton
                                        //className="submitButton"
                                        text='Log In'
                                        disabled={this.state.buttonDisabled}
                                        onClick={() => this.doLogin()}
                                    >
                                        <i class="button__icon fas fa-chevron-right"></i>
                                        </SubmitButton>
                                        </form>
                                        </div>
		<div class="screen__background">
			<span class="screen__background__shape screen__background__shape4"></span>
			<span class="screen__background__shape screen__background__shape3"></span>		
			<span class="screen__background__shape screen__background__shape2"></span>
			<span class="screen__background__shape screen__background__shape1"></span>
		</div>		
	</div>
</div>
  
</body>
        );
    }
}
export default LoginForm;
