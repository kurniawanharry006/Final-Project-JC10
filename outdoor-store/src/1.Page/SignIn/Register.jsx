import React, { Component } from 'react'
import './style.css'
import Cookie from 'universal-cookie'
import {onRegister} from '../../redux/1.actions'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import swal from 'sweetalert';

let cookieObj = new Cookie()
export class Register extends Component {

    state = {
        registerUsername : '',
        registerPassword : '',
        confirmPassword : '',
        registerEmail : '',
        isSame : true
    }

    componentWillReceiveProps(newProps){
        cookieObj.set('userData', newProps.username, {path : '/'})
    }
    onRegisterBtnHandler = () => {
        if(this.state.confirmPassword !== this.state.registerPassword || (this.state.confirmPassword == '' && this.state.registerPassword == '')){
            this.setState({isSame : false})
        }
        if(!this.state.registerEmail){
            this.refs.registerEmail.className += ' invalid-input'
        }
        if(!this.state.registerUsername){
            this.refs.registerUsername.className += ' invalid-input'
        }
        if(!this.state.confirmPassword){
            this.refs.confirmPassword.className += ' invalid-input'
        }
        if(!this.state.registerPassword){
            this.refs.registerPassword.className += ' invalid-input'
        }
        if(this.state.registerEmail && this.state.registerPassword && this.state.confirmPassword && this.state.registerUsername){
            let registerObj = {
                username : this.state.registerUsername,
                password : this.state.registerPassword,
                email : this.state.registerEmail
            }
    
            this.props.onRegister(registerObj)
        }else{
            swal('input')
        }
    }

    validateInputRegister = () => {
        
    }

    passwordChecker = () => {
        if(!this.state.isSame){
            return(
                <div className="alert alert-danger">Password Salah</div>
            )
        }
    }

    render() {
        if(this.props.username !== ''){
            return <Redirect to="/" exact />
        }
        return (
            <div className="card form-log" >
            <h5 className="card-header info-color white-text text-center py-4"><strong>Sign Up</strong></h5>
            <div className="card-body px-lg-5 pt-0">
                <form className="text-center" style={{color:'#757575'}} action="#!"></form>
                <div className="md-form">
                    <input type="email" id="materialLoginFormEmail" className="form-control" placeholder="Username"
                    ref='registerUsername'
                    onChange={(e) => this.setState({registerUsername : e.target.value})}/>
                    
                </div>
                <div className="md-form">
                    <input type="email" id="materialLoginFormEmail" className="form-control" placeholder="Email"
                    ref="registerEmail" 
                    onChange={(e) => this.setState({registerEmail : e.target.value})}/>
                    
                </div>
                <div className="md-form">
                    <input type="password" id="materialLoginFormPassword" className="form-control" placeholder="Password"
                    ref="registerPassword"
                    onChange={(e) => this.setState({registerPassword : e.target.value})}/>
                    
                </div>
                <div className="md-form">
                    <input type="password" id="materialLoginFormPassword" className="form-control" placeholder="Confirm Password"
                    ref="confirmPassword"
                    onChange={(e) => this.setState({confirmPassword : e.target.value})}/>
                    
                </div>
                <div className="d-flex justify-content-around" ></div>
                {
             !this.props.isLoading
                ?
                <button className="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0" type="submit" onClick={this.onRegisterBtnHandler}>Register</button>
                :
            <div className="spinner-border text-primary">
             <span className="sr-only">Loading...</span>
            </div>
            }
                 
            </div>
        </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        isLoading : state.user.loading,
        message : state.user.msg,
        username : state.user.username
    }
}
export default connect(mapStateToProps, {onRegister})(Register)

