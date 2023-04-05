import pino from 'pino';

export const getLogger = (): pino.Logger => {
  return pino({
    base: { traceId: process.env._X_AMZN_TRACE_ID?.split(';', 1)[0].slice(5) },
    level: process.env.PINO_LEVEL || 'info',
    formatters: {
      level: (label) => ({ level: label.toUpperCase() }),
    },
    nestedKey: 'payload',
    redact: {
      paths: [
        'name',
        'address',
        'passport',
        'phone',
        'user.name',
        'user.address',
        'user.passport',
        'user.phone',
        '*.user.name', // * is a wildcard covering a depth of 1
        '*.user.address',
        '*.user.passport',
        '*.user.phone',
      ],
      remove: true,
    },
  });
};
