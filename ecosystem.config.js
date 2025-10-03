module.exports = {
  apps : [{
    name: 'my-app',
    script: 'serve',
    args: '-s build -l 8088',
    env: {
      NODE_ENV: 'production'
    }
  }]
};
