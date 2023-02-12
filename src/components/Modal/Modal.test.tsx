import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Modal from './Modal';

describe('Modal component', () => {
	describe('Text', () => {
		beforeEach(() => {
			render(
				// @ts-ignore
				<Modal
					trapFocus={false}
					title="This is a title"
					content="This is a message"
				/>
			);
		});

		it('should render a title', async () => {
			const title = screen.getByText(/This is a title/i);
			expect(title).toBeInTheDocument();
			expect(title.textContent).toBe('This is a title');
		});

		it('should render a message', async () => {
			const content = screen.getByText(/This is a message/i);
			expect(content).toBeInTheDocument();
			expect(content.textContent).toBe('This is a message');
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
				const buttons = screen.queryAllByRole('button');
				expect(buttons).toHaveLength(0);
			});
		});

		describe('When custom button props are passed', () => {
			it('should render custom button', async () => {
				const { getByRole } = render(
					// @ts-ignore
					<Modal
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

		describe('When prop "closable" is set to true', () => {
			it('should render close button', () => {
				// @ts-ignore
				render(<Modal trapFocus={false} closable />);
				const closeBtn = screen.getByTestId('closeBtn');
				expect(closeBtn).toBeInTheDocument();
			});
			it('should close modal when close button is clicked', async () => {
				const mockHandleClose = vi.fn();
				// @ts-ignore
				render(<Modal trapFocus={false} closable onClose={mockHandleClose} />);
				const closeBtn = screen.getByTestId('closeBtn');
				await userEvent.click(closeBtn);
				expect(mockHandleClose).toHaveBeenCalled();
			});
		});
	});
});
