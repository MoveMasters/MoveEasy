import React, { Component } from 'react';
import { Grid, Row, Col, Panel, Button } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import util from './../../../util/util';

class Signup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            password: '',
            company: ''
        }
    }

    onInputChange(e, state) {
        console.log('e', state);
        this.setState({ [state]: e.target.value })
    }

    handleCreateAccount(e) {
        e.preventDefault();
        const { setAuthorization } = this.props;

        const moverObj = {
            name: this.state.name,
            username: this.state.email,
            password: this.state.password,
            company: this.state.company
        };
        
        util.signupMover(moverObj).then(res => {
            // continue to dashboard
            console.log('successful signup')
            // reset fields
            this.setState({ email: '', password: '', company: '', name: ''});
            setAuthorization(true);
        }).catch( err => {
            console.log('error signing up')
        })

        

        
    }

    render() {
        const { email, password, company, name } = this.state;
        const { changeView } = this.props;
        return (
            <div className="block-center mt-xl wd-xl">
                { /* START panel */ }
                <div className="panel panel-dark panel-flat">
                    <div className="panel-heading text-center">
                        <a href="#">
                            <h1>Move Kick</h1>
                        </a>
                    </div>
                    <div className="panel-body">
                        <p className="text-center pv">SIGNUP TO GET INSTANT ACCESS.</p>
                        <form role="form" data-parsley-validate="" noValidate className="mb-lg">
                            <div className="form-group has-feedback">
                                <label htmlFor="signupInputName1" className="text-muted">Full Name</label>
                                <input 
                                    id="signupInputName1" 
                                    type="text" 
                                    placeholder="Enter name" 
                                    autoComplete="off" 
                                    required="required" 
                                    className="form-control" 
                                    value={ name }
                                    onChange={ e => this.onInputChange(e, 'name')}/>
                                <span className="fa form-control-feedback text-muted"></span>
                            </div>
                            <div className="form-group has-feedback">
                                <label htmlFor="signupInputEmail1" className="text-muted">Email address</label>
                                <input 
                                    id="signupInputEmail1" 
                                    type="email" 
                                    placeholder="Enter email" 
                                    autoComplete="off" 
                                    required="required" 
                                    className="form-control" 
                                    value={ email }
                                    onChange={ e => this.onInputChange(e, 'email')}/>
                                <span className="fa fa-envelope form-control-feedback text-muted"></span>
                            </div>
                            <div className="form-group has-feedback">
                                <label className="text-muted">Company</label>
                                <input  
                                    type="text" 
                                    placeholder="Enter company" 
                                    autoComplete="off" 
                                    required="required" 
                                    className="form-control" 
                                    value={ company }
                                    onChange={ e => this.onInputChange(e, 'company')}/>
                                <span className="fa form-control-feedback text-muted"></span>
                            </div>
                            <div className="form-group has-feedback">
                                <label htmlFor="signupInputPassword1" className="text-muted">Password</label>
                                <input id="signupInputPassword1" type="password" placeholder="Password" autoComplete="off" required="required" className="form-control" />
                                <span className="fa fa-lock form-control-feedback text-muted"></span>
                            </div>
                            <div className="form-group has-feedback">
                                <label htmlFor="signupInputRePassword1" className="text-muted">Retype Password</label>
                                <input 
                                    id="signupInputRePassword1" 
                                    type="password" 
                                    placeholder="Retype Password" 
                                    autoComplete="off" 
                                    required="required" 
                                    data-parsley-equalto="#signupInputPassword1"
                                    className="form-control" 
                                    value={ password }
                                    onChange={ e => this.onInputChange(e, 'password')}/>
                                <span className="fa fa-lock form-control-feedback text-muted"></span>
                            </div>
                            <div className="clearfix">
                                <div className="checkbox c-checkbox pull-left mt0">
                                    <label>
                                        <input type="checkbox" value="" required="required" name="agreed" />
                                        <em className="fa fa-check"></em>I agree with the <a href="#">terms</a>
                                    </label>
                                </div>
                            </div>
                            <button 
                                type="button" 
                                className="btn btn-block btn-primary mt-lg"
                                onClick={ e => this.handleCreateAccount(e) }>Create account</button>
                        </form>
                        <p className="pt-lg text-center">Have an account?</p><a onClick={ () => changeView('login') } className="btn btn-block btn-default">Signup</a>
                    </div>
                </div>
                { /* END panel */ }
            </div>
            );
    }

}

export default Signup;
