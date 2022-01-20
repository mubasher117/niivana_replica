export const backendUrl = process.env.REACT_APP_BACKEND_URL;
export const routeBase = '/api/v1';
export const ZOOM_JWT_API_KEY = process.env.REACT_APP_ZOOM_JWT_API_KEY;
export const ZOOM_JWT_API_SECRET = process.env.REACT_APP_ZOOM_JWT_API_SECRET;

export const pubsubKeys = {
  publishKey: process.env.REACT_APP_PUBLISH_KEY || '',
  subscribeKey: process.env.REACT_APP_SUBSCRIBE_KEY || '',
};
