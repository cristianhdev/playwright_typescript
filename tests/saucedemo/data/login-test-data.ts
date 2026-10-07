export const loginTestCases = [
  {
    username: 'standard_user',
    password: 'secret_sauce',
    expectedTitle: 'Products',
    dataTest: 'title',
  },
  {
    username: 'locked_out_user',
    password: 'secret_sauce',
    expectedTitle: 'Epic sadface: Sorry, this user has been locked out.',
    dataTest: 'error',
  },
] as const;
