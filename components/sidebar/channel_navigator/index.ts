// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect, useSelector} from 'react-redux';
import {bindActionCreators, Dispatch, ActionCreatorsMapObject} from 'redux';

import {Action} from 'mattermost-redux/types/actions';
import {getChannelsNameMapInCurrentTeam} from 'mattermost-redux/selectors/entities/channels';
import {getConfig} from 'mattermost-redux/selectors/entities/general';
import {getInt, shouldShowUnreadsCategory, getAddChannelButtonTreatment} from 'mattermost-redux/selectors/entities/preferences';
import {getCurrentUserId} from 'mattermost-redux/selectors/entities/users';

import {openModal, closeModal} from 'actions/views/modals';
import {browserHistory} from 'utils/browser_history';
import {Constants, ModalIdentifiers, Preferences, TutorialSteps} from 'utils/constants';
import {isModalOpen} from 'selectors/views/modals';

import {ModalData} from 'types/actions';
import {GlobalState} from 'types/store';
import {AdminOnBoardingTourSteps, TutorialTourCategories} from 'components/tutorial_tour_tip/tutorial_tour_tip.constant';
import {isFirstAdmin} from '../../next_steps_view/steps';

import ChannelNavigator from './channel_navigator';

// TODO: For Phase 1. Will revisit history in Phase 2
function goBack() {
    return () => {
        browserHistory.goBack();
        return {data: null};
    };
}

function goForward() {
    return () => {
        browserHistory.goForward();
        return {data: null};
    };
}

function mapStateToProps(state: GlobalState) {
    const config = getConfig(state);
    const channelsByName = getChannelsNameMapInCurrentTeam(state);
    const enableTutorial = config.EnableTutorial === 'true';
    const currentUserId = getCurrentUserId(state);
    const tutorialStep = getInt(state, Preferences.TUTORIAL_STEP, currentUserId, TutorialSteps.FINISHED);
    const isFirstAdminUser = isFirstAdmin(state);
    const showCreateTutorialTip = getInt(state, TutorialTourCategories.ADMIN_ON_BOARDING, currentUserId, 0) === AdminOnBoardingTourSteps.CREATE_AND_JOIN_CHANNELS;
    const showInviteTutorialTip = getInt(state, TutorialTourCategories.ADMIN_ON_BOARDING, currentUserId, 0) === AdminOnBoardingTourSteps.INVITE_PEOPLE;

    return {
        townSquareDisplayName: channelsByName[Constants.DEFAULT_CHANNEL]?.display_name || '',
        offTopicDisplayName: channelsByName[Constants.OFFTOPIC_CHANNEL]?.display_name || '',
        showTutorialTip: enableTutorial && tutorialStep === TutorialSteps.ADD_CHANNEL_POPOVER,
        canGoBack: true, // TODO: Phase 1 only
        canGoForward: true,
        showUnreadsCategory: shouldShowUnreadsCategory(state),
        addChannelButton: getAddChannelButtonTreatment(state),
        isQuickSwitcherOpen: isModalOpen(state, ModalIdentifiers.QUICK_SWITCH),
        showCreateTutorialTip: isFirstAdminUser && showCreateTutorialTip,
        showInviteTutorialTip: isFirstAdminUser && showInviteTutorialTip,
    };
}

type Actions = {
    openModal: <P>(modalData: ModalData<P>) => void;
    closeModal: (modalId: string) => void;
    goBack: () => void;
    goForward: () => void;
}

function mapDispatchToProps(dispatch: Dispatch) {
    return {
        actions: bindActionCreators<ActionCreatorsMapObject<Action>, Actions>({
            openModal,
            closeModal,
            goBack,
            goForward,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChannelNavigator);
