import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import { withStyles } from '@material-ui/core/styles';
import ProfileIcon from '@material-ui/icons/AccountBox';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import HomeIcon from '@material-ui/icons/Home';
import React from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { bindActionCreators } from "redux";


const drawerWidth = 240;
const styles = theme => ({
    drawerPaper: {
        position: 'relative',
        width: drawerWidth
    },
    toolbar: theme.mixins.toolbar
});



class LeftNav extends React.Component {

    render() {
        const { classes } = this.props;
       
        return (
            <Drawer variant="permanent" classes={{ paper: classes.drawerPaper }}>
                <div className={classes.toolbar} />
                <List component="nav">
                    <ListItem button component={Link} to="/contact">
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Contact" />
                    </ListItem>
                   </List>
                <Divider />
                <List>
                    <ListItem button component={Link} to="/profile">
                        <ListItemIcon>
                            <ProfileIcon />
                        </ListItemIcon>
                        <ListItemText primary="My Profile" />
                    </ListItem>
                    <ListItem button  component={Link} to="/" >
                        <ListItemIcon>
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText primary="Logout" />
                    </ListItem>
                </List>
            </Drawer>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LeftNav));