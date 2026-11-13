/*
 * @Author: chenhui 18910431294@163.com
 * @Date: 2026-11-12 15:01:06
 * @LastEditors: chenhui 18910431294@163.com
 * @LastEditTime: 2026-11-12 15:01:23
 * @FilePath: \nest\src\auth\dto\login.dto.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { IsString, MaxLength, MinLength } from 'class-validator';

export class LoginDto {
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  username!: string;

  @IsString()
  @MinLength(8)
  @MaxLength(72)
  password!: string;
}