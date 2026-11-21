import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class TypeOrmExceptionFilter implements ExceptionFilter {
    catch(exception: QueryFailedError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const driverError = exception.driverError as {
            code?: string;
            detail?: string;
        };

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Database error occurred';

        switch (driverError?.code) {
        case '23505':
            status = HttpStatus.CONFLICT;
            message = driverError.detail || 'Duplicate record already exists';
            break;
        case '23503':
            status = HttpStatus.BAD_REQUEST;
            message =
                driverError.detail ||
                'Operation violates foreign key constraint (referenced record missing or in use)';
            break;
        case '22P02':
            status = HttpStatus.BAD_REQUEST;
            message = 'Invalid input syntax';
            break;
        }

        response.status(status).json({
            statusCode: status,
            message,
            timestamp: new Date().toISOString(),
        });
    }
}