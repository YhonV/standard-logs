import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { ProductStatus } from '../product.model';

@Injectable()
export class ProductStatusPipe implements PipeTransform {

    readonly allowedProductStatus = [
        ProductStatus.OPEN,
        ProductStatus.IN_PROGRESS,
        ProductStatus.CLOSED
    ]

    transform(value: any, metadata: ArgumentMetadata){

        value = value.toUpperCase();
        console.log(value);
        if (!this.isAllowedStatusProduct(value))
            throw new BadRequestException(`${value} is an invalid status`);
        return value;
    }
        private isAllowedStatusProduct(status: any){
            const idx = this.allowedProductStatus.indexOf(status);
            console.log(idx);
            return idx !== -1;
    }
}