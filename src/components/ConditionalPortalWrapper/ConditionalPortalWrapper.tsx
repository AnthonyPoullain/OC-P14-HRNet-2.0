import { createPortal } from 'react-dom';

/**
 * Renders the children into a portal if the selector is found, otherwise renders the children.
 *
 * @param {string | undefined} props.selector - The selector to use to find the element to render the portal into.
 * @param {JSX.Element} props.children - The children to render into the portal.
 *
 * @returns {JSX.Element} - The children rendered into the portal if the selector is found, otherwise the children.
 */
export default function ConditionalPortalWrapper({
	selector,
	children,
}: {
	selector: string | undefined;
	children: JSX.Element;
}) {
	const portalElement = selector ? document.querySelector(selector) : null;
	return portalElement ? createPortal(children, portalElement) : children;
}
