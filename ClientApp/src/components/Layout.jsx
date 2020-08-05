import React, { Component } from 'react';
import { Container } from '@material-ui/core';


export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
        <div>
            <Container component="main" maxWidth="md">
                <div style={{
                    marginTop: '5%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',}}>
                    {this.props.children}
                    </div>
        </Container>
      </div>
    );
  }
}
