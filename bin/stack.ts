#!/usr/bin/env node
import 'source-map-support/register';
import { App, Stack, StackProps } from 'aws-cdk-lib';
import { CloudFrontStack } from '../lib/cloudfront';

class MainStack extends Stack {
  constructor(parent: App, name: string, props: StackProps) {
    super(parent, name, props);
    new CloudFrontStack(this, 'MemoRecallCloudFront');
  }
}

const app = new App();

new MainStack(app, 'MemoRecallStack', {
  env: {
    region: process.env.CDK_DEFAULT_REGION,
    account: process.env.CDK_DEFAULT_ACCOUNT,
  },
});

app.synth();
