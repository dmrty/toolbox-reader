import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ClipboardButton from 'react-clipboard.js';

class ColorSwatch extends Component {
  constructor() {
    super();

    this.state = {
      copied: false,
    };
  }

  onCopySuccess() {
    this.setState({ copied: true });

    setTimeout(() => {
      this.setState({ copied: false });
    }, 1000);
  }

  render() {
    return (
      <div className="tlbx-color-swatch">

        <div className="tlbx-color-swatch-color" style={{ backgroundColor: this.props.color.hex }}>
          <ClipboardButton
            data-clipboard-text={this.props.color.hex}
            className="tlbx-color-swatch-btn"
            onSuccess={this.onCopySuccess.bind(this)}
          >
            {this.state.copied ? 'Copied!' : 'Copy HEX'}
          </ClipboardButton>
        </div>

        <div className="tlbx-color-swatch-infos">
          <h5>{this.props.color.name}</h5>
          <h6>Hex</h6>
          {this.props.color.hex}
          <h6>Rgb</h6>
          rgb({this.props.color.values.rgb.join(',')})
        </div>
      </div>
    );
  }
}

ColorSwatch.propTypes = {
  color: PropTypes.object.isRequired,
};

export default ColorSwatch;
