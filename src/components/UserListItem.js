/**
 * Created by yangpu on 2016/9/18.
 */
import React from 'react'

export default class UserListItem extends React.Component {
    editSubmit(val, index) {
        this.props.editSubmit(val, index);
    };
    render() {
        let {data, index} = this.props;
        return (
            <div className="userListLi">
                <div className="userListLiFirst">First: <strong>{data.First}</strong></div>
                <div className="userListLiLast">Last: <strong>{data.Last}</strong></div>
                <div className="userListLiGender">Gender: <strong>{data.Gender}</strong></div>
                <div className="btn">
                    <div className="btn1"></div>
                    <a href="javascript:void(0)" onClick={this.editSubmit.bind(this, 'Delete', index)}>Delete</a>
                    <a href="javascript:void(0)" onClick={this.editSubmit.bind(this, 'Modify', index)}>Edit</a>
                </div>
            </div>
        );
    };
}



