
import { ArgumentMetadata, Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { isAddress } from 'web3-validator';
import { SignupDto } from './dto/signup';

@Injectable()
export class EthereumAddressValidationPipe implements PipeTransform {
  transform(signupDto: SignupDto, metadata: ArgumentMetadata) {
    if (!isAddress(signupDto.address)) {
      throw new BadRequestException('Invalid Ethereum address');
    }
    return signupDto;
  }
}