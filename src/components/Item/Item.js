import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ClipboardButton from 'react-clipboard.js';

import SyntaxHighlighter, { registerLanguage } from 'react-syntax-highlighter/dist/light';
import xml from 'react-syntax-highlighter/dist/languages/xml';
import { atomOneDark } from 'react-syntax-highlighter/dist/styles';

import './Item.css';

registerLanguage('html', xml);

class Item extends Component {
  constructor() {
    super();

    this.state = {
      copied: false
    }
  }

  onCopySuccess() {
    this.setState({ copied: true });

    setTimeout(() => {
      this.setState({ copied: false });
    }, 1000);
  }

  handleItemClick(e) {
    // Disable all inner links
    e.preventDefault();
  }

  render() {
    const title = this.props.title && <h3 className="tlbx-item-title">{this.props.title}</h3>;

    return (
      <div className="tlbx-item">
        {title}
        <div className="tlbx-actions">
          <Link className="tlbx-actions-link" to={this.props.fullUrl}>View full render</Link>
          <ClipboardButton
            data-clipboard-text={this.props.children}
            className="tlbx-actions-link"
            onSuccess={this.onCopySuccess.bind(this)}
          >
            {this.state.copied ? 'Copied!' : 'Copy'}
          </ClipboardButton>
        </div>
        <div
          className={`tlbx-item-preview ${this.props.wrapper} ${this.props.slug}`}
          style={this.props.background ? {backgroundColor: this.props.background} : {}}
          dangerouslySetInnerHTML={{ __html: this.props.children }}
          onClick={this.handleItemClick.bind(this)}
        />
        <div className={`tlbx-item-code${this.props.store.showAllCode ? ' tlbx-hidden' : ''}`}>
          <SyntaxHighlighter
            language='html'
            style={atomOneDark}
            wrapLines={true}
            showLineNumbers={true}
            lineNumberContainerStyle={{
              float: 'left',
              textAlign: 'right',
              marginRight: '10px',
              opacity: '0.5'
            }}
            customStyle={{
              padding: '1.3em 1em',
              fontSize: '16px',
              lineHeight: '1.4em',
            }}
          >
            {this.props.children}
          </SyntaxHighlighter>
        </div>
      </div>
    );
  }
}

Item.PropTypes = {
  title: PropTypes.string,
  fullUrl: PropTypes.string.isRequired,
  wrapper: PropTypes.string,
  slug: PropTypes.string,
  background: PropTypes.string,
  children: PropTypes.string.isRequired,
}

export default Item;
