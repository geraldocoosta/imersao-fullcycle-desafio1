import { Body, Controller, Get, Post } from '@nestjs/common';
import { Transactions } from '@prisma/client';
import { TransactionService } from './transaction.service';

@Controller('/transactions')
export class AppController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get()
  async getAllTransactions(): Promise<Transactions[]> {
    return this.transactionService.transactions();
  }

  @Post()
  async createTransaction(
    @Body() postData: { account_id: number; amount: string },
  ): Promise<Transactions> {
    const { account_id, amount } = postData;
    return this.transactionService.createTransaction({ account_id, amount });
  }
}
