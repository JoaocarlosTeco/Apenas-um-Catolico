module.exports = {
  extends: [
    'react-app',
    'react-app/jest'
  ],
  rules: {
    // Desabilitar regras que causam conflitos
    'no-unused-vars': 'off',
    'no-console': 'off',
    'react/no-array-index-key': 'off',
    'import/first': 'off',
    
    // Regras de formatação básicas
    'quotes': 'off',
    'indent': 'off',
    'semi': 'off',
    'comma-dangle': 'off'
  }
}; 