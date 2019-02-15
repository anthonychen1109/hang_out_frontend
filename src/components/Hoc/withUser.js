import React, { Component } from 'react';

const withUser = (WrappedComponent) => (props) => {
    return (
        <div>
            <WrappedComponent {...this.props} />
        </div>
    )
}

export default withUser;