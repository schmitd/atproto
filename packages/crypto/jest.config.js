/** @type {import('jest').Config} */
module.exports = {
  displayName: 'Crypto',
  transform: { '^.+\\.(t|j)s$': '@swc/jest' },
  setupFiles: ['<rootDir>/../../jest.setup.ts'],
  moduleNameMapper: { '(.+)\\.js$': ['$1.ts', '$1.js'] },
}
