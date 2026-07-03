import { defineMessages, FormattedMessage, intlShape, injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import bindAll from 'lodash.bindall';
import Box from '../box/box.jsx';
import Modal from '../../containers/modal.jsx';
import FancyCheckbox from '../tw-fancy-checkbox/checkbox.jsx';
import Input from '../forms/input.jsx';
import BufferedInputHOC from '../forms/buffered-input-hoc.jsx';
import DocumentationLink from '../tw-documentation-link/documentation-link.jsx';
import styles from './minigame-settings-modal.css';
import helpIcon from '../tw-settings-modal/help-icon.svg';
import { APP_NAME } from '../../lib/brand.js';

/* eslint-disable react/no-multi-comp */

const BufferedInput = BufferedInputHOC(Input);

const messages = defineMessages({
    title: {
        defaultMessage: 'Minigame Settings',
        description: 'Title of minigame settings modal',
        id: 'tw.minigameSettingsModal.title'
    },
    help: {
        defaultMessage: 'Click for help',
        description: 'Hover text of help icon in minigame settings',
        id: 'tw.minigameSettingsModal.help'
    }
});

const LearnMore = props => (
    <React.Fragment>
        {' '}
        <DocumentationLink {...props}>
            <FormattedMessage
                defaultMessage="Learn more."
                id="gui.alerts.cloudInfoLearnMore"
            />
        </DocumentationLink>
    </React.Fragment>
);

class UnwrappedSetting extends React.Component {
    constructor(props) {
        super(props);
        bindAll(this, [
            'handleClickHelp'
        ]);
        this.state = {
            helpVisible: false
        };
    }
    componentDidUpdate(prevProps) {
        if (this.props.active && !prevProps.active) {
            // eslint-disable-next-line react/no-did-update-set-state
            this.setState({
                helpVisible: true
            });
        }
    }
    handleClickHelp() {
        this.setState(prevState => ({
            helpVisible: !prevState.helpVisible
        }));
    }
    render() {
        return (
            <div
                className={classNames(styles.setting, {
                    [styles.active]: this.props.active
                })}
            >
                <div className={styles.label}>
                    {this.props.primary}
                    <button
                        className={styles.helpIcon}
                        onClick={this.handleClickHelp}
                        title={this.props.intl.formatMessage(messages.help)}
                    >
                        <img
                            src={helpIcon}
                            draggable={false}
                        />
                    </button>
                </div>
                {this.state.helpVisible && (
                    <div className={styles.detail}>
                        {this.props.help}
                        {this.props.slug && <LearnMore slug={this.props.slug} />}
                    </div>
                )}
                {this.props.secondary}
            </div>
        );
    }
}
UnwrappedSetting.propTypes = {
    intl: intlShape,
    active: PropTypes.bool,
    help: PropTypes.node,
    primary: PropTypes.node,
    secondary: PropTypes.node,
    slug: PropTypes.string
};
const Setting = injectIntl(UnwrappedSetting);

const BooleanSetting = ({ value, onChange, label, ...props }) => (
    <Setting
        {...props}
        active={value}
        primary={
            <label className={styles.label}>
                <FancyCheckbox
                    className={styles.checkbox}
                    checked={value}
                    onChange={onChange}
                />
                {label}
            </label>
        }
    />
);
BooleanSetting.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.bool.isRequired,
    label: PropTypes.node.isRequired
};

const MinigameLength = ({
    minigameLength,
    onMinigameLengthChange
}) => (
    <Setting
        active={true}
        primary={(
            <div className={classNames(styles.label, styles.customStageSize)}>
                <FormattedMessage
                    defaultMessage="Minigame Length"
                    description="Minigame Length option"
                    id="tw.settingsModal.minigameLength"
                />
                <BufferedInput
                    value={minigameLength}
                    onSubmit={onMinigameLengthChange}
                    className={styles.customStageSizeInput}
                    type="number"
                    min="4"
                    max="16"
                    step="1"
                />
            </div>
        )}
        help={(
            <FormattedMessage
                // eslint-disable-next-line max-len
                defaultMessage="The length of the minigame in beats."
                description="Minigame length option"
                id="tw.settingsModal.minigameLengthHelp"
            />
        )}
    />
);
MinigameLength.propTypes = {
    minigameLength: PropTypes.number,
    onMinigameLengthChange: PropTypes.func
};

const MinigameInstruction = ({
    minigameInstruction,
    onMinigameInstructionChange
}) => (
    <Setting
        active={true}
        primary={(
            <div className={classNames(styles.label, styles.customStageSize)}>
                <FormattedMessage
                    defaultMessage="Minigame Instruction"
                    description="Minigame Instruction option"
                    id="tw.settingsModal.minigameInstruction"
                />
                <BufferedInput
                    value={minigameInstruction}
                    onSubmit={onMinigameInstructionChange}
                    className={styles.titleField}
                    type="text"
                />
            </div>
        )}
        help={(
            <FormattedMessage
                // eslint-disable-next-line max-len
                defaultMessage="The instruction text that shows up before the minigame starts."
                description="Minigame instruction option"
                id="tw.settingsModal.minigameInstructionHelp"
            />
        )}
    />
);
MinigameInstruction.propTypes = {
    minigameInstruction: PropTypes.string,
    onMinigameInstructionChange: PropTypes.func
};

const MinigameDefaultGameState = ({
    minigameDefaultGameState,
    onMinigameDefaultGameStateChange
}) => (
    <Setting
        active={true}
        primary={(
            <div className={classNames(styles.label, styles.customStageSize)}>
                <FormattedMessage
                    defaultMessage="Default Game State (win/lose)"
                    description="Minigame Default Game State option"
                    id="tw.settingsModal.minigameDefaultGameState"
                />
                <BufferedInput
                    value={minigameDefaultGameState}
                    onSubmit={onMinigameDefaultGameStateChange}
                    className={styles.titleField}
                    type="text"
                />
            </div>
        )}
        help={(
            <FormattedMessage
                // eslint-disable-next-line max-len
                defaultMessage="The default game state the game will go to after time runs out. You can enter either 'win' or 'lose'."
                description="Minigame default game state option"
                id="tw.settingsModal.minigameDefaultGameStateHelp"
            />
        )}
    />
);
MinigameDefaultGameState.propTypes = {
    minigameDefaultGameState: PropTypes.string,
    onMinigameDefaultGameStateChange: PropTypes.func
};

const Header = props => (
    <div className={styles.header}>
        {props.children}
        <div className={styles.divider} />
    </div>
);
Header.propTypes = {
    children: PropTypes.node
};

const SettingsModalComponent = props => (
    <Modal
        className={styles.modalContent}
        onRequestClose={props.onClose}
        contentLabel={props.intl.formatMessage(messages.title)}
        id="settingsModal"
    >
        <Box className={styles.body}>
            <MinigameLength
                {...props}
            />

            <MinigameInstruction
                {...props}
            />

            <MinigameDefaultGameState
                {...props}
            />
        </Box>
    </Modal>
);

SettingsModalComponent.propTypes = {
    intl: intlShape,
    onClose: PropTypes.func,
    isEmbedded: PropTypes.bool
};

export default injectIntl(SettingsModalComponent);
