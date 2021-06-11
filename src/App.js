import React, { Suspense, Component, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ErrorBoundary from './error-boundary'
import Loading from './component/loader'


const Mainrouting = React.lazy(() => import('./includes/route'));

export default function App() {
  return (
    <ErrorBoundary>
      <div className="App">
        <Suspense fallback={<Loading />}>
          <Mainrouting />
        </Suspense>
      </div>
    </ErrorBoundary>
  );
}

