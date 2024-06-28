import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsuariosService } from '../usuarios/usuarios.service';
import { loginUserDto } from './dtos/Login.dto';

@Injectable()
export class AuthService {
  //* Constructor
  constructor(
    private readonly usersService: UsuariosService,
    private readonly jwtService: JwtService,
  ) {}

  //* Inicio de Sesión
  async loginUsuario({ email, password }: loginUserDto): Promise<object> {
    const [user] = await this.usersService.getUserByEmail(email);

    //: Check if user exists
    if (!user) {
      throw new UnauthorizedException('Correo ingresado incorrecto');
    }

    const storedPasword = user.password;
    const passwordCheck = await bcrypt.compare(password, storedPasword);

    if (!passwordCheck) {
      throw new UnauthorizedException('Contraseña ingresada incorrecta');
    }

    //: Json Web Token
    const payload = {
      sub: user.id,
      email: user.email,
    };

    const token = this.jwtService.sign(payload);

    return { token, email: user.email };
  }
}
