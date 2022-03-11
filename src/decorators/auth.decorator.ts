import { applyDecorators, UseGuards } from '@nestjs/common';
import { RoleGuard } from '../guards/role.guard';
import { AuthGuard } from '../guards/auth.guard';
import { Roles } from './roles.decorator';

export const Auth = (...roles: string[]) =>
  applyDecorators(Roles(...roles), UseGuards(AuthGuard, RoleGuard));
