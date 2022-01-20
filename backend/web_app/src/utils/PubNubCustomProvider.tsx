import React, { Component } from 'react';
import { PubNubProvider } from 'pubnub-react';
import Pubnub from 'pubnub';
import { pubnub } from 'index';

class PubNubCustomProvider extends Component {
  state = {
    pubnub: pubnub,
  };

  render() {
    return (
      <PubNubProvider client={this.state.pubnub}>
        {this.props.children}
      </PubNubProvider>
    );
  }
}
export default PubNubCustomProvider;
