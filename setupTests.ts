/* eslint-disable import/no-extraneous-dependencies */
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';
import { randomUUID } from 'node:crypto';

window.crypto.randomUUID = randomUUID;

expect.extend(matchers);

afterEach(() => {
	cleanup();
});
