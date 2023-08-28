import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';
import { isAddress } from 'web3-validator';
import { AddUserDto } from 'src/user/dto/add-user';

@Injectable()
export class EthereumAddressValidationPipe implements PipeTransform {
  transform(addUserDto: AddUserDto, metadata: ArgumentMetadata) {
    if (!isAddress(addUserDto.walletAddress)) {
      throw new BadRequestException('Invalid Ethereum address');
    }
    return addUserDto;
  }
}
