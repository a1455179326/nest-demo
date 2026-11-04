/*
 * @Author: chenhui 18910431294@163.com
 * @Date: 2026-11-03 13:46:46
 * @LastEditors: chenhui 18910431294@163.com
 * @LastEditTime: 2026-11-03 14:05:09
 * @FilePath: \nest\src\common\exception\forbidden.exception.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import {HttpException,HttpStatus} from "@nestjs/common"
export class ForbiddenException extends HttpException {
 constructor() {
   super('Forbidden222', HttpStatus.FORBIDDEN);
 }
}