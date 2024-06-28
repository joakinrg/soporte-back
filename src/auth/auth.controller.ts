import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../guards/auth.guard';
import { AuthService } from './auth.service';
import { loginUserDto } from './dtos/Login.dto';

@ApiTags('Auth Module')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  //* Constructor
  constructor(private readonly authService: AuthService) {}

  //* Soporte
  //: Iniciar sesión
  @Post('login')
  async loginUsuario(@Body() loginUser: loginUserDto) {
    return this.authService.loginUsuario(loginUser);
  }

  //: Verificar token de autenticación
  @Get('profile')
  @UseGuards(AuthGuard)
  async profile(@Request() req: any) {
    return req.user;
  }
}
