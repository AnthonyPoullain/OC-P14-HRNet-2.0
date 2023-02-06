import { ComponentStory, ComponentMeta } from '@storybook/react';
import Modal from './Modal';
import '../../App.css';

export default {
	title: 'Modal',
	component: Modal,
} as ComponentMeta<typeof Modal>;

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
