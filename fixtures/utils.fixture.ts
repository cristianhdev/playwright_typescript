import { test as base, expect } from '@playwright/test';
import {Utils as tools} from '../commons/utils';


type Fixture = {
  utils: tools;
}

export const Utils = base.extend<Fixture>({
  utils: async ({}, use) => {
    const utils = new tools();
    await use(utils);
  }
});