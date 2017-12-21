/**
 * Created by yangpu on 2016/9/18.
 */
import React from 'react'

export default class UserForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    };

    change(val, e) {
        let First = e.target.value;
        this.props.textChangeAction(val, First);
    };

    radioChange(val) {
        this.props.radioChangeAction(val);
    };

    submit(val) {
        this.props.submit(val);
    };

    render() {
        let {data, formType} = this.props;
        return (
            <div className="userListLi userListLiForm">
                <div className="userListLiFirst">First: <input type="text" name="First" value={data.First} onChange={this.change.bind(this, 'First')}/></div>
                <div className="userListLiLast">Last: <input type="text" name="Last" value={data.Last} onChange={this.change.bind(this, 'Last')}/></div>
                <div className="userListLiGender">Gender:&nbsp;
                    <label><input name="Gender" type="radio" checked={data.Gender === 'male' ? 'checked' : ''}  onChange={this.radioChange.bind(this, 'male')}/> male</label>&nbsp;
                    <label><input name="Gender" type="radio" checked={data.Gender === 'female' ? 'checked' : ''}  onChange={this.radioChange.bind(this, 'female')}/> female</label>
                </div>
                <div className="btn">
                    <div className="btn1"></div>
                    <a href="javascript:void(0)" onClick={this.submit.bind(this, 'Random')}>Random User</a>
                    {(() => {
                        if(formType === "add"){
                            return (
                                <a href="javascript:void(0)" onClick={this.submit.bind(this, 'Save')}>Save</a>
                            );
                        } else if(formType === "Modify"){
                            return (
                                <a href="javascript:void(0)" onClick={this.submit.bind(this, 'Modify')}>Modify</a>
                            )
                        }
                    })()}
                    <a href="javascript:void(0)" onClick={this.submit.bind(this, 'Cancel')}>Cancel</a>
                </div>
            </div>
        );
    };
}



