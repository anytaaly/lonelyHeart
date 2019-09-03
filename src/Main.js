import React, { Component } from 'react';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { DefaultButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Label } from 'office-ui-fabric-react/lib/Label';
import {
  ChoiceGroup,
  IChoiceGroupOption
} from 'office-ui-fabric-react/lib/ChoiceGroup';

import { SearchedUsers } from './components/SearchedUsers.js';
import Axios from 'axios';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersList: {},
      fromAge: '',
      toAge: '',
      gender: null,
      selectedKey: null,
      filterFromAge: '',
      filterToAge: '',
      filterGender: null
    };
  }

  componentDidMount() {
    Axios({
      url: 'https://randomuser.me/api?results=190',
      method: 'get'
    })
      .then(response => this.setOptions(response.data))
      .catch(error => console.log(error));
  }

  setOptions = data => {
    this.setState({
      usersList: data
    });
  };

  onChangeFromAge = fromAge => {
    this.setState({
      fromAge: fromAge
    });
  };

  onChangeToAge = toAge => {
    this.setState({
      toAge: toAge
    });
  };

  onChangeGender = (gender, option) => {
    this.setState({
      gender: option.key,
      selectedKey: option.key
    });
  };

  onReset = () => {
    this.setState({
      fromAge: '',
      toAge: '',
      selectedKey: null,
      gender: null
    });
  };

  onSubmitt = () => {
    const { fromAge, toAge, gender } = this.state;
    this.setState({
      filterFromAge: fromAge,
      filterToAge: toAge,
      filterGender: gender
    });
  };

  render() {
    return (
      <Fabric>
        <div>
          <div class='ms-Grid'>
            <div class='ms-Grid-row'>
              <div
                class='ms-Grid-col ms-sm6 ms-md2 ms-lg1'
                style={{ marginTop: '30px' }}
              >
                <Label>Enter User Age</Label>
              </div>

              <div class='ms-Grid-col ms-sm6 ms-md2 ms-lg1'>
                <TextField
                  label='From '
                  onChanged={this.onChangeFromAge}
                  value={this.state.fromAge}
                />
              </div>
              <div class='ms-Grid-col ms-sm6 ms-md2 ms-lg1'>
                <TextField
                  label='To'
                  onChanged={this.onChangeToAge}
                  value={this.state.toAge}
                />
              </div>

              <div class='ms-Grid-col ms-sm6 ms-md2 ms-lg1'>
                <ChoiceGroup
                  options={[
                    {
                      key: 'male',
                      text: 'Male',
                      'data-automation-id': 'auto1'
                    },
                    {
                      key: 'female',
                      text: 'Female'
                    }
                  ]}
                  onChange={this.onChangeGender}
                  selectedKey={this.state.selectedKey}
                  // label='Gender'
                />
              </div>

              <div
                class='ms-Grid-col ms-sm6 ms-md2 ms-lg1'
                style={{ marginTop: '30px' }}
              >
                <DefaultButton
                  data-automation-id='test'
                  text='Submitt'
                  primary={true}
                  onClick={this.onSubmitt}
                />
              </div>
              <div
                class='ms-Grid-col ms-sm6 ms-md2 ms-lg1'
                style={{ marginTop: '30px' }}
              >
                <DefaultButton
                  data-automation-id='test'
                  text='Reset'
                  primary={true}
                  onClick={this.onReset}
                />
              </div>
            </div>

            <div class='ms-Grid-row'>
              <SearchedUsers
                userList={this.state.usersList}
                fromAge={this.state.filterFromAge}
                toAge={this.state.filterToAge}
                gender={this.state.filterGender}
              />
            </div>
          </div>
        </div>
      </Fabric>
    );
  }
}

export default Main;
