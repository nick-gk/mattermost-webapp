// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import {FormattedMessage} from 'react-intl';

import {toTitleCase} from 'utils/utils';
import TutorialTourTip from 'components/tutorial_tour_tip/tutorial_tour_tip';
import FormattedMarkdownMessage from 'components/formatted_markdown_message.jsx';
import {
    AdminOnBoardingTourSteps,
    TutorialTourCategories,
} from 'components/tutorial_tour_tip/tutorial_tour_tip.constant';
import {useMeasurePunchouts} from '../tutorial_tour_tip/hooks';

type Props = {
    firstChannelName?: string;
}

const firstChannel = (firstChannelName: string) => {
    const displayFirstChannelName = firstChannelName.split('-').join(' ').trim();
    return (
        <>
            <FormattedMarkdownMessage
                id='adminOnBoardingTour.ChannelsAndDirectMessagesTour.firstChannel'
                defaultMessage='Hey look, there’s your **{firstChannelName}** channel! '
                values={{firstChannelName: toTitleCase(displayFirstChannelName)}}
            />
            <br/>
        </>
    );
};

const ChannelsAndDirectMessagesTour = ({firstChannelName}: Props) => {
    const telemetryTagText = `tutorial_tip_${AdminOnBoardingTourSteps.CHANNELS_AND_DIRECT_MESSAGES}_first_channel`;

    const title = (
        <FormattedMessage
            id='adminOnBoardingTour.ChannelsAndDirectMessagesTour.title'
            defaultMessage={'Channels and direct messages'}
        />
    );
    const screen = (
        <>
            <p>
                {firstChannelName && firstChannel(firstChannelName)}
                <FormattedMarkdownMessage
                    id='adminOnBoardingTour.ChannelsAndDirectMessagesTour.channels'
                    defaultMessage={'Channels are where you can communicate with your team about a topic or project.'}
                />
            </p>
            <p>
                <FormattedMarkdownMessage
                    id='adminOnBoardingTour.ChannelsAndDirectMessagesTour.townSquare'
                    defaultMessage={'**Town Square** can be used for team-wide communication and includes everyone on your team.'}
                />
            </p>
            <p>
                <FormattedMarkdownMessage
                    id='adminOnBoardingTour.ChannelsAndDirectMessagesTour.offTopic'
                    defaultMessage={'**Off-Topic** can be used for fun and humor outside of work-related conversations.'}
                />
            </p>
            <p>
                <FormattedMarkdownMessage
                    id='adminOnBoardingTour.ChannelsAndDirectMessagesTour.directMessages'
                    defaultMessage={'**Direct messages** are for private conversations between individuals or small groups.'}
                />
            </p>
        </>
    );

    return (
        <TutorialTourTip
            title={title}
            screen={screen}
            tutorialCategory={TutorialTourCategories.ADMIN_ON_BOARDING}
            step={AdminOnBoardingTourSteps.CHANNELS_AND_DIRECT_MESSAGES}
            showOptOut={false}
            placement='right'
            pulsatingDotPlacement='right'
            telemetryTag={telemetryTagText}
            width={352}
            autoTour={true}
            punchOut={useMeasurePunchouts(['sidebar-droppable-categories'], [])}
        />
    );
};

export default ChannelsAndDirectMessagesTour;
