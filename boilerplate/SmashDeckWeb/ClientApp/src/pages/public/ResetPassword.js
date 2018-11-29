import { CircularProgress, Grid, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import React from 'react';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import Notification from '../../components/Notification';
import config from "./../../data/configs.json";
import { Link } from 'react-router-dom';

class ResetPassword extends React.Component {
    constructor(props) {
        super(props);

        this.showNotification = this.showNotification.bind(this);
        this.hideNotification = this.hideNotification.bind(this);

        this.onInputChange = this.onInputChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            notificationOpen: false,
            notificationVariant: "info",
            notificationMessage: "",

            showProgress: false,

            password: "",

            passwordValid: false,
            passwordError: false,
            formValid: false
        };
    }

    onInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({ [name]: value }, () => { this.validateField(name, value); });
    }

    validateField(fieldName, value) {
        switch (fieldName) {
            case 'password':
                this.setState({ passwordValid: value.length > 0 }, this.validateForm); break;
            default: break;
        }
    }

    validateForm() {
        this.setState({
            formValid: this.state.passwordValid
        });
    }

    onSubmit(event) {
        let token = this.props.location.search.split('=')[1];
        var data = {
            password: this.state.password
        };
        if (this.state.password !== this.state.confirmPassword) {
            this.showNotification("error","Password and ConfirmPassowrd are mismatch , please try again");
            return false;
        }
        this.setState({ showProgress: true });

        fetch(config.apiUrl + "user/reset-password",
            { method: "POST", body: JSON.stringify(data), headers: { "Content-Type": "application/json", "Authorization": "bearer " + token} }
        ).then(response => {
            if (response.ok) {
                this.showNotification("success", "Password has been sent to your email");
                this.setState({ showProgress: false });
                localStorage.setItem('userData', JSON.stringify(data));
                this.props.history.push('/');
            } else {
                this.showNotification("error", "Invalid username / password, please try again");
                this.setState({ showProgress: false });
            }
        })

    }

    showNotification = (variant, message) => {
        this.setState({
            notificationOpen: true,
            notificationVariant: variant,
            notificationMessage: message
        });
    }

    hideNotification = () => {
        this.setState({
            notificationOpen: false,
            notificationVariant: "info",
            notificationMessage: ""
        });
    }

    render() {

        return (
            <div>
                <Notification open={this.state.notificationOpen}
                    variant={this.state.notificationVariant}
                    message={this.state.notificationMessage}
                    hideNotification={this.hideNotification}
                />

                <Grid container>
                    <Grid item xs={6}>
                        <Grid container direction="row" justify="center" alignItems="center" className="login-left">
                            <img src="/img/logo.png" className="login-logo"  alt="logo"/>
                        </Grid>
                    </Grid>
                    <Grid item xs={6}>
                        <Grid container direction="row" justify="center" alignItems="center" className="login-right">
                            {
                                this.state.showProgress === true ? <CircularProgress size={60} /> :
                                    <div>
                                        <Typography variant="h4" gutterBottom color="inherit">
                                            Reset Password
                                        </Typography>
                                        <br />
                                        <Grid item xs={10}>
                                            <Typography variant="subheading" gutterBottom color="inherit" style={{ color: '#93909d' }}>
                                                Enter your password  we'll send you a New Password to your Email.
                                        </Typography>
                                        </Grid>
                                        <br />
                                        <ValidatorForm ref="form" onSubmit={this.onSubmit}>

                                            <TextValidator fullWidth variant="outlined" type="password"
                                                name="password" label="Password *"
                                                value={this.state.password}
                                                onChange={(e) => this.onInputChange(e)}
                                                validators={['required']}
                                                errorMessages={['Password is required']}
                                            />

                                            <TextValidator fullWidth margin="normal" variant="outlined" type="password"
                                                name="confirmPassword" label="Confirm Password *"
                                                value={this.state.confirmPassword}
                                                onChange={(e) => this.onInputChange(e)}
                                                validators={['required']}
                                                errorMessages={['Confirm Password is required']}
                                            />

                                            <Grid container direction="row" spacing={32} justify="flex-end">
                                                <Grid item >
                                                    <br />
                                                    <Button size="medium" type="submit" component={Link} to="/" justify="flex-start">Go back to login </Button>
                                                </Grid>
                                                <Grid item>
                                                    <br />
                                                    <Button size="medium" type="submit" variant="contained" color="primary">Submit</Button>
                                                </Grid>
                                            </Grid>
                                        </ValidatorForm>
                                    </div>
                            }
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default ResetPassword;