import React, { Component } from 'react';
import { Grid, Row, Col, Panel, Button } from 'react-bootstrap';
import { browserHistory } from 'react-router';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }
    }

    onInputChange(e, state) {
        this.setState({ [state]: e.target.value })
    }

    handleSubmitLogin(e) {
        e.preventDefault()
        console.log('SUBMIT LOGIN TO SERVER FOR AUTHENTICATION')
        console.log(this.state);
        console.log('SAVE COOKIE OR IDENTIFIER TO LOCAL STORAGE')
        this.setState({ email: '', password: ''})
        this.redirectToDashboard();
    }

    redirectToDashboard() {
      // redirect to dashboard
      console.log('rerouting to dashboard');
      const path = `/`;
      browserHistory.push(path);
    }

    render() {
        const { email, password } = this.state;
        return (
            <div className="block-center mt-xl wd-xl">
                { /* START panel */ }
                <div className="panel panel-dark panel-flat">
                    <div className="panel-heading text-center">
                        <h1>MoveKick</h1>
                    </div>
                    <div className="panel-body">
                        <p className="text-center pv">SIGN IN TO CONTINUE.</p>
                        <form role="form" data-parsley-validate="" noValidate className="mb-lg">
                            <div className="form-group has-feedback">
                                <input 
                                    id="exampleInputEmail1" 
                                    type="email" placeholder="Enter email" 
                                    autoComplete="off" 
                                    required="required" 
                                    className="form-control"
                                    value={ email }
                                    onChange={(e) => this.onInputChange(e, 'email')}/>
                                <span className="fa fa-envelope form-control-feedback text-muted"></span>
                            </div>
                            <div className="form-group has-feedback">
                                <input 
                                    id="exampleInputPassword1" 
                                    type="password" 
                                    placeholder="Password" 
                                    required="required" 
                                    className="form-control" 
                                    value={ password }
                                    onChange={ (e) => this.onInputChange(e, 'password') }/>
                                <span className="fa fa-lock form-control-feedback text-muted"></span>
                            </div>
                            <div className="clearfix">
                                <div className="checkbox c-checkbox pull-left mt0">
                                    <label>
                                        <input type="checkbox" value="" name="remember" />
                                        <em className="fa fa-check"></em>Remember Me</label>
                                </div>
                                <div className="pull-right"><a href="/recover" className="text-muted">Forgot your password?</a>
                                </div>
                            </div>
                            <button 
                                type="button" 
                                className="btn btn-block btn-primary mt-lg"
                                onClick={ (e) => this.handleSubmitLogin(e) }>Login</button>
                        </form>
                        <p className="pt-lg text-center">Need to Signup?</p><a href="register" className="btn btn-block btn-default">Register Now</a>
                    </div>
                </div>
                { /* END panel */ }
            </div>
            );
    }

}

export default Login;
