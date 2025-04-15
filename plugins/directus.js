import { createDirectus, rest, readItem, readItems } from '@directus/sdk';

const directus = createDirectus('https://directuscon.axtlust.de').with(rest());

export default defineNuxtPlugin(() => {
	return {
		provide: { directus, readItem, readItems },
	};
});