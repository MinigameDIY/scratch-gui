import PropTypes from 'prop-types';
import React from 'react';
import {injectIntl, intlShape} from 'react-intl';
import {connect} from 'react-redux';
import {closeMinigameSettingsModal} from '../reducers/modals';
import SettingsModalComponent from '../components/tw-minigame-settings-modal/minigame-settings-modal.jsx';

const FIELDS = [
    {key: 'minigameLength',           runtimeKey: 'length',           default: 8,             propType: PropTypes.number},
    {key: 'minigameInstruction',      runtimeKey: 'instruction',      default: 'Do something!!!', propType: PropTypes.string},
    {key: 'minigameDefaultGameState', runtimeKey: 'defaultGameState', default: 'lose',        propType: PropTypes.string},
];

class MinigameSettingsModal extends React.Component {
    constructor (props) {
        super(props);
        this.state = Object.fromEntries(
            FIELDS.map(({key}) => [key, props[key]])
        );
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange (key, value) {
        const field = FIELDS.find(f => f.key === key);
        this.props.vm.runtime.minigameData[field.runtimeKey] = value;
        this.setState({[key]: value});
    }

    render () {
        const {onClose, vm, ...props} = this.props; // eslint-disable-line no-unused-vars
        FIELDS.forEach(({key}) => delete props[key]);

        const fieldProps = Object.fromEntries(
            FIELDS.flatMap(({key}) => [
                [key, this.state[key]],
                [`on${key.charAt(0).toUpperCase() + key.slice(1)}Change`, v => this.handleChange(key, v)],
            ])
        );

        return (
            <SettingsModalComponent
                onClose={this.props.onClose}
                {...fieldProps}
                {...props}
            />
        );
    }
}

MinigameSettingsModal.propTypes = {
    intl: intlShape,
    onClose: PropTypes.func,
    vm: PropTypes.object,
    ...Object.fromEntries(FIELDS.map(({key, propType}) => [key, propType])),
};

const mapStateToProps = state => ({
    vm: state.scratchGui.vm,
    ...Object.fromEntries(
        FIELDS.map(({key, runtimeKey, default: def}) => [
            key,
            state.scratchGui.vm.runtime.minigameData?.[runtimeKey] ?? def,
        ])
    ),
});

const mapDispatchToProps = dispatch => ({
    onClose: () => dispatch(closeMinigameSettingsModal()),
});

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(MinigameSettingsModal));