import { ComponentStory, ComponentMeta } from '@storybook/react';
import Modal from './Modal';
import '../../App.css';

//👇 This default export determines where your story goes in the story list
export default {
	/* 👇 The title prop is optional.
	 * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
	 * to learn how to generate automatic titles
	 */
	title: 'Modal',
	component: Modal,
} as ComponentMeta<typeof Modal>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />;

export const Default = Template.bind({});
Default.args = {
	title: 'Title',
	message: 'Message',
};

export const TwoButtons = Template.bind({});
TwoButtons.args = {
	title: 'Title',
	message: 'Message',
	buttons: [{ label: 'Delete', variant: 'secondary' }, { label: 'Cancel' }],
};
