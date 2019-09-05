import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import Logo from './img/logo-1.png'
import './Navbar.css'
import {connect} from 'react-redux'
import Cookie from 'universal-cookie'
import {resetUser} from '../../redux/1.actions'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';



    let cookieObj = new Cookie()
class NavbarComp extends Component {

   state ={
    navbarOpen : false
   } 


   onBtnLogout = () => {
    cookieObj.remove('userData')
    this.props.resetUser()
}
    render() {
        return (
            <div>
            <Navbar className="nav" expand="md" >
            <Link to="/"><NavbarBrand><img src={Logo} width="85px"/></NavbarBrand></Link>
            <NavbarToggler onClick={() => this.setState({navbarOpen : !this.state.navbarOpen})} />
            <Collapse navbar>
                <Nav className="ml-auto" navbar>
                {
                                this.props.userObj.username !== '' && this.props.userObj.role !== ''
                                ?
                                <>
                                <NavItem>
                                        <NavLink className="nav">{this.props.userObj.showId ? this.props.userObj.id : null}</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink className="nav">Hallo {this.props.userObj.username}</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        {/* <NavLink className="nav">{this.props.userObj.role}</NavLink> */}
                                    </NavItem>
                          <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret className="nav">
                                    Options
                                </DropdownToggle>
                                <DropdownMenu right>
                                {
                                                this.props.userObj.role == 'admin'
                                                ?
                                                <Link style={{textDecoration:'none', color:'inherit'}} to="/admin/dashboard">
                                                    <DropdownItem>
                                                        Admin Dashboard
                                                    </DropdownItem>
                                                </Link>
                                                :
                                                null
                                            }
                                    <DropdownItem>
                                        Cart
                                    </DropdownItem>
                                    <DropdownItem>
                                        History
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem onClick={this.onBtnLogout}>
                                        Logout
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            </>
                                :
                                <>
                            <NavItem >
                                <Link to="/login"><NavLink><input type="button" value="Sign In" className="btn btn-light btn-login" /></NavLink></Link>
                            </NavItem>
                            </>
                            }
                </Nav>
            </Collapse>
        </Navbar>
    </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        userObj : state.user
    }
}

export default connect(mapStateToProps, {resetUser})(NavbarComp)