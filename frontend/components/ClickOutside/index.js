import React from 'react';
import onClickOutside from 'react-onclickoutside';

class ClickOutsideContainer extends React.Component {
    constructor(props) {
        super(props);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }
    handleClickOutside() {
        this.props.handleClickOutside();
    }
    render() {
        return (
            <React.Fragment>
                {this.props.children}
            </React.Fragment>
        );
    }
}

export default onClickOutside(ClickOutsideContainer)