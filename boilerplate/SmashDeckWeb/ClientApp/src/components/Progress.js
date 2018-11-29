import { CircularProgress } from "@material-ui/core";
import React from 'react';

class Progress extends React.Component {
    render() {
        return (
            <div className="progress">
                <CircularProgress size={60} />
            </div>
        );
    }
}

export default Progress;