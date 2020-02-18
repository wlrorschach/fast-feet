import Mail from '../../lib/Mail';

class CalcellationMail {
  get key() {
    return 'CalcellationMail';
  }

  async handle({ data }) {
    const { delivery } = data;
    await Mail.sendMail({
      to: `${delivery.deliveryMan.name} <${delivery.deliveryMan.email}>`,
      subject: 'Notificacao de cancelamnto de entrega',
      text: `A entrega referente ao dados informados abaixo foi cancelada:
Produto:  ${delivery.product_name}
Endereco de entrega: Rua: ${delivery.recipient.street}, numero: ${delivery.recipient.number}, cidade: ${delivery.recipient.city}, estado: ${delivery.recipient.state}
complemente: ${delivery.recipient.complement}`,
    });
  }
}

export default new CalcellationMail();
