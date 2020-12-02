import { useQuery, gql } from '@apollo/client';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./index.css";
import "./App.css";

import Card from "./components/Card.js";
import Section from "./components/Section.js";

import Header from "./components/Header.js";
import Hero from "./components/Hero.js";
import Layout from "./components/Layout.js";
import ScrollToTop from "./components/ScrollToTop.js";

const TRACTS = gql`
  query {
    categories {
      tracts {
        author
        content
        id
        image
        title
        description
        tags {
          id
          type
        }
      }
      id
      type
    }
  }
`;

function App() {
  const { loading, data } = useQuery(TRACTS);

  const getTract = (id) => data.categories.find(({ tracts }) => tracts.find(tract => tract.id === id)).tracts[0];
  const hero = loading ? { title: null } : data.categories.find(({ type }) => type === 'featured').tracts[0];

  return (
    <Router>
      <ScrollToTop />
      <div>
        <Switch>
          <Route exact path="/">
            <Layout>
              <Hero {...hero} loading={loading}>{hero.title}</Hero>
              {!loading && data.categories.map(({ id, type, tracts }) => (
                <Section key={id} title={type}>
                  {tracts.map(({ title, ...rest }) => (
                    <Card key={rest.id} {...rest}>{title}</Card>
                  ))}
                </Section>
              ))}
            </Layout>
          </Route>

          <Route
            exact
            path="/tracts/:name"
            render={(routerProps) => {
              const tract = getTract(routerProps.match.params.name);
              console.log({ tract });
              return (
                <Layout {...routerProps}>
                  <Header {...tract}>
                    {tract.title}
                  </Header>
                  <div className="flex flex-col w-full items-center min-h-screen">
                    <div className="text-white p-12 max-w-4xl text-justify" dangerouslySetInnerHTML={{ __html: tract.content }} />
                  </div>
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
