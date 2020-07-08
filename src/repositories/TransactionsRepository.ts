import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.getValueBox('income');
    const outcome = this.getValueBox('outcome');
    const total = income - outcome;
    const balance = {
      income,
      outcome,
      total,
    };

    return balance;
  }

  private getValueBox(type: string): number {
    return this.transactions
      .filter(transaction => transaction.type === type)
      .reduce((total, value) => {
        return total + value.value;
      }, 0);
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
