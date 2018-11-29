import { Snackbar } from '@material-ui/core';
import React from 'react';
import NotificationContent from './NotificationContent';

class Notification extends React.Component {
    
    hideNotification = () => {
        this.props.hideNotification();
    };

    render() {
        return (
            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={this.props.open}
                autoHideDuration={3000}
                onClose={this.hideNotification}
            >
                <NotificationContent variant={this.props.variant} message={this.props.message} />
            </Snackbar>
        );
    }
}

export default Notification;