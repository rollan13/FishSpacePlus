import React, { Component } from 'react';

import { Tooltip, OverlayTrigger } from 'react-bootstrap';

export class ButtonWithTooltip extends Component {
    render() {
      let tooltip = <Tooltip id={this.props.tooltipId}><strong>{this.props.tooltipHead}</strong> {this.props.tooltip}</Tooltip>;
    
      return (
        <OverlayTrigger overlay={tooltip} placement="bottom" delayShow={100} delayHide={100}>
            <button type="button" data-target={this.props.dataTarget} id={this.props.buttonId} className={this.props.buttonClass} onClick={this.props.clickEvent}><i className={this.props.iconClass}>{this.props.iconName}</i></button>
        </OverlayTrigger>
      );
    }
}