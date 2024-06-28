import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface ClassConstructor {
  new (...args: any[]): object;
}

function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new ClassSerializerInterceptor(dto));
}

class ClassSerializerInterceptor implements NestInterceptor {
  constructor(private dto: any) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data: any) => {
        const prueba = plainToInstance(this.dto, data);
        return prueba;
      }),
    );
  }
}

export { Serialize };
