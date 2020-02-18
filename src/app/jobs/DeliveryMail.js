import Mail from '../../lib/Mail';

class DeliveryMail {
  get key() {
    return 'DeliveyMail';
  }

  async handle({ data }) {
    const { delivery } = data;
    await Mail.sendMail({
      to: `${delivery.deliverymanRef.name} <${delivery.deliverymanRef.email}>`,
      subject: 'Notificacao de entrega',
      text: `Nova entrega solicitada e pronta para ser retirada. Seguem listados os dados abaixo:
Produto:  ${delivery.product_name}
Endereco de entrega: Rua: ${delivery.recipientRef.street}, numero: ${delivery.recipientRef.number}, cidade: ${delivery.recipientRef.city}, estado: ${delivery.recipientRef.state}
complemente: ${delivery.recipientRef.complement}`,
    });
  }
}

export default new DeliveryMail();
