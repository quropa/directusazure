import * as Sentry from "@sentry/node";

export default ({ init }, { env }) => {
  const { SENTRY_DSN } = env;

  Sentry.init({
    dsn: SENTRY_DSN,
  });
  console.log(SENTRY_DSN);
  init('routes.before', ({ app }) => {
    app.use(Sentry.Handlers.requestHandler());
    console.log('-- Sentry Request Handler Added --');
  });

  init('routes.custom', ({ app }) => {
    app.get('/test-error', (req, res, next) => {
      try {
        console.log(undefinedVar);
      } catch (error) {
        Sentry.captureException(error);
      }
      res.status(500).json({ message: 'An error occurred and has been reported to Sentry.' });
    });
  });

  init('routes.custom.after', ({ app }) => {
    app.use(Sentry.Handlers.errorHandler());
    console.log('-- Sentry Error Handler Added --');
  });
};
