import React, { Component } from 'react';
import AuthForm from '../../UI/AuthForm';
import {login, signup, subscribeToAuthChanges } from '../../api/firebase';

class LoginScreen extends Component {

    state = {
        authMode: 'login'
    }

    componentDidMount() {
        subscribeToAuthChanges(this.onAuthStateChanged)
    }

    onAuthStateChanged = (user) => {
        if (user !== null) {
            this.props.navigation.navigate('App');
        }
    }

    switchAuthMode = () => {
        this.setState(prevState => ({
            authMode: prevState.authMode === 'login' ? 'signup' : 'login'
        }));
    }

    render() {
        return (
            <AuthForm
                login={login}
                signup={createUserProfileDocument}
                authMode={this.state.authMode}
                switchAuthMode={this.switchAuthMode}
            />
        );
    }
}


export default LoginScreen;
