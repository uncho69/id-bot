const { RateLimiterMemory } = require('rate-limiter-flexible');

// Configurazione rate limiting
const rateLimiter = new RateLimiterMemory({
  keyPrefix: 'defi_mentor',
  points: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // Numero di richieste
  duration: parseInt(process.env.RATE_LIMIT_WINDOW_MS) / 1000 || 900, // Finestra temporale in secondi (15 minuti)
  blockDuration: 60, // Blocca per 1 minuto se supera il limite
});

const rateLimiterMiddleware = async (req, res, next) => {
  try {
    // Usa l'IP dell'utente come chiave
    const key = req.ip || req.connection.remoteAddress;
    
    await rateLimiter.consume(key);
    next();
  } catch (rejRes) {
    const secs = Math.round(rejRes.msBeforeNext / 1000) || 1;
    
    res.set('Retry-After', String(secs));
    res.status(429).json({
      error: 'Troppe richieste. Riprova più tardi.',
      retryAfter: secs
    });
  }
};

module.exports = rateLimiterMiddleware;
