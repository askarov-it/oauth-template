import { ApiProperty, PickType } from "@nestjs/swagger";
import { UserDto } from 'src/common/users/dto/user.dto';

export class AccessTokenBodyDto extends
  PickType(UserDto, ['id', 'username', 'email', 'provider']) {}

export class AccessTokenDto {
  @ApiProperty()
  accessToken: string;
}
