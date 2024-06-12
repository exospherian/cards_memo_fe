import { Duration, Stack } from 'aws-cdk-lib';
import { Certificate, ICertificate } from 'aws-cdk-lib/aws-certificatemanager';
import { AllowedMethods, Distribution, OriginAccessIdentity, ViewerProtocolPolicy } from 'aws-cdk-lib/aws-cloudfront';
import { S3Origin } from 'aws-cdk-lib/aws-cloudfront-origins';
import { CanonicalUserPrincipal, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { ARecord, HostedZone, IHostedZone, RecordTarget } from 'aws-cdk-lib/aws-route53';
import { CloudFrontTarget } from 'aws-cdk-lib/aws-route53-targets';
import { BlockPublicAccess, Bucket } from 'aws-cdk-lib/aws-s3';
import { BucketDeployment, Source } from 'aws-cdk-lib/aws-s3-deployment';
import { Construct } from 'constructs';


export class CloudFrontStack extends Construct {
  private _domainName = 'memo-recall.com';
  private _siteDomain = 'www.' + this._domainName;
  constructor(parent: Stack, name: string) {
    super(parent, name);
    const cloudfrontOAI = new OriginAccessIdentity(this, "MemoRecall_OAI");
    const certificate = this._certificate;
    const bucket = this._initBacket(cloudfrontOAI);
    const distribution = this._initDistribution(certificate, bucket, cloudfrontOAI)

    this._initRoute53Records(this._zone, distribution)
    this._initDeploy(bucket, distribution)
  }


  private get _zone(): IHostedZone {
    return HostedZone.fromLookup(this, 'MemoRecall_Zone', { domainName: this._domainName });
  }

  private get _certificate(): ICertificate {
    return Certificate.fromCertificateArn(this, 'MemoRecall_Certificate', 'arn:aws:acm:us-east-1:652893599615:certificate/621b9a69-7c94-44cf-b1eb-155f5d633317')
  }

  private _initBacket(cloudfrontOAI: OriginAccessIdentity): Bucket {
    const bucket = new Bucket(this, 'MemoRecall_Bucket', {
      bucketName: this._domainName,
      websiteIndexDocument: "index.html",
      websiteErrorDocument: "index.html",
      publicReadAccess: true,
      // blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
    })
    bucket.addToResourcePolicy(
      new PolicyStatement({
        actions: ["S3:GetObject"],
        resources: [bucket.arnForObjects("*")],
        principals: [
          new CanonicalUserPrincipal(
            cloudfrontOAI.cloudFrontOriginAccessIdentityS3CanonicalUserId
          ),
        ],
      })
    );
    return bucket
  }

  private _initDistribution(certificate: ICertificate, bucket: Bucket, cloudfrontOAI: OriginAccessIdentity): Distribution {
    const distribution = new Distribution(this, 'MemoRecall_Distribution', {
      certificate,
      defaultRootObject: 'index.html',
      domainNames: [this._domainName],
      errorResponses: [
        {
          httpStatus: 404,
          responseHttpStatus: 200,
          responsePagePath: '/index.html',
          ttl: Duration.minutes(30),
        }
      ],
      defaultBehavior: {
        origin: new S3Origin(bucket, {
          originAccessIdentity: cloudfrontOAI
        }),
        compress: true,
        allowedMethods: AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
        viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS
      }
    })
    return distribution
  }

  private _initRoute53Records(zone: IHostedZone, distribution: Distribution) {
    // new ARecord(this, 'WWWSiteAliasRecord', {
    //   zone,
    //   recordName: this._siteDomain,
    //   target: RecordTarget.fromAlias(new CloudFrontTarget(distribution))
    // })
    new ARecord(this, 'SiteAliasRecord', {
      zone,
      recordName: this._domainName,
      target: RecordTarget.fromAlias(new CloudFrontTarget(distribution))
    })
  }

  private _initDeploy(bucket: Bucket, distribution: Distribution) {
    new BucketDeployment(this, 'DeployWebsite', {
      sources: [Source.asset('./dist')],
      destinationBucket: bucket,
      distribution,
      distributionPaths: ["/*"]
    });
  }
}
