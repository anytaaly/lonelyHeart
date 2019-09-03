import * as React from 'react';
import {
  DetailsList,
  DetailsListLayoutMode,
  Selection,
  IColumn
} from 'office-ui-fabric-react/lib/DetailsList';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';
import { Label } from 'office-ui-fabric-react/lib/Label';

import { UserDetails } from './UserDetails';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
let _items = [];

export class SearchedUsers extends React.Component {
  _selection;

  constructor(props) {
    super(props);

    const _columns = [
      {
        key: 'column1',
        name: 'Candidate Profile',
        fieldName: 'picture',
        minWidth: 16,
        maxWidth: 200,
        onRender: item => {
          return <img src={item.picture} />;
        }
      },

      {
        key: 'column2',
        name: 'Candidate Name',
        fieldName: 'userName',
        minWidth: 50,
        maxWidth: 200,
        isRowHeader: true,
        isResizable: true,
        isSorted: true,
        isSortedDescending: false,
        onColumnClick: this._onColumnClick,
        data: 'string',
        isPadded: true
      },
      {
        key: 'column3',
        name: 'Gender',
        fieldName: 'gender',
        minWidth: 70,
        maxWidth: 90,
        isResizable: true,
        onColumnClick: this._onColumnClick,
        data: 'gender',
        onRender: item => {
          return <span>{item.gender}</span>;
        },
        isPadded: true
      },
      {
        key: 'column4',
        name: 'Age',
        fieldName: 'age',
        minWidth: 70,
        maxWidth: 90,
        isResizable: true,
        onColumnClick: this._onColumnClick,
        data: 'age',
        onRender: item => {
          return <span>{item.age}</span>;
        },
        isPadded: true
      },
      {
        key: 'column5',
        name: 'Address',
        fieldName: 'address',
        minWidth: 70,
        maxWidth: 200,
        isResizable: true,
        isCollapsable: true,
        data: 'string',
        onColumnClick: this._onColumnClick,
        onRender: item => {
          return <span>{item.address}</span>;
        },
        isPadded: true
      }
    ];

    this._selection = new Selection({
      onSelectionChanged: () => {
        this.setState({
          selectionDetails: this._getSelectionDetails(),
          isModalSelection: this._selection.isModal()
        });
      }
    });

    this.state = {
      items: [],
      columns: _columns,
      selectionDetails: this._getSelectionDetails(),
      isModalSelection: this._selection.isModal(),
      isCompactMode: false,
      showPanel: false,
      userPhone: '',
      userEmail: '',
      userCell: ''
    };
  }
  UNSAFE_componentWillReceiveProps(props) {
    console.log(
      'from Age coming from Main component/class.....',
      props.fromAge
    );
    let usersList = props.userList.results;
    if (props.fromAge != '' && props.toAge != '') {
      usersList = usersList.filter(
        user => user.dob.age >= props.fromAge && user.dob.age <= props.toAge
      );
    }
    if (props.gender != null) {
      usersList = usersList.filter(user => user.gender === props.gender);
    }
    const allUsers = usersList.map(user => {
      return {
        userName:
          user.name.title + ' ' + user.name.first + ' ' + user.name.last,
        gender: user.gender,
        address:
          user.location.street +
          ' ' +
          user.location.city +
          ' ' +
          user.location.state,
        age: user.dob.age,
        location: user.location,
        picture: user.picture.medium,
        phone: user.phone,
        cell: user.cell,
        email: user.email
      };
    });

    this.setState({ items: allUsers });
  }

  calculateAge = dob => {
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    var currentMonth = currentDate.getUTCMonth() + 1;
    var currentDay = currentDate.getUTCDate();
    let dateOfBirthString = JSON.stringify(dob);
    console.log('dateofBirthDtring', dateOfBirthString);
    const dateOfBirth = dateOfBirthString.split('');
    console.log('dateOfBirth', dateOfBirth);
    const DOB = dateOfBirth[0].split('-');
    console.log('this is birthdate', DOB);
    const dobYear = parseInt(DOB[0]);
    console.log(dobYear);
    const dobMonth = parseInt(DOB[1]);
    const dobDay = parseInt(DOB[2]);
    var age = currentYear - dobYear;
    console.log(age);
    if (currentMonth > dobMonth) {
      return age;
    } else {
      if (currentDay >= dobDay) {
        return age;
      } else {
        age--;
        return age;
      }
    }
  };

