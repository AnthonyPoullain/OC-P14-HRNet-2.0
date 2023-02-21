import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Modal from './Modal';

describe('Modal component', () => {
	describe('Background', () => {
		describe('When no prop is passed', () => {
			it('should dim background by default', async () => {
				render(
					// @ts-ignore
					<Modal trapFocus={false} />
				);
				const bg = screen.getByTestId('modal-bg');
				expect(bg).toBeInTheDocument();
			});
		});
		describe('When dimBackground is set to false', () => {
			it('should not dim background', async () => {
				render(
					// @ts-ignore
					<Modal dimBackground={false} trapFocus={false} />
				);
				const modal = screen.getByTestId('modal');
				expect(modal).toBeInTheDocument();
				const bg = screen.queryByTestId('modal-bg');
				expect(bg).not.toBeInTheDocument();
			});
		});
	});
	describe('Modal', () => {
		describe('When custom height and width are passed', () => {
			it('should have custom height & width attributes', async () => {
				render(
					// @ts-ignore
					<Modal trapFocus={false} height="200px" width="400px" />
				);
				const modal = screen.getByTestId('modal');
				expect(modal).toHaveStyle('height: 200px');
				expect(modal).toHaveStyle('width: 400px');
			});
		});
	});
	describe('Title and content', () => {
		describe('When strings are passed as props', () => {
			beforeEach(() => {
				render(
					// @ts-ignore
					<Modal
						open
						trapFocus={false}
						title="This is a title"
						content="This is a message"
					/>
				);
			});

			it('should render a <h2>title</h2>)', async () => {
				const title = screen.getByText(/This is a title/i);
				expect(title).toBeInTheDocument();
				expect(title.textContent).toBe('This is a title');
				expect(title.nodeName).toBe('H2');
			});

			it('should render a <p>content</p>', async () => {
				const content = screen.getByText(/This is a message/i);
				expect(content).toBeInTheDocument();
				expect(content.textContent).toBe('This is a message');
				expect(content.nodeName).toBe('P');
			});
		});

		describe('When custom HTML is passed as props', () => {
			beforeEach(() => {
				render(
					// @ts-ignore
					<Modal
						open
						trapFocus={false}
						title={<span>This is a title</span>}
						content={<span>This is a message</span>}
					/>
				);
			});

			it('should render custom element/node title)', async () => {
				const title = screen.getByText(/This is a title/i);
				expect(title).toBeInTheDocument();
				expect(title.textContent).toBe('This is a title');
				expect(title.nodeName).toBe('SPAN');
			});

			it('should render custom element/node content)', async () => {
				const content = screen.getByText(/This is a message/i);
				expect(content).toBeInTheDocument();
				expect(content.textContent).toBe('This is a message');
				expect(content.nodeName).toBe('SPAN');
			});
		});
	});

	describe('Buttons', () => {
		describe('When no button props are passed', () => {
			it('should render a default "Ok" button', () => {
				const { getByRole } = render(
					// @ts-ignore
					<Modal trapFocus={false} />
				);
				const button = getByRole('button');
				expect(button).toBeInTheDocument();
				expect(button.textContent).toBe('Ok');
			});

			it('should close modal when default button is clicked', async () => {
				const mockHandleClose = vi.fn();
				const { getByRole } = render(
					// @ts-ignore
					<Modal trapFocus={false} onClose={mockHandleClose} />
				);
				const button = getByRole('button');
				expect(button).toBeInTheDocument();
				await userEvent.click(button);
				expect(mockHandleClose).toHaveBeenCalled();
			});
		});

		describe('When an emtpy array is passed as buttons prop', () => {
			it('should render no buttons', async () => {
				// @ts-ignore
				render(<Modal trapFocus={false} buttons={[]} closable={false} />);
				const modal = screen.getByTestId('modal');
				expect(modal).toBeInTheDocument();
				const buttons = screen.queryAllByRole('button');
				expect(buttons).toHaveLength(0);
			});
		});

		describe('When custom button props are passed', () => {
			it('should render custom button', async () => {
				const { getByRole } = render(
					// @ts-ignore
					<Modal
						open
						trapFocus={false}
						buttons={[{ label: 'This is a custom button' }]}
					/>
				);
				const button = getByRole('button');
				expect(button).toBeInTheDocument();
				expect(button.textContent).toBe('This is a custom button');
			});

			it('should render 2 custom buttons', async () => {
				const { getAllByRole } = render(
					// @ts-ignore
					<Modal
						open
						trapFocus={false}
						buttons={[
							{ label: 'This is a button' },
							{ label: 'This is a second button' },
						]}
					/>
				);
				const buttons = getAllByRole('button');
				expect(buttons).toHaveLength(2);
				expect(buttons[0].textContent).toBe('This is a button');
				expect(buttons[1].textContent).toBe('This is a second button');
			});

			it('should execute callback on button click', async () => {
				const mockHandleClick = vi.fn();
				const { getByRole } = render(
					// @ts-ignore
					<Modal
						open
						trapFocus={false}
						buttons={[
							{ label: 'Execute mock callback', onClick: mockHandleClick },
						]}
					/>
				);
				const button = getByRole('button');
				expect(button).toBeInTheDocument();
				await userEvent.click(button);
				expect(mockHandleClick).toHaveBeenCalled();
			});

			it('should close modal after executing custom button onClick callback', async () => {
				const mockHandleClick = vi.fn();
				const mockHandleClose = vi.fn();
				const { getByRole } = render(
					// @ts-ignore
					<Modal
						open
						trapFocus={false}
						onClose={mockHandleClose}
						buttons={[
							{ label: 'Execute mock callback', onClick: mockHandleClick },
						]}
					/>
				);
				const button = getByRole('button');
				expect(button).toBeInTheDocument();
				await userEvent.click(button);
				expect(mockHandleClick).toHaveBeenCalled();
				expect(mockHandleClose).toHaveBeenCalled();
			});
		});
		describe('When custom HTML is passed as props', () => {
			it('should render custom HTML button', async () => {
				const { getByRole } = render(
					// @ts-ignore
					<Modal
						open
						trapFocus={false}
						buttons={<button type="button">This is a button</button>}
					/>
				);
				const button = getByRole('button');
				expect(button).toBeInTheDocument();
				expect(button.textContent).toBe('This is a button');
				expect(button.nodeName).toBe('BUTTON');
			});
		});
	});
	describe('Close button', () => {
		describe('When prop "closable" is set to true', () => {
			it('should render close button', () => {
				// @ts-ignore
				render(<Modal trapFocus={false} closable />);
				const closeBtn = screen.getByTestId('closeBtn');
				expect(closeBtn).toBeInTheDocument();
			});
			it('should close modal when close button is clicked', async () => {
				const mockHandleClose = vi.fn();
				render(
					// @ts-ignore
					<Modal trapFocus={false} closable onClose={mockHandleClose} />
				);
				const closeBtn = screen.getByTestId('closeBtn');
				await userEvent.click(closeBtn);
				expect(mockHandleClose).toHaveBeenCalled();
			});
		});
	});
});
