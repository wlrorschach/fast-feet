import Mail from '../../lib/Mail';

class DeliveyMail {
  get key() {
    return 'DeliveyMail';
  }

  async handle(delivery) {
    await Mail.sendMail({
      to: `${delivery.deliveryMan.name} <${delivery.deliveryMan.email}>`,
      subject: 'Notificacao de entrega',
      text: `Nova entrega solicitada e pronta para ser retirada. Seguem listados os dados abaixo:
Produto:  ${delivery.product_name}
Endereco de entrega: Rua: ${delivery.recipient.street}, numero: ${delivery.recipient.number}, cidade: ${delivery.recipient.city}, estado: ${delivery.recipient.state}
complemente: ${delivery.recipient.complement}`,
    });
  }
}

export default new DeliveyMail();
