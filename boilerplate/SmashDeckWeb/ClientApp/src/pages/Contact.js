import { Button, Card, CardContent, Snackbar, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import React from 'react';
import Progress from '../components/Progress';


const styles = theme => ({
  root: {
        flexGrow: 1,
        overflowX: 'auto',
        marginTop: theme.spacing.unit * 2

    },
    control: {
        padding: theme.spacing.unit * 2
    }
});

class Contact extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showProgress: false,
            contactList: [],
            countName: "Verified Contacts",
            filterData: [],
            filteredData: [],
            continuation: null
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
                setTimeout(() => {
                    this.setState({
                        showProgress: false,
                        contactList: response.data,
                        filteredData: response.data,
                        name:''
                    });
                }, 800);
            })
        ).catch(err => {
            this.setState({ showProgress: false });
        });
    }
  

    //nameSearch = (event) => {
    //    if (event.target.value) {
    //        var req = {
    //            name1: event.target.value
    //        };
    //        this.setState({ showProgress: true, name: event.target.value });

    //        fetch("contact", {

    //            method: 'POST', body: JSON.stringify(req), headers: { "Content-Type": "application/json", "Accept": "application/json" }
    //        }).then(response => response.json().then(data => ({ data: data, status: response.status }))
    //            .then(response => {
    //                console.log(response.data);
    //                setTimeout(() => {
    //                    this.setState({
    //                        showProgress: false,
    //                        contactList: response.data
    //                    });
    //                }, 500);
    //            })
    //        ).catch(err => {
    //            this.setState({ showProgress: false });
    //        });
    //    }
    //    else {
    //        this.getContactList();
    //    }
       
    //}

    nameSearch = (event) => {
        const name = event.target.value;
        const data = this.state.filteredData;
        if (name === "") {
            this.setState({ contactList: data, name:'' });
        }
        else {

            const filteredData = data.filter((i) => {
                return i.name1 === name;
            });
            this.setState({ contactList: filteredData, name: event.target.value });
        }
    }


    render() {
        const { classes } = this.props;
        return (
            this.state.showProgress === true ? <Progress /> :
                <div>
                    <div className="row">
                        <div>
                            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                                open={this.state.showNotification}
                                onClose={this.hideNotification}
                                autoHideDuration={5000}
                                message={this.state.notification}
                            />
                        </div>
                        <div className="col-12">
                            <TextField
                                onChange={this.nameSearch}
                                name="name"
                                defaultValue={this.state.name}
                                placeholder="Search Name"
                                fullWidth
                            />
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-12">
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

                                                this.state.contactList.map((customer) => {
                                                    return (
                                                        <TableRow key={customer.id}>
                                                            <TableCell>{customer.id}</TableCell>
                                                            <TableCell>{customer.name1}</TableCell>
                                                            <TableCell>{customer.city}</TableCell>
                                                            <TableCell>{customer.state}</TableCell>
                                                            <TableCell>{customer.address1}</TableCell>
                                                            <TableCell>{customer.country}</TableCell>
                                                            <TableCell>{customer.fax}</TableCell>
                                                            <TableCell>{customer.phone}</TableCell>

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
                    </div>
                </div>
        );
    }

}

export default (withStyles(styles)(Contact));


