import React, { Component, PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import CSSModules from 'react-css-modules';
import controller from '../../lib/controller';
import i18n from '../../lib/i18n';
import styles from './index.styl';

@CSSModules(styles, { allowMultiple: true })
class Spindle extends Component {
    static propTypes = {
        state: PropTypes.object,
        actions: PropTypes.object
    };

    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }
    render() {
        const { state, actions } = this.props;
        const { canClick, spindleSpeed } = state;

        return (
            <div>
                <div className="form-group">
                    <div className="row no-gutters">
                        <div className="col-xs-6" style={{ paddingRight: 5 }}>
                            <label className="control-label">{i18n._('Spindle')}</label>
                            <div className="btn-group btn-group-justified" role="group">
                                <div className="btn-group btn-group-sm" role="group">
                                    <button
                                        type="button"
                                        className="btn btn-default"
                                        onClick={() => {
                                            if (spindleSpeed > 0) {
                                                controller.command('gcode', 'M3 S' + spindleSpeed);
                                            } else {
                                                controller.command('gcode', 'M3');
                                            }
                                        }}
                                        title={i18n._('Spindle On, CW (M3)')}
                                        disabled={!canClick}
                                    >
                                        <i className="fa fa-rotate-right" />
                                        &nbsp;M3
                                    </button>
                                </div>
                                <div className="btn-group btn-group-sm" role="group">
                                    <button
                                        type="button"
                                        className="btn btn-default"
                                        onClick={() => {
                                            if (spindleSpeed > 0) {
                                                controller.command('gcode', 'M4 S' + spindleSpeed);
                                            } else {
                                                controller.command('gcode', 'M4');
                                            }
                                        }}
                                        title={i18n._('Spindle On, CCW (M4)')}
                                        disabled={!canClick}
                                    >
                                        <i className="fa fa-rotate-left" />
                                        &nbsp;M4
                                    </button>
                                </div>
                                <div className="btn-group btn-group-sm" role="group">
                                    <button
                                        type="button"
                                        className="btn btn-default"
                                        onClick={() => controller.command('gcode', 'M5')}
                                        title={i18n._('Spindle Off (M5)')}
                                        disabled={!canClick}
                                    >
                                        <i className="fa fa-power-off" />
                                        &nbsp;M5
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-6" style={{ paddingLeft: 5 }}>
                            <label className="control-label">{i18n._('Coolant')}</label>
                            <div className="btn-group btn-group-justified" role="group">
                                <div className="btn-group btn-group-sm" role="group">
                                    <button
                                        type="button"
                                        className="btn btn-default"
                                        onClick={() => {
                                            controller.command('gcode', 'M7');
                                        }}
                                        title={i18n._('Mist Coolant On (M7)')}
                                        disabled={!canClick}
                                    >
                                        <i styleName="icon-fan" />
                                        &nbsp;M7
                                    </button>
                                </div>
                                <div className="btn-group btn-group-sm" role="group">
                                    <button
                                        type="button"
                                        className="btn btn-default"
                                        onClick={() => {
                                            controller.command('gcode', 'M8');
                                        }}
                                        title={i18n._('Flood Coolant On (M8)')}
                                        disabled={!canClick}
                                    >
                                        <i styleName="icon-fan" />
                                        &nbsp;M8
                                    </button>
                                </div>
                                <div className="btn-group btn-group-sm" role="group">
                                    <button
                                        type="button"
                                        className="btn btn-default"
                                        onClick={() => {
                                            controller.command('gcode', 'M9');
                                        }}
                                        title={i18n._('Coolant Off (M9)')}
                                        disabled={!canClick}
                                    >
                                        <i className="fa fa-power-off" />
                                        &nbsp;M9
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="row no-gutters">
                        <div className="col-xs-6" style={{ paddingRight: 5 }}>
                            <label className="control-label">{i18n._('Spindle Speed')}</label>
                            <div className="input-group input-group-xs">
                                <input
                                    type="number"
                                    className="form-control"
                                    value={spindleSpeed}
                                    placeholder="0"
                                    min={0}
                                    step={1}
                                    onChange={actions.handleSpindleSpeedChange}
                                />
                                <span className="input-group-addon">{i18n._('RPM')}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Spindle;
