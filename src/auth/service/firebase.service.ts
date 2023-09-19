import * as admin from 'firebase-admin';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FirebaseService {
  constructor() {
    admin.initializeApp({
      credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SDK)),
      databaseURL: 'https://chat-project-77edd-default-rtdb.firebaseio.com',
    });
  }
}
