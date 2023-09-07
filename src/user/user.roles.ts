import { SetMetadata } from '@nestjs/common';
import { UserRoles } from './user.role';

export const Roles = (...roles: UserRoles[]) => SetMetadata('roles', roles);
