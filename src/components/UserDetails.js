import * as React from 'react';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import {
  PrimaryButton,
  DefaultButton
} from 'office-ui-fabric-react/lib/Button';
import { ChoiceGroup } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { TextField } from 'office-ui-fabric-react/lib/TextField';

export class UserDetails extends React.Component {
  showPanel;
  constructor(props) {
    super(props);
    this.state = {
      showPanel: false
    };
  }

  render() {
    return (
      <div>
        <Panel
          isOpen={this.props.showPanel}
          type={PanelType.smallFixedFar}
          onDismiss={this.props.closePanel}
          headerText='Contact Details'
          closeButtonAriaLabel='Close'
          onRenderFooterContent={this.onRenderFooterContent}
        >
          <div className='ms-Grid-row'>
            <div class='ms-Grid-col ms-sm12 ms-md12 ms-lg12'>
              <TextField label='Email' value={this.props.email} />
            </div>
          </div>
          <div className='ms-Grid-row'>
            <div class='ms-Grid-col ms-sm12 ms-md12 ms-lg12'>
              <TextField label='Phone' value={this.props.phone} />
            </div>
          </div>

          <div className='ms-Grid-row'>
            <div class='ms-Grid-col ms-sm12 ms-md12 ms-lg12'>
              <TextField label='Cell' value={this.props.cell} />
            </div>
          </div>
        </Panel>
      </div>
    );
  }

  onRenderFooterContent = () => {
    return (
      <div>
        <DefaultButton onClick={this.props.closePanel}>Close</DefaultButton>
      </div>
    );
  };
}
