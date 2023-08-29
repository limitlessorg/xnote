import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // 设置获取token方式（请求头token 或者 请求体token）
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromHeader(JwtConstants.tokenHeaderName),
        ExtractJwt.fromBodyField(JwtConstants.tokenHeaderName),
        ExtractJwt.fromUrlQueryParameter(JwtConstants.tokenHeaderName),
      ]),
      ignoreExpiration: false,
      secretOrKey: JwtConstants.secret,
    });
  }

  async validate(payload: any) {
    return {
      userId: payload.userId,
      spaceId: payload.spaceId,
      spaceType: payload.spaceType,
    };
  }
}
