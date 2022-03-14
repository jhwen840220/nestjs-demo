import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 指定從請求中的哪裡提取 JWT，這裡可以使用 ExtractJwt 來輔助配置。
      ignoreExpiration: false, // 是否忽略過期的 JWT，預設是 false。
      secretOrKey: configService.get('secrets.jwt'), // 放入 JWT 簽章用的密鑰。
    });
  }

  validate(payload: any) {
    const { id, username } = payload;
    return { id, username };
  }
}
