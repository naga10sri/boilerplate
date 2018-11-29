import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import TopNav from '../components/TopNav';

const styles = theme => ({
    root: {
        flexGrow: 1,
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex'
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
        minWidth: 0,
        minHeight: '100vh'
    },
    toolbar: theme.mixins.toolbar
});

class AdminLayout extends React.Component {
    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <TopNav />
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    {this.props.children}
                </main>
            </div>
        );
    }
}

export default withStyles(styles)(AdminLayout);