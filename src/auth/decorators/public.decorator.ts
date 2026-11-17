/*
 * @Author: chenhui 18910431294@163.com
 * @Date: 2026-11-17 15:25:22
 * @LastEditors: chenhui 18910431294@163.com
 * @LastEditTime: 2026-11-17 15:42:08
 * @FilePath: \nest\src\auth\decorators\public.decorator.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';

export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
