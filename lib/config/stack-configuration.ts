export const StackConfig = {
  name: process.env.ARTIFACT_NAME || 'pulso-polar',
  environment: process.env.ENVIRONMENT || 'dev',
  region: process.env.REGION || 'us-east-1',
  tracingEnabled: Boolean(process.env.API_TRACE_ENABLED),
};
