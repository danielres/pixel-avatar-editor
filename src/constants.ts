export const paths = {
  home: () => '/',
  library: () => '/library',
  draw: () => '/draw',
  account: () => '/account',
  admin: () => '/admin',
  user: (id: string) => `/user/${id}`,
}

export const codes = {
  UNIQUE_CONSTRAINT_VIOLATION: 'UNIQUE_CONSTRAINT_VIOLATION',
}
