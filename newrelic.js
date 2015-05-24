var licenseKey = require('credential').newrelic;

exports.config = {
  /**
   * Array of application names.
   */
  app_name: ['kindlized'],
  /**
   * Your New Relic license key.
   */
  license_key: licenseKey,
  logging: {
    /**
     * Level at which to log. 'trace' is most useful to New Relic when diagnosing
     * issues with the agent, 'info' and higher will impose the least overhead on
     * production applications.
     */
    level: 'info'
  }
};
