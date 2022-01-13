// Copyright (c) 2021 Microsoft
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import * as React from "react";
import { observer } from "mobx-react";
import { observable } from "mobx";
import { Row } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import { withTranslation, WithTranslation } from "react-i18next";
import { AiOutlineUser, AiOutlineDelete } from "react-icons/ai";
import Button from "./button";
import { getUserRoles } from "../helpers/utils";
import {AiOutlineExclamationCircle} from 'react-icons/ai'
import { User } from "../data/companyDetails"
interface IUserResponsibilities {
  id: number;
  eMail: string;
  role: string;
  message: string;
}

@observer
class ResponsibilitiesCax extends React.Component<WithTranslation> {
  @observable private email: string = "";
  @observable private userRole: any = "";
  @observable private user:User={email: '', role: '', message: ''};
  @observable private newarray: IUserResponsibilities[] = [];
  @observable private error:User={email: '', role: '', message: ''};
  @observable private message: string = "";
  @observable private errors: [] = [];

  public userRoles: any;

  async componentDidMount() {
    const onboarding = window.localStorage.getItem("onboarding");
    console.log("responsibilities", onboarding);
    // try {
    //   this.userRoles = await getUserRoles();
    //   console.log(this.userRoles);
    //   //   this.newUserRole = this.userRoles.map((x) => {
    //   //     return { key: x, text: x };
    //   //   });
    //   //   Object.assign(options, this.newUserRole);
    //   //   console.log(options);
    // } catch {}
  }

  updateProperty(key, value) {
    this.user[key] = value;
  }

  onChange(event) {
    this.updateProperty(event.target.name, event.target.value);
    console.log(this.user);
  }

  validateUser(){
    if (this.user.email === "") {
        this.error.email = 'Email is required';
    }else if(this.user.role === ""){
      this.error.role = 'Role is required';
    }
  }

  private handleClick() {
   
    this.validateUser();
    const data = {
      id: Math.floor(Math.random() * 100),
      eMail: this.user.email,
      role: this.user.role,
      message: this.user.message,
    };
    this.newarray.push(data);
    this.user.email = "";
    this.user.role = "";
    this.user.message = "";

    console.log(data);
  }

  private removeUser(id: number) {
    this.newarray = this.newarray.filter((x) => x.id !== id);
  }

  public render() {
    return (
      <div className="mx-auto col-9 container-registration">
        <div className="head-section">
          <div className="mx-auto step-highlight d-flex align-items-center justify-content-center">
            2
          </div>
          <h4 className="mx-auto d-flex align-items-center justify-content-center">
            Responsibility & admin account
          </h4>
          <div className="mx-auto text-center col-9">
            Far far away, behind the word mountains, far from the countries
            Vokalia and Consonantia, there live the blind texts.
          </div>
        </div>
        <div className="companydata-form">
          {this.newarray.length > 0 ? (
            <Row className="mx-auto col-9 send-invite">
              <h5>Users selected to invite</h5>
              <Row>
                <ul className="list-group-cax px-2">
                  {this.newarray.map((d) => {
                    return (
                      <li key={d.id} className="list-group-item-cax">
                        <Row>
                          <span className="col-1">
                            <AiOutlineUser />
                          </span>
                          <span className="col-7">{d.eMail}</span>
                          <span className="badge-cax  bg-list-group-cax col-3">
                            {d.role}
                          </span>
                          <span className="col-1 list-group-item-delete">
                            <AiOutlineDelete
                              onClick={() => this.removeUser(d.id)}
                            />
                          </span>
                        </Row>
                      </li>
                    );
                  })}
                </ul>
              </Row>
            </Row>
          ) : (
            ""
          )}

          <Row className="mx-auto col-9">
            <h5>Users to invite</h5>
            <div>No users defined, please use the form below to add users:</div>
          </Row>

          <Row className="mx-auto col-9">
            <div className={(this.error.email !== '')? 'form-data error calender' : 'form-data'}>
              <label> E-mail address </label>
              <input
                type="text"
                name="email"
                value={this.user.email}
                onChange={(e) => this.onChange(e)}
              />
              <AiOutlineExclamationCircle className='calender-icon'/>
              <div className='error-message'>{this.error.email}</div>
            </div>
          </Row>

          <Row className="mx-auto col-9">
            <div  className={(this.error.role !== '')? 'form-data error' : 'form-data'}>
              <label> User role </label>
              <select value={this.user.role} name="role" onChange={(e) => this.onChange(e)}>
                <option value="">Please select a role for this user</option>
                <option value="test2">Legal Manager</option>
                <option value="test3">Signin Manager</option>
              </select>
            </div>
          </Row>

          <Row className="mx-auto col-9">
            <div className="form-data">
              <label> Personal note</label>
              <textarea
                name="message"
                value={this.user.message}
                onChange={(e) => this.onChange(e)}
              />
              <div className="company-hint">
                Optional message in the invitation e-mail. Lorem Ipsum
              </div>
            </div>
          </Row>

          <Row className="mx-auto col-9">
            <Row className="col3">
              <Button
                styleClass="button btn-primaryCax"
                label="Add User"
                handleClick={() => this.handleClick()}
              />
            </Row>
          </Row>
        </div>
      </div>
    );
  }
}

export default withTranslation()(ResponsibilitiesCax);
