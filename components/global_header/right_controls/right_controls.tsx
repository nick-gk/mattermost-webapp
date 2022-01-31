// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import styled from 'styled-components';

import Pluggable from 'plugins/pluggable';
import {Preferences, TutorialSteps} from 'utils/constants';
import CustomizeYourExperienceTour from 'components/admin_onboarding_tour/customize_your_experience_tour_tip';
import StatusDropdown from '../../status_dropdown';
import {AdminOnBoardingTourSteps, TutorialTourCategories} from 'components/tutorial_tour_tip/tutorial_tour_tip.constant';
import {useFirstAdminUser, useShowTutorialStep} from '../hooks';

import SettingsTip from './settings_tip';
import AtMentionsButton from './at_mentions_button/at_mentions_button';
import SavedPostsButton from './saved_posts_button/saved_posts_button';
import SettingsButton from './settings_button';

const RightControlsContainer = styled.div`
    display: flex;
    align-items: center;
    height: 40px;
    flex-shrink: 0;
    position: relative;

    > * + * {
        margin-left: 8px;
    }
`;

export type Props = {
    productId?: string | null;
}

const RightControls = ({productId = null}: Props): JSX.Element => {
    const showSettingsTip = useShowTutorialStep(TutorialSteps.SETTINGS, Preferences.TUTORIAL_STEP);
    const showCustomizeTip = useShowTutorialStep(AdminOnBoardingTourSteps.CUSTOMIZE_EXPERIENCE, TutorialTourCategories.ADMIN_ON_BOARDING);
    const isFirstAdminUser = useFirstAdminUser();

    return (
        <RightControlsContainer
            id={'RightControlsContainer'}
        >
            {productId === null ? (
                <>
                    <AtMentionsButton/>
                    <SavedPostsButton/>
                    <SettingsButton/>
                    {showSettingsTip && <SettingsTip/>}
                    {showCustomizeTip && isFirstAdminUser && <CustomizeYourExperienceTour/>}
                </>
            ) : (
                <Pluggable
                    pluggableName={'Product'}
                    subComponentName={'headerRightComponent'}
                    pluggableId={productId}
                />
            )}
            <StatusDropdown globalHeader={true}/>
        </RightControlsContainer>
    );
};

export default RightControls;
