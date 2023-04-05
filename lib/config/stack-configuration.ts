export const StackConfig = {
  name: process.env.ARTIFACT_NAME || 'cdk-app-template',
  environment: process.env.ENVIRONMENT || 'development',
  region: process.env.REGION || 'us-east-1',
  tracingEnabled: Boolean(process.env.API_TRACE_ENABLED),
};
