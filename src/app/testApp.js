/**
 * Created by yangpu on 2016/9/18.
 */
import '../css/public.css';
import '../css/test.css';

import React from 'react';
import ReactDOM from 'react-dom';
import Test from '../containers/Test';
class App extends React.Component {
    constructor() {
        super()
    }
    render() {
        return (
            <div>
                <Test/>
            </div>
        )
    }
    componentDidMount() {
        console.log(tool.getUserAgent() + '===========');
    }

}
ReactDOM.render(<App/>, document.getElementById('app'));



