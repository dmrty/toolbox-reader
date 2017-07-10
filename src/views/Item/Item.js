import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';

import SyntaxHighlighter, { registerLanguage } from 'react-syntax-highlighter/dist/light';
import xml from 'react-syntax-highlighter/dist/languages/xml';
import { atomOneDark } from 'react-syntax-highlighter/dist/styles';

import './Item.css';

registerLanguage('html', xml);

class Item extends Component {
  render() {
    return (
      <div className="tlbx-item">
        <div className="tlbx-item-preview" dangerouslySetInnerHTML={{ __html: this.props.children }} />
        <div className="tlbx-item-code">
          <SyntaxHighlighter 
            language='html' 
            style={atomOneDark}
          >
            {this.props.children}
          </SyntaxHighlighter>
        </div>
      </div>
    );
  }
}

export default inject('store')(observer(Item));