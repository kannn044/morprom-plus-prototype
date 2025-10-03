module.exports = {
  apps : [{
    name: 'my-app',
    script: 'serve',
    args: '-s build',
    env: {
      NODE_ENV: 'production'
    }
  }]
};
