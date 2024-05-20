import { SetMetadata } from '@nestjs/common';

export const AllowUnauthorizedDecorator = () =>
  SetMetadata('allowUnauthorizedRequest', true);
