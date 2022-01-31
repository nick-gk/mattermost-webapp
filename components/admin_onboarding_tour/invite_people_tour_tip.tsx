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

export const InvitePeopleTour = () => {
    const telemetryTagText = `tutorial_tip_${AdminOnBoardingTourSteps.INVITE_PEOPLE}_Invite_People`;

    const title = (
        <FormattedMessage
            id='adminOnBoardingTour.invitePeople.title'
            defaultMessage={'Invite people to the team'}
        />
    );
    const screen = (
        <p>
            <FormattedMessage
                id='adminOnBoardingTour.invitePeople.Description'
                defaultMessage={'Invite members of your organization or external guests to the team and start collaborating with them.'}
            />
        </p>
    );

    return (
        <TutorialTourTip
            title={title}
            screen={screen}
            tutorialCategory={TutorialTourCategories.ADMIN_ON_BOARDING}
            step={AdminOnBoardingTourSteps.INVITE_PEOPLE}
            showOptOut={false}
            placement='right'
            pulsatingDotPlacement='right-end'
            telemetryTag={telemetryTagText}
            width={352}
            autoTour={true}
            punchOut={useMeasurePunchouts(['showMoreChannels', 'invitePeople'], [], {y: -8, height: 16, x: 0, width: 0})}
        />
    );
};

