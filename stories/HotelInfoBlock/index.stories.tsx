import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import HotelInfoBlock, { HotelInfoBlockProps } from '@components/HotelInfoBlock';

export default {
    title: 'Common/HotelInfoBlock',
    component: HotelInfoBlock,
} as Meta;

const Template: Story<HotelInfoBlockProps> = (args) => <HotelInfoBlock {...args} />;

export const Normal = Template.bind({});
// normal.args = {

// };
