import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { UserService } from "../user/user.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({ usernameField: "email" });
  }

  async validate(email: string, password: string) {
    try {
      return await this.userService.verifyUser(email, password);
    } catch (error) {
      throw new UnauthorizedException("Invalid credentials");
    }
  }
}
