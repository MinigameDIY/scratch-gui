import PropTypes from 'prop-types';
import React from 'react';
import bindAll from 'lodash.bindall';
import VM from 'scratch-vm';
import {STAGE_DISPLAY_SCALE_METADATA, STAGE_DISPLAY_SIZES, STAGE_SIZE_MODES} from '../lib/layout-constants';
import {setStageSize} from '../reducers/stage-size';
import {setFullScreen} from '../reducers/mode';
import {connect} from 'react-redux';

import StageSliderComponent from '../components/stage-timescale-slider/stage-timescale-slider.jsx';

// eslint-disable-next-line react/prefer-stateless-function
class StageTimeScaleSlider extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleSliderUpdate'
        ]);
        this.state = {
            timeScale: props.vm.runtime.timeScale || 1
        };
    }

    handleSliderUpdate (value) {
        this.props.vm.runtime.timeScale = value;
        this.setState({timeScale: value});
    }

    render () {
        const {
            ...props
        } = this.props;
        return (
            <StageSliderComponent
                {...props}
                timeScale={this.state.timeScale}
                handleSliderUpdate={this.handleSliderUpdate}
            />
        );
    }
}

StageTimeScaleSlider.propTypes = {
    isFullScreen: PropTypes.bool.isRequired,
    // tw: update when dimensions or isWindowFullScreen changes
    isWindowFullScreen: PropTypes.bool.isRequired,
    customStageSize: PropTypes.shape({
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired
    }).isRequired,
    dimensions: PropTypes.arrayOf(PropTypes.number),
    isPlayerOnly: PropTypes.bool,
    // tw: replace showBranding
    isEmbedded: PropTypes.bool.isRequired,
    stageSizeMode: PropTypes.oneOf(Object.keys(STAGE_SIZE_MODES)).isRequired,
    vm: PropTypes.instanceOf(VM).isRequired
};

const mapStateToProps = state => ({
    customStageSize: state.scratchGui.customStageSize,
    stageSizeMode: state.scratchGui.stageSize.stageSize,
    // tw: replace showBranding
    isEmbedded: state.scratchGui.mode.isEmbedded,
    isFullScreen: state.scratchGui.mode.isFullScreen,
    // tw: update when dimensions or isWindowFullScreen changes
    isWindowFullScreen: state.scratchGui.tw.isWindowFullScreen,
    dimensions: state.scratchGui.tw.dimensions,
    isPlayerOnly: state.scratchGui.mode.isPlayerOnly
});

const mapDispatchToProps = dispatch => ({
    onTimeScaleChange: value => dispatch(setTimeScale(value))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StageTimeScaleSlider);
