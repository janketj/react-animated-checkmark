module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'animatedCheckmark',
      externals: {
        react: 'React'
      }
    }
  }
}
