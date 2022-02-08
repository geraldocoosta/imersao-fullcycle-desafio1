import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Transactions, Prisma } from '@prisma/client';

@Injectable()
export class TransactionService {
  constructor(private prisma: PrismaService) {}

  async transactions(): Promise<Transactions[]> {
    return this.prisma.transactions.findMany();
  }

  async createTransaction(
    data: Prisma.TransactionsCreateInput,
  ): Promise<Transactions> {
    return this.prisma.transactions.create({
      data,
    });
  }
}
