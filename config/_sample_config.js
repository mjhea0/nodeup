var config = {};

// github keys
config.github_client_id = process.env.github_client_id || 'GET_YOUR_OWN';
config.github_client_secret = process.env.github_client_secret || 'GET_YOUR_OWN';
config.github_callback_url = process.env.github_callback_url || "http://127.0.0.1:3000/auth/github/callback";

// stripe keys
config.stripe_publishableKey = process.env.stripe_publishableKey || 'GET_YOUR_OWN';
config.stripe_secretKey = process.env.stripe_secretKey  || 'GET_YOUR_OWN';

module.exports = config;