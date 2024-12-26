import { getApps, initializeApp, cert, type ServiceAccount } from 'firebase-admin/app';

export function initAdmin() {
  if (getApps().length <= 0) {
    const config: ServiceAccount = {
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    };

    initializeApp({
      credential: cert(config),
    });
  }
}

