import { Injectable } from '@nestjs/common';
import { AddAuctionDto } from './dto/add-auction';

@Injectable()
export class NftService {
   // constructor(@InjectModel(Collection.name) private collectionModel: Model<Collection>,) {}

    async addAuction(addAuctionDto: AddAuctionDto):Promise<any>
    {
        return "string";
    }
}
