import React from 'react';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
 

class Example extends React.Component {
  createNotification = (type) => {
    return () => {
      switch (type) {
        case 'info':
          NotificationManager.info('Info message');
          break;
        case 'success':
          NotificationManager.success('Success!', 'Your draft has been created');
          break;
        case 'warning':
          NotificationManager.warning('Warning', 'Please make sure the form is filled in', 3000);
          break;
        case 'error':
          NotificationManager.error('Error message', 'Click me!', 5000, () => {
            alert('callback');
          });
          break;
        default:
          break;
      }
    };
  };
 
  render() {
    return (
      <React.Fragment>
        <button className='btn btn-success btn-md'
          onClick={this.createNotification(this.props.formState)}>Create Draft
        </button>
        <NotificationContainer/>
      </React.Fragment>
    );
  }
}
 
export default Example;