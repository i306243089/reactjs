import React from 'react';
import UserForm from '../components/UserForm';
import UserListItem from '../components/UserListItem';
export default class Test extends React.Component {
    constructor(props) {
        super(props);
        // tool.delSession('store');
        // console.log("================tool.getSession('store')================");
        // console.log(tool.getSession('store'));
        if (tool.getSession('store')) {
            this.state = tool.getSession('store');
        } else {
            this.state = {
                LoadingState: 1,// Whether the data is loaded or not
                isShowForm: 0,
                userList: [],
                currentUser: {
                    First: '',
                    Last: '',
                    Gender: ''
                },
                formType: '',
                currentEditIndex: '',
            };
        };// Judging the source of data
    };// constructor

    addUser() {
        this.setState({
            isShowForm: 1,
            formType: 'add',
            currentUser: {
                First: '',
                Last: '',
                Gender: ''
            }
        });
    };// addUser

    _textChange(val, changeVal) {
        this.state.currentUser[val] = changeVal;
        this.setState(this.state);
    }; //_change

    _radioChange(val) {
        this.state.currentUser.Gender = val;
        this.setState(this.state);
    }; //_radioChange

    _submit(val) {
        if (val === 'Random') {
            this.randomFetch();
        } else if (val === 'Save' || val === 'Modify') {
            let currentUser=this.state.currentUser;
            if(!currentUser.First){
                tool.cues({type:"e", txt:"First can't be empty!"});
                return;
            };
            if(!currentUser.Last){
                tool.cues({type:"e", txt:"Last can't be empty!"});
                return;
            };
            if(!currentUser.Gender){
                tool.cues({type:"e", txt:"Sex has no choice!"});
                return;
            };
            if (val === 'Save') {
                this.state.userList.push(this.state.currentUser);
            } else if (val === 'Modify') {
                this.state.userList.splice(this.state.currentEditIndex, 1, this.state.currentUser);
            }
            this.state.isShowForm = 0;
        } else if (val === 'Cancel') {
            this.state.isShowForm = 0;
        }
        tool.saveSession('store',this.state);
        this.setState(this.state);
    }; //_submit

    randomFetch() {
        $.ajax({
            url: api,
            type: "GET",
            success: function(data) {
                let results = data.results[0];
                console.log("================randomuser-api--data================");
                console.log(results);
                this.setState({
                    currentUser: {
                        First: results.name.first,
                        Last: results.name.last,
                        Gender: results.gender
                    }
                });
            }.bind(this),
            error: function (error) {
                console.log("================error.status================");
                console.log("findActivityContent : "+error);
                alert("findActivityContent : "+error);
            },
            //timeout: 5000// Timeout time setting
        });//ajax
    }; //randomFetch

    _editSubmit(val, index) {
        let userList = this.state.userList;
        if (val === 'Delete') {
            userList.splice(index, 1);
            this.setState(this.state);
            tool.saveSession('store',this.state);
        } else if (val === 'Modify') {
            this.setState({
                isShowForm: 1,
                formType: 'Modify',
                currentEditIndex: index,
                currentUser: {
                    First: userList[index].First,
                    Last: userList[index].Last,
                    Gender: userList[index].Gender
                }
            });
        }
    };

    render() {
        return (
            <div className="mainInAll">
                <div className={this.state.LoadingState ? "main mainIn" : "main"}>
                    <div className="head">
                        <div className="headTitle">
                            User Directory
                        </div>
                        <div className="headBtn" onClick={this.addUser.bind(this)}>Add User</div>
                    </div>
                    <div className="userList">
                        {this.state.userList ? this.state.userList.map((item, index) => {
                            return (
                                <UserListItem key={index} index={index} data={item} editSubmit={this._editSubmit.bind(this)}/>
                            );
                        }) : null}
                        {this.state.isShowForm ? (() => {
                            return (
                                <UserForm formType={this.state.formType}  data={this.state.currentUser} submit={this._submit.bind(this)} textChangeAction={this._textChange.bind(this)} radioChangeAction={this._radioChange.bind(this)}/>
                            );
                        })() : null}
                    </div>
                </div>
            </div>
        )
    }//render
}
