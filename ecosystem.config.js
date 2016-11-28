module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // First application
    {
      name      : "ChatApp",
      script    : "app.js",
      env: {
        COMMON_VARIABLE: "true"
      },
      env_production : {
        NODE_ENV: "production"
      }
    },

  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy : {
    production : {
      user : "node-test",
      host : "192.168.10.11",
      ref  : "origin/master",
      repo : "https://github.com/shediv/chatApp",
      path : "/home/node-test/node-app",
      "post-deploy" : "npm install && pm2 startOrRestart ecosystem.config.js --env production"
    },
    dev : {
      user : "sanket",
      host : "127.0.0.1",
      ref  : "origin/master",
      repo : "https://github.com/shediv/chatApp",
      path : "/home/sanket/node-app",
      "post-deploy" : "npm install && pm2 startOrRestart ecosystem.config.js --env dev",
      env  : {
        NODE_ENV: "dev"
      }
    }
  }
}
