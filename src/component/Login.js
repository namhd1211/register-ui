import React, {Component} from 'react';

class Login extends Component {
    render() {
        return (
            <div>
                <div className="panel panel-default">
                    <div className="panel-body">
                        <form className="form-horizontal">
                            <div className="form-group">
                                <label className="col-sm-3 control-label">User Name</label>
                                <div className="col-sm-9">
                                    <input type="text" placeholder="User name"
                                           className="form-control"/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-3 control-label">Password</label>
                                <div className="col-sm-9">
                                    <input type="text" placeholder="Password" className="form-control"/>
                                </div>
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-block custom">Login</button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        );
    }
}
export default Login;
