import { useQuery } from '@apollo/client';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './tailwind.dist.css';
import './App.css';

import { TRACTS } from './gql.js';
import { getTractByRouteName } from './selectors.js';
import Feed from './components/Feed.js';
import Header from './components/Header.js';
import Hero from './components/Hero.js';
import Layout from './components/Layout.js';
import Reader from './components/Reader.js';
import ScrollToTop from './components/ScrollToTop.js';

function App() {
  const { loading, data, error } = useQuery(TRACTS);

  const hero = loading
    ? { title: null }
    : data?.categories?.find(({ type }) => type === 'featured').tracts[0];

  return (
    <Router>
      <ScrollToTop />
      <div>
        <Switch>
          <Route exact path="/">
            <Layout error={error} loading={loading}>
              <Hero {...hero} loading={loading}>
                {hero.title}
              </Hero>
              {!loading && <Feed data={data} />}
            </Layout>
          </Route>

          <Route
            exact
            path="/tracts/:name"
            render={(routerProps) => {
              const tract = loading
                ? { content: null, reviews: [], title: null }
                : getTractByRouteName(data, routerProps.match.params.name);
              return (
                <Layout {...routerProps} loading={loading}>
                  <Header {...tract} loading={loading}>
                    {tract.title}
                  </Header>
                  <Reader content={tract.content} reviews={tract.reviews} />
                </Layout>
              );
            }}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
