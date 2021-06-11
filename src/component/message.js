import React from 'react';

const message = (props) => {
    switch(props.type) {
        case 'success':
        return (
            <div class="alert alert-success" role="alert">
                Success : Records are Updated Successfully
            </div>
        )
        break;

        case 'failed':
        return (
            <div class="alert alert-danger" role="alert">
                Failed : Records Not Updated
            </div>
        )
        break;

        default:
        return null

    }
}

export default message;