  render() {
    let {
      columns,
      isCompactMode,
      items,
      selectionDetails,
      userCell,
      userPhone,
      userEmail
    } = this.state;

    return (
      <div>
        <div class='ms-Grid'>
          <div class='ms-Grid-row'>
            <div
              class='ms-Grid-col ms-sm6 ms-md2 ms-lg1'
              style={{ marginTop: '30px' }}
            >
              <Label>
                {' '}
                <strong>Searched Users List</strong>
              </Label>
            </div>
          </div>
          <UserDetails
            showPanel={this.state.showPanel}
            email={userEmail}
            phone={userPhone}
            cell={userCell}
            closePanel={this.closePanel}
          />

          <div>
            {' '}
            <CommandBar items={this._getCommandItems()} />
          </div>

          <DetailsList
            items={items}
            columns={columns}
            isHeaderVisible={true}
            selection={this._selection}
          />
          <div>{selectionDetails}</div>
        </div>
      </div>
    );
  }

  closePanel = () => {
    this.setState({
      showPanel: false
    });
  };

  componentDidUpdate(previousProps, previousState) {
    if (previousState.isModalSelection !== this.state.isModalSelection) {
      this._selection.setModal(this.state.isModalSelection);
    }
  }

  _onChangeModalSelection(checked) {
    this.setState({ isModalSelection: checked });
  }

  _getSelectionDetails() {
    let selectionCount = this._selection.getSelectedCount();

    switch (selectionCount) {
      case 0:
        return 'No items selected';
      case 1:
        return '1 item selected: ' + this._selection.getSelection()[0].name;
      default:
        return `${selectionCount} items selected`;
    }
  }
  _onColumnClick = (ev, column) => {
    const { columns, items } = this.state;
    let newItems = items.slice();
    let newColumns = columns.slice();
    let currColumn = newColumns.filter((currCol, idx) => {
      return column.key === currCol.key;
    })[0];
    newColumns.forEach(newCol => {
      if (newCol === currColumn) {
        currColumn.isSortedDescending = !currColumn.isSortedDescending;
        currColumn.isSorted = true;
      } else {
        newCol.isSorted = false;
        newCol.isSortedDescending = true;
      }
    });
    newItems = this._sortItems(
      newItems,
      currColumn.fieldName,
      currColumn.isSortedDescending
    );
    this.setState({
      columns: newColumns,
      items: newItems
    });
  };

  _sortItems(items, sortBy, descending = false) {
    if (descending) {
      return items.sort((a, b) => {
        if (a[sortBy] < b[sortBy]) {
          return 1;
        }
        if (a[sortBy] > b[sortBy]) {
          return -1;
        }
        return 0;
      });
    } else {
      return items.sort((a, b) => {
        if (a[sortBy] < b[sortBy]) {
          return -1;
        }
        if (a[sortBy] > b[sortBy]) {
          return 1;
        }
        return 0;
      });
    }
  }

  viewContactDetails = () => {
    const count = this._selection.getSelectedCount();
    if (count < 1) {
      return false;
    }

    this.setState({ showPanel: true });
    const selectedUser = this._selection.getSelection()[0];
    this.setState({
      userEmail: selectedUser.email,
      userPhone: selectedUser.phone,
      userCell: selectedUser.cell
    });
  };

  _getCommandItems = () => {
    let {
      canResizeColumns,
      checkboxVisibility,
      constrainMode,
      isHeaderVisible,
      isLazyLoaded,
      layoutMode,
      selectionMode
    } = this.state;

    return [
      {
        key: 'view-contact',
        name: 'View Contact Details',
        icon: 'View',
        onClick: this.viewContactDetails
      }
    ];
  };
}
