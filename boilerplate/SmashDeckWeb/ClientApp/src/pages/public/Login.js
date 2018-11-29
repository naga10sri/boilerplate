import { CircularProgress, Grid, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import React from 'react';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { Link } from 'react-router-dom';
import Notification from '../../components/Notification';
import config from "./../../data/configs.json";
import { storeUserData } from "./../../actions/userStore";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
    root: {
        flexGrow: 1,
        overflowX: 'auto'
    }
});

class Login extends React.Component {
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

            email: "",
            password: "",

            emailValid: false,
            passwordValid: false,
            emailError: false,
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
            case 'email':
                this.setState({ emailValid: value.length > 0 }, this.validateForm); break;
            case 'password':
                this.setState({ passwordValid: value.length > 0 }, this.validateForm); break;
            default: break;
        }
    }

    validateForm() {
        this.setState({
            formValid: this.state.emailValid && this.state.passwordValid
        });
    }

    onSubmit(event) {
        let { email, password } = this.state;
        var data = {
            email,
            password
        };

        this.setState({ showProgress: true });

        fetch(config.apiUrl + "user/login",
            { method: "POST", body: JSON.stringify(data), headers: { "Content-Type": "application/json" } }
        ).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error();
            }
        }).then((data) => {
            this.showNotification("success", "Welcome to Merck Biotech CMS");
            this.setState({ showProgress: false });
            this.props.storeUserData(data);
            this.props.history.push('/dashboard');
        }).catch(error => {
            this.showNotification("error", "Invalid username / password, please try again");
            this.setState({ showProgress: false });
        });
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
                            <img src="/img/logo.png" className="login-logo" alt="logo" />
                        </Grid>
                    </Grid>
                    <Grid item xs={6}>
                        <Grid container direction="row" justify="center" alignItems="center" className="login-right">
                            {
                                this.state.showProgress === true ? <CircularProgress size={60} /> :
                                    <div>
                                        <img src="/img/login-illustration.png" className="login-illustration" alt="logo" />

                                        <Typography variant="h4" gutterBottom>
                                            Sign In
                                        </Typography>

                                        <br />

                                        <ValidatorForm ref="form" onSubmit={this.onSubmit}>
                                            <TextValidator fullWidth variant="outlined"
                                                name="email" label="Email *"
                                                value={this.state.email}
                                                onChange={(e) => this.onInputChange(e)}
                                                validators={['required']}
                                                errorMessages={['Email is required']}

                                            />

                                            <TextValidator fullWidth margin="normal" variant="outlined" type="password"
                                                name="password" label="Password *"
                                                value={this.state.password}
                                                onChange={(e) => this.onInputChange(e)}
                                                validators={['required']}
                                                errorMessages={['Password is required']}
                                            />

                                            <Grid container direction="row" justify="flex-end" spacing={32} >
                                                <Grid item >
                                                    <br />
                                                    <Button size="medium" type="submit" color="default" component={Link} to="/forgot-password" >Forgot Password?</Button>
                                                </Grid>
                                                <Grid item >
                                                    <br />
                                                    <Button size="medium" type="submit" variant="contained" color="primary">Sign In</Button>
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

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ storeUserData: storeUserData }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login));