import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config();

const jwtConstants = {
  secret: new ConfigService().getOrThrow('JWT_TOKEN_SECRET'),
};

export { jwtConstants };
