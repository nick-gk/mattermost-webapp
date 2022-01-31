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

const SendMessageTour = () => {
    const telemetryTagText = `tutorial_tip_${AdminOnBoardingTourSteps.SEND_MESSAGE}_Send_Message`;

    const title = (
        <FormattedMessage
            id='adminOnBoardingTour.sendMessage.title'
            defaultMessage={'Send messages'}
        />
    );
    const screen = (
        <p>
            <FormattedMessage
                id='adminOnBoardingTour.sendMessage.Description'
                defaultMessage={'Type here and press ENTER to send a message. You can also drag and drop attachments into the text field or upload them using the paperclip icon.'}
            />
        </p>
    );

    return (
        <TutorialTourTip
            title={title}
            screen={screen}
            tutorialCategory={TutorialTourCategories.ADMIN_ON_BOARDING}
            step={AdminOnBoardingTourSteps.SEND_MESSAGE}
            showOptOut={false}
            placement='top'
            pulsatingDotPlacement='top-start'
            pulsatingDotTranslate={{x: -6, y: -6}}
            telemetryTag={telemetryTagText}
            width={352}
            autoTour={true}
            punchOut={useMeasurePunchouts(['post-create'], [], {y: -11, height: 11, x: 0, width: 0})}
        />
    );
};

export default SendMessageTour;

