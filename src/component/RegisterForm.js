import React, {Component} from 'react';
import {Link} from "react-router-dom";
import callApi from "./../utils/apiCaller"

class RegisterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            firstName: '',
            lastName: '',
            birthDate: '',
            email: '',
            gender: '',
            isDisplayLogin: true,
            isDisableForm: false,
            errMsg: {}
        };
        this.onHandelChange = this.onHandelChange.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    handleValidation() {
        let {phone, firstName, lastName, email} = this.state;
        let errMsg = {};
        let formIsValid = true;

        if (!phone) {
            formIsValid = false;
            errMsg["phone"] = "Phone number is required.";
        }

        if (typeof phone !== "undefined") {
            if (!phone.match(/^(0)?[1-9]\d{8}$/)) {
                formIsValid = false;
                errMsg["phoneFormat"] = "Invalid phone number format";
            }
        }
        if (!firstName) {
            formIsValid = false;
            errMsg["firstName"] = "First Name is required.";
        }
        if (!lastName) {
            formIsValid = false;
            errMsg["lastName"] = "Last Name is required.";
        }

        if (!email) {
            formIsValid = false;
            errMsg["email"] = "Email is required.";
        }
        this.setState({errMsg: errMsg});
        return formIsValid;
    }

    onHandelChange(event) {
        console.log(event);
        let target = event.target;
        let name = target.name;
        let value = target.value;
        this.setState({
            [name]: value,
        });
    }

    onSave(event) {
        event.preventDefault();
        if (this.handleValidation()) {
            let {phone, firstName, lastName, birthDate, email, gender} = this.state;
            callApi("users/register", 'POST', {
                firstName: firstName,
                lastName: lastName,
                phoneNumber: phone,
                dob: birthDate,
                gender: gender,
                email: email
            }).then(res => {
                console.log(res.data.code);
                if (res.status === 201) {
                    this.setState({
                        isDisableForm: true,
                        isDisplayLogin: false,
                        errMsg: {}
                    });
                }
            }).catch(err => {
                console.log(err.status);
                let errMsg = {};
                if (err.response) {
                    errMsg["response"] = err.response.data.message;
                    this.setState({
                        errMsg: errMsg
                    })
                }
            });
        }
    }

    render() {
        const {isDisplayLogin, isDisableForm} = this.state;
        return (
            <div>
                <fieldset disabled={isDisableForm}>
                    <div className="panel panel-default">
                        <div className="panel-body">
                            <form className="form-horizontal" onSubmit={this.onSave}>
                                <h2>Registration</h2>
                                <span className="help-block">{this.state.errMsg["phone"]}</span>
                                <span className="help-block">{this.state.errMsg["phoneFormat"]}</span>
                                <span className="help-block">{this.state.errMsg["firstName"]}</span>
                                <span className="help-block">{this.state.errMsg["lastName"]}</span>
                                <span className="help-block">{this.state.errMsg["email"]}</span>
                                <span className="help-block">{this.state.errMsg["response"]}</span>
                                <div className="form-group">
                                    <label className="col-sm-3 control-label">Phone number </label>
                                    <div className="col-sm-9">
                                        <input type="phoneNumber" name="phone" placeholder="Phone number"
                                               className="form-control" onChange={this.onHandelChange}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-sm-3 control-label">First Name</label>
                                    <div className="col-sm-9">
                                        <input type="text" name="firstName" placeholder="First Name"
                                               className="form-control"
                                               onChange={this.onHandelChange}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-sm-3 control-label">Last Name</label>
                                    <div className="col-sm-9">
                                        <input type="text" name="lastName" placeholder="Last Name"
                                               className="form-control"
                                               onChange={this.onHandelChange}/>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="col-sm-3 control-label">Date of Birth</label>
                                    <div className="col-sm-9">
                                        <input type="date" name="birthDate" className="form-control"
                                               onChange={this.onHandelChange}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="control-label col-sm-3">Gender</label>
                                    <div className="col-sm-6">
                                        <div className="row">
                                            <div className="col-sm-4">
                                                <label className="radio-inline">
                                                    <input type="radio" name="gender" id="femaleRadio" value="FEMALE"
                                                           onChange={this.onHandelChange}/>Female
                                                </label>
                                            </div>
                                            <div className="col-sm-4">
                                                <label className="radio-inline">
                                                    <input type="radio" name="gender" id="maleRadio" value="MALE"
                                                           onChange={this.onHandelChange}/>Male
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-sm-3 control-label">Email</label>
                                    <div className="col-sm-9">
                                        <input type="email" placeholder="Email" className="form-control" name="email"
                                               onChange={this.onHandelChange}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-block custom">Register</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </fieldset>
                <div className={isDisplayLogin ? "hidden" : "form-group"}>
                    <Link to="/login">
                        <button type="submit" className="btn btn-block custom">Login</button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default RegisterForm;
