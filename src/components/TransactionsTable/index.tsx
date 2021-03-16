
import { Container } from "./styles";
import { createServer, Model } from 'miragejs';
import { useTransactions } from "../../hooks/useTransactions";

createServer({

    models: {
        transaction: Model
    },

    seeds(server) {
        server.db.loadData({
            transactions: [
                {
                    id: 1,
                    title: 'Freelance de website',
                    type: 'deposit',
                    category: 'Dev',
                    amount: 6000,
                    createdAt: new Date('2021-02-02 19:00:00')
                },
                {
                    id: 2,
                    title: 'Salário',
                    type: 'withdraw',
                    category: 'Dev',
                    amount: 1500,
                    createdAt: new Date('2021-04-02 19:00:00')
                },
            ]
        })
    },

    routes() {
        this.namespace = 'api';
        this.get('/transactions', () => {
            return this.schema.all('transaction')
        });
        this.post('/transactions', (schema, request) => {
            const data = JSON.parse(request.requestBody);
            return schema.create('transaction', data);
        })
    }
})

export function TransactionTable() {

    const { transactions } = useTransactions();

    return (
        <Container>
            <table>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Valor</th>
                        <th>Categoria</th>
                        <th>Data</th>
                    </tr>
                </thead>

                <tbody>
                    {transactions.map(
                        transaction => {
                            return (
                                <tr key={transaction.id}>
                                    <td>{transaction.title}</td>
                                    <td className={transaction.type}>{transaction.type === 'withdraw' ? '-' : ''}{
                                        new Intl.NumberFormat('pt-BR', {
                                            style: 'currency',
                                            currency: 'BRL'
                                        }).format(transaction.amount)
                                    }</td>
                                    <td>{transaction.category}</td>
                                    <td>{new Intl.DateTimeFormat('pt-BR').format(new Date(transaction.createdAt))}</td>
                                </tr>)
                        })}
                </tbody>
            </table>
        </Container>
    )
}