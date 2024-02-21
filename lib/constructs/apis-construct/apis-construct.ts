import { CfnOutput } from 'aws-cdk-lib';
import { EndpointType, MethodLoggingLevel, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { Construct } from 'constructs';

import { StackConfig } from '../../config/stack-configuration';

export default class ApisConstruct extends Construct {
  public readonly apiGateway: RestApi;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    this.apiGateway = new RestApi(this, `${StackConfig.name}-api-gateway-${StackConfig.environment}`, {
      cloudWatchRole: true,
      deployOptions: {
        tracingEnabled: true,
        loggingLevel: MethodLoggingLevel.INFO,
        dataTraceEnabled: StackConfig.tracingEnabled,
        stageName: StackConfig.environment,
        metricsEnabled: true,
      },
      endpointConfiguration: {
        types: [EndpointType.REGIONAL],
      },
      restApiName: `${StackConfig.name}-api-gateway-${StackConfig.environment}`,
    });

    new CfnOutput(this, 'PulsoPolarRestApiOutputUrl', {
      value: this.apiGateway.url,
    });
  }
}
