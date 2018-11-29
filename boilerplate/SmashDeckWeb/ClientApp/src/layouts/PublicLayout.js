import React from 'react';

class PublicLayout extends React.Component {
    render() {
        return (
            <div>
                <div className="content">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default PublicLayout;