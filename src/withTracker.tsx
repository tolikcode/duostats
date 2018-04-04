import * as React from 'react';
import * as GoogleAnalytics from 'react-ga';
import { RouteComponentProps } from 'react-router-dom';

GoogleAnalytics.initialize('UA-116851931-1');

export const withTracker = (WrappedComponent: React.ComponentType, options = {}) => {
  const trackPage = (page: string) => {
    GoogleAnalytics.set({
      page,
      ...options
    });
    GoogleAnalytics.pageview(page);
  };

  const HOC = class extends React.Component<RouteComponentProps<{}>> {
    componentDidMount() {
      const page = this.props.location.pathname;
      trackPage(page);
    }

    componentWillReceiveProps(nextProps: RouteComponentProps<{}>) {
      const currentPage = this.props.location.pathname;
      const nextPage = nextProps.location.pathname;

      if (currentPage !== nextPage) {
        trackPage(nextPage);
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };

  return HOC;
};
