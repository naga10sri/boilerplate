import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import Select from 'react-select';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";



const styles = theme => ({
    root: {
        flexGrow: 1,
        overflowX: 'auto'
    },
    control: {
        padding: theme.spacing.unit * 2
    }
});


class Filter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            filterData: [],
            contactList: [],
            filteredData: []

        };
    }

    componentWillMount() {
        this.setState({ showProgress: true });
        fetch("contact/cityList", {

            method: 'GET', headers: { "Content-Type": "application/json", "Accept": "application/json" }
        }).then(response => response.json().then(data => ({ data: data, status: response.status }))
            .then(response => {
                console.log(response.data);
                setTimeout(() => {
                    this.setState({
                        showProgress: false,
                        cityList: response.data,
                        filterData: response.data.result
                    }, () => {
                        this.createCitytOptions();
                    });
                }, 800);
            })
        ).catch(err => {
            this.setState({ showProgress: false });
        });
        fetch("contact/nameList", {

            method: 'GET', headers: { "Content-Type": "application/json", "Accept": "application/json" }
        }).then(response => response.json().then(data => ({ data: data, status: response.status }))
            .then(response => {
                console.log(response.data);
                setTimeout(() => {
                    this.setState({
                        showProgress: false,
                        nameList: response.data,
                        filterData: response.data.result
                    }, () => {
                        this.createNameOptions();
                    });
                }, 800);
            })
        ).catch(err => {
            this.setState({ showProgress: false });
        });
    }


    getFilterDate(req) {

        this.setState({ showProgress: true });
        fetch("contact", {

            method: 'POST', body: JSON.stringify(req), headers: { "Content-Type": "application/json", "Accept": "application/json" }
        }).then(response => response.json().then(data => ({ data: data, status: response.status }))
            .then(response => {
                console.log(response.data);
                debugger;
                this.props.storeUserData(response.data);
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

    createOption = (label, id) => ({
        label,
        value: label,
        id: id
    });


    createCitytOptions = () => {
        const optionsList = [];
        const data = this.state.cityList;
        let index = 0;

        const pet = data.map((i) => {
            optionsList.push(this.createOption(i, index + 1));
        });
        this.setState(state => ({ optionsList }));
    }

    createNameOptions = () => {
        const nameoptionsList = [];
        const data = this.state.nameList;
        let index = 0;

        const pet = data.map((i) => {
            nameoptionsList.push(this.createOption(i, index + 1));
        });
        this.setState(state => ({ nameoptionsList }));
    }

    filterChange = (selectedCity) => {
        const data = this.state.cityList;

        var req = {
            city: selectedCity.value
        };
        this.getFilterDate(req);
        const filteredData = data.filter((i) => {
            return i.city === selectedCity.city;
        });
        this.setState(state => ({ filterData: filteredData, selectedCity }));
    };

    nameChange = (selectedName) => {
        const data = this.state.nameList;
        var req = {
            Name1: selectedName.value
        };
        this.getFilterDate(req);
        const filteredData = data.filter((i) => {
            return i.name === selectedName.name;
        });
        this.setState(state => ({ filterNameData: filteredData, selectedName }));
    };

    render() {

        const { classes } = this.props;
        const { selectedCity, selectedName } = this.state;

        return (
            <div>
                <Typography variant="subheading">City</Typography>
                <Select
                    options={this.state.optionsList}
                    onChange={this.filterChange}
                    value={selectedCity}
                /><br />
                <Typography variant="subheading">Name</Typography>
                <Select
                    options={this.state.nameoptionsList}
                    onChange={this.nameChange}
                    value={selectedName}
                />

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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Filter));

 //<a className="card-link" data-toggle="collapse" href="#collapseOne"></a>