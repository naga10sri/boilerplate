import AppBar from '@material-ui/core/AppBar';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React from 'react';

const styles = theme => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
        minWidth: 0
    },
    row: {
        display: 'flex',
        justifyContent: 'flex-end',
        flex: 2
    }
});

class TopNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null, //For Menu 
        }
    }

    menuOpen = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    menuClose = () => {
        this.setState({ anchorEl: null });
    };

    render() {
        const { classes } = this.props;

        return (
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <Typography variant="title" color="inherit" noWrap>
                       SmashDeck
                    </Typography>
                </Toolbar>
            </AppBar>
        );
    }
}

export default withStyles(styles)(TopNav);