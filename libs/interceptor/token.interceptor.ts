import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as admin from 'firebase-admin';
import { NotFoundException } from '../exceptions/not-found.exception';
import { message } from '../utils/messages';

export class VerifyTokenInterceptor implements NestInterceptor {
    async intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Promise<Observable<string>> {
        const req = context.switchToHttp().getRequest();

        if (!req.headers['authorization']) {
            throw new NotFoundException(message.notFoundToken);
        }

        try {
            const authToken = req.headers['authorization'].split(' ')[1];

            const decodedToken = await admin.auth().verifyIdToken(authToken);
            const verifiedToken = decodedToken.uid;

            req['verifiedToken'] = verifiedToken;

            return next.handle();
        } catch (error) {
            throw new NotFoundException(message.invalidToken);
        }
    }
}