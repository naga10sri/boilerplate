import { Button, Card, CardContent, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Progress from '../components/Progress';


const styles = theme => ({
    root: {
        flexGrow: 1,
        overflowX: 'auto'
    },
    control: {
        padding: theme.spacing.unit * 2
    }
});

class GridContent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            index: null,
            countName: "Verified Contacts",
            showProgress: false,
            contactList: []
        };
    }


    componentWillMount() {
        this.getContactList();
    }
    getContactList() {
        this.setState({ showProgress: true });
        fetch("contact", {

            method: 'GET', headers: { "Content-Type": "application/json", "Accept": "application/json" }
        }).then(response => response.json().then(data => ({ data: data, status: response.status }))
            .then(response => {
                console.log(response.data);
                this.setState({
                    contactList: response.data
                });
                dispatch(addRepos(response.data));
                //this.props.storeUserData(response.data);
                setTimeout(() => {
                    this.setState({
                        showProgress: false
                    });
                }, 500);
            })
        ).catch(err => {
            this.setState({ showProgress: false });
        });
    }



    render() {
        const { classes } = this.props;
        return (
            this.state.showProgress === true ? <Progress /> :
                <div>
                    {this.state.countName} : {this.state.contactList.length}
                    <Card>
                        <CardContent>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell><Typography variant="subtitle1">Id</Typography></TableCell>
                                        <TableCell><Typography variant="subtitle1">Name</Typography></TableCell>
                                        <TableCell><Typography variant="subtitle1">City</Typography></TableCell>
                                        <TableCell><Typography variant="subtitle1">State</Typography></TableCell>
                                        <TableCell><Typography variant="subtitle1">Country</Typography></TableCell>
                                        <TableCell><Typography variant="subtitle1">Address1</Typography></TableCell>
                                        <TableCell><Typography variant="subtitle1">Fax</Typography></TableCell>
                                        <TableCell><Typography variant="subtitle1">Phone</Typography></TableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {

                                        this.state.contactList.map((contact) => {
                                            return (
                                                <TableRow key={contact.id}>
                                                    <TableCell>{contact.id}</TableCell>
                                                    <TableCell>{contact.name1}</TableCell>
                                                    <TableCell>{contact.city}</TableCell>
                                                    <TableCell>{contact.state}</TableCell>
                                                    <TableCell>{contact.address1}</TableCell>
                                                    <TableCell>{contact.country}</TableCell>
                                                    <TableCell>{contact.fax}</TableCell>
                                                    <TableCell>{contact.phone}</TableCell>

                                                </TableRow>
                                            );
                                        })


                                    }
                                </TableBody>
                            </Table>
                            {
                                this.state.continuation &&
                                <div className={classes.buttonAction}>
                                    <Button color="primary" size="small" onClick={this.loadMore}>Load More</Button>

                                </div>
                            }
                        </CardContent>
                    </Card>
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
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(GridContent));

