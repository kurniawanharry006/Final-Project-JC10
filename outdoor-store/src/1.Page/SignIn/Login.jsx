import React, { Component } from 'react'
import './style.css'
import {Link} from 'react-router-dom'
import Cookie from 'universal-cookie'
import {onLogin} from '../../redux/1.actions'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'



let cookieObj = new Cookie()
export class Login extends Component {
    state = {
        loginUsername : '',
        loginPassword: '',
        
    }

    componentWillReceiveProps(newProps){
        cookieObj.set('userData', newProps.username, {path : '/'})
    }

    onLoginBtnHandler = () => {
        this.props.onLogin({nama : this.state.loginUsername, kataKunci : this.state.loginPassword})
    }

    render() {
        if(this.props.username !== ''){
            return <Redirect to="/" exact />
        }
       
        return (
            <div className="card form-log" >
                <h5 className="card-header info-color white-text text-center py-4"><strong>Sign in</strong></h5>
                <div className="card-body px-lg-5 pt-0">
                    <form className="text-center" style={{color:'#757575'}} action="#!"></form>
                    <div className="md-form">
                        <input type="email" id="materialLoginFormEmail" className="form-control" placeholder="Username"
                        onChange={(e) => this.setState({loginUsername : e.target.value})}/>
                        
                    </div>
                    <div className="md-form">
                        <input type="password" id="materialLoginFormPassword" className="form-control" placeholder="Password"
                        onChange={(e) => this.setState({loginPassword : e.target.value})}/>
                        
                    </div>
                    <div className="d-flex justify-content-around" ></div>
                    <button className="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0" type="submit" onClick={this.onLoginBtnHandler}>Sign in</button>
                    <p>Not a member?
                        <Link to="/register" style={{textDecoration:'none'}}>Register</Link>
                     </p>
                     
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        username : state.user.username
    }
}

export default connect(mapStateToProps, {onLogin})(Login)
