import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Payload } from 'src/interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // 设置获取token方式（请求头token 或者 请求体token）
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        ExtractJwt.fromHeader(process.env.TOKEN_HEADER_NAME),
        ExtractJwt.fromBodyField(process.env.TOKEN_HEADER_NAME),
        ExtractJwt.fromUrlQueryParameter(process.env.TOKEN_HEADER_NAME),
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.TOKEN_SECRET,
    });
  }

  async validate(payload: Payload) {
    return {
      userId: payload.userId,
      spaceId: payload.spaceId,
      spaceType: payload.spaceType,
    };
  }
}
