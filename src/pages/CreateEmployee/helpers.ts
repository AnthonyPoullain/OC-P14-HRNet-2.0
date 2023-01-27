import { STATES } from './values';

export default function getStateAbbreviation(state: string) {
	return STATES.filter((item) => item.name === state)[0].abbreviation;
}
