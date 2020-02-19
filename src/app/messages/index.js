export default {
  ERROR: {
    PASSWORD: { error: 'Password dosent match' },
    DUPLICITY: {
      USER: { error: 'User already exixts' },
      RECIPIENT: { error: 'Recipient already exists' },
      DELIVERYMAN: { error: 'Deliveryman already exists' },
    },
    VALIDATION: { error: 'Validations fails!' },
    TOLKEN: { error: 'Invalid tolken!' },
    NO_RESULT: { error: 'Recipient dosent exists' },
    UNAUTORIZED: { error: 'Unauthorized user' },
    INTERNAL_SERVER_ERROR: { error: 'Erro interno do servidor' },
    INVALID_DATE: { error: 'Invalid date' },
  },
  SUCCES: {
    TEST: { message: 'End point ok' },
  },
  WARNING: {
    LIST_EMPTY: { message: "You don't have any deliveries" },
    MAX_DELIVERIES: {
      message: 'You already have the maximum number of deliveries for today',
    },
  },
};
