export default {
  ERROR: {
    PASSWORD: { error: 'Password dosent match' },
    DUPLICITY: {
      USER: { error: 'User already exixts' },
      RECIPIENT: { error: 'User already exists' },
    },
    VALIDATION: { error: 'Validations fails!' },
    TOLKEN: { error: 'Invalid tolken!' },
    NO_RESULT: { error: 'Recipient dosent exists' },
    UNAUTORIZED: { error: 'Unauthorized user' },
  },
  SUCCES: {
    TEST: { message: 'End point ok' },
  },
};
