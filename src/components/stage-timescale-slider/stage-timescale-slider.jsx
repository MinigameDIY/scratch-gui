import classNames from 'classnames';
import {defineMessages, injectIntl, intlShape} from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import VM from 'scratch-vm';

import Box from '../box/box.jsx';
import Button from '../button/button.jsx';
import ToggleButtons from '../toggle-buttons/toggle-buttons.jsx';
import Controls from '../../containers/controls.jsx';
import {getStageDimensions} from '../../lib/screen-utils';
import {STAGE_DISPLAY_SIZES, STAGE_SIZE_MODES} from '../../lib/layout-constants';
import SliderMonitorComponent from '../monitor/slider-monitor.jsx';

import styles from './stage-timescale-slider.css';

import FullscreenAPI from '../../lib/tw-fullscreen-api';

const StageSliderComponent = function (props) {
    const {
        customStageSize,
        isFullScreen,
        isPlayerOnly,
        isEmbedded,
        stageSize,
        handleSliderUpdate,
        vm
    } = props;

    let header = null;

    const stageDimensions = getStageDimensions(stageSize, customStageSize, isFullScreen || isEmbedded);
    header = (
        <Box
            className={styles.stageHeaderWrapper}
            // + 2 px because the stage will have 2 pixels of border around it
            style={{minWidth: `${stageDimensions.width + 2}px`}}
        >
            <Box className={styles.stageMenuWrapper}>
                <div className={styles.stageMenuWrapper}>
                    <label>{"Game Speed"}</label>
                    <input
                        type="range"
                        min={0.5}
                        max={2.5}
                        step={1./12.}
                        value={props.timeScale}
                        onChange={e => handleSliderUpdate(parseFloat(e.target.value))}
                    />
                </div>
            </Box>
        </Box>
    );

    return header;
};

const mapStateToProps = state => ({

});

StageSliderComponent.propTypes = {
    intl: intlShape,
    customStageSize: PropTypes.shape({
        width: PropTypes.number,
        height: PropTypes.number
    }),
    isFullScreen: PropTypes.bool.isRequired,
    isPlayerOnly: PropTypes.bool.isRequired,
    isEmbedded: PropTypes.bool.isRequired,
    stageSize: PropTypes.oneOf(Object.keys(STAGE_DISPLAY_SIZES)),
    handleSliderUpdate: PropTypes.func.isRequired,
    vm: PropTypes.instanceOf(VM).isRequired,
    timeScale: PropTypes.number.isRequired,
};

StageSliderComponent.defaultProps = {
    timeScale: 1,
};

export default injectIntl(connect(
    mapStateToProps
)(StageSliderComponent));
