/*
 * @Author: chenhui 18910431294@163.com
 * @Date: 2026-11-10 08:45:46
 * @LastEditors: chenhui 18910431294@163.com
 * @LastEditTime: 2026-11-10 11:06:30
 * @FilePath: \nest\src\animals\dto\query-animal.dto.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import {Type} from "class-transformer"
import { IsInt,IsOptional,IsString,Max,Min,MaxLength } from "class-validator"
export class QueryAnimalDto  {
    
    @Type(()=>Number)
    @IsInt()
    @Min(1)
    page:number = 1;

    @IsInt()
    @Min(10)
    @Max(100)
    limit:number = 10;

    @IsOptional()
    @IsString()
    @MaxLength(100)
    keyword?:string
}
