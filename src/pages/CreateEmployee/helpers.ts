import { STATES } from './values';

/**
 * Get state abbreviation from full name.
 *
 * @param state - Full state name (California)
 * @returns Abbreviation (CA)
 */
export default function getStateAbbreviation(state: string) {
	return STATES.filter((item) => item.name === state)[0].abbreviation;
}
