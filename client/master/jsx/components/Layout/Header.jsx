import React from 'react';
import pubsub from 'pubsub-js';
import HeaderRun from './Header.run'
import { NavDropdown, MenuItem } from 'react-bootstrap';
import cookie from 'react-cookie';

class Header extends React.Component {

    componentDidMount() {

        HeaderRun();

    }

    toggleUserblock(e) {
        e.preventDefault();
        pubsub.publish('toggleUserblock');
    }

    logout() {
        cookie.remove('x-access-token', { path: '/app/' });
        console.log('logging out')
     }

    render() {
        const ddAlertTitle = (
            <span>
                <em className="icon-user"></em>
            </span>
        )
        return (
            <header className="topnavbar-wrapper">
                { /* START Top Navbar */ }
                <nav role="navigation" className="navbar topnavbar">
                    { /* START navbar header */ }
                    <div className="navbar-header">
                        <a href="/" className="navbar-brand">
                                MoveKick
                            
                        </a>
                    </div>
                    { /* END navbar header */ }
                    { /* START Nav wrapper */ }
                    <div className="nav-wrapper" style={{boxShadow: 'none'}}>
                        { /* START Right Navbar */ }
                        <ul className="nav navbar-nav navbar-right">
                            { /* START Alert menu */ }
                            <NavDropdown noCaret eventKey={ 3 } title={ ddAlertTitle } id="basic-nav-dropdown" >
                                <MenuItem 
                                    className="animated flipInX" 
                                    eventKey={3.3}
                                    onClick={this.logout.bind(this)}
                                    href='/'>Logout</MenuItem>
                            </NavDropdown>
                            { /* END Alert menu */ }
                        </ul>
                        { /* END Right Navbar */ }
                    </div>
                    { /* END Nav wrapper */ }
                </nav>
                { /* END Top Navbar */ }
            </header>
            );
    }

}

export default Header;
