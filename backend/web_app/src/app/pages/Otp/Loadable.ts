/**
 *
 * Asynchronously loads the component for Otp
 *
 */

import { lazyLoad } from 'utils/loadable';

export const Otp = lazyLoad(
  () => import('./index'),
  module => module.Otp,
);
