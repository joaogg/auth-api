import rateLimit from 'express-rate-limit'

const limiter = rateLimit({
	windowMs: 1 * 60 * 1000, // 1 minuto
	max: 50, // Limite de requisições
	standardHeaders: true, // Retorna o limite no cabeçalho `RateLimit-*`
	legacyHeaders: false, // Desativa o cabeçalho `X-RateLimit-*`
});

export default limiter;