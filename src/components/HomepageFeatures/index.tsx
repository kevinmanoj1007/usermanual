import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  className: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'AI Assisted Circuit design',
    Svg: require('@site/static/img/ai-assist.svg').default,
    className: "",
    description: (
      <>
        The Genie platform is designed to leverage AI for circuit design.
      </>
    ),
  },
  {
    title: 'Optimize using AI',
    Svg: require('@site/static/img/ai-optimize.svg').default,
    className: styles.overrideFillStroke,
    description: (
      <>
        AI reduces the time to Optimize your circuit.
      </>
    ),
  },
  {
    title: 'Connect to multiple EDA tools',
    Svg: require('@site/static/img/design.svg').default,
    className: "",
    description: (
      <>
        Genie platform has connectors to open source and commercial EDA tools.
      </>
    ),
  },
];

function Feature({title, Svg, className, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg + " " + className} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
