// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import {FormattedMessage} from 'react-intl';

import TutorialTourTip from 'components/tutorial_tour_tip/tutorial_tour_tip';
import {
    AdminOnBoardingTourSteps,
    TutorialTourCategories,
} from 'components/tutorial_tour_tip/tutorial_tour_tip.constant';
import {useMeasurePunchouts} from '../tutorial_tour_tip/hooks';

const CreateAndJoinChannelsTour = () => {
    const telemetryTagText = `tutorial_tip_${AdminOnBoardingTourSteps.CREATE_AND_JOIN_CHANNELS}_Create_Join_Channels`;

    const title = (
        <FormattedMessage
            id='adminOnBoardingTour.CreateAndJoinChannels.title'
            defaultMessage={'Create and join channels'}
        />
    );
    const screen = (
        <p>
            <FormattedMessage
                id='adminOnBoardingTour.CreateAndJoinChannels.Description'
                defaultMessage={'Create new channels or browse available channels to see what your team is discussing. As you join channels, organize them into  categories based on how you work.'}
            />
        </p>
    );

    return (
        <TutorialTourTip
            title={title}
            screen={screen}
            tutorialCategory={TutorialTourCategories.ADMIN_ON_BOARDING}
            step={AdminOnBoardingTourSteps.CREATE_AND_JOIN_CHANNELS}
            showOptOut={false}
            placement='right'
            pulsatingDotPlacement='right-start'
            telemetryTag={telemetryTagText}
            width={352}
            autoTour={true}
            punchOut={useMeasurePunchouts(['showMoreChannels', 'invitePeople'], [], {y: -8, height: 16, x: 0, width: 0})}
        />
    );
};

export default CreateAndJoinChannelsTour;

