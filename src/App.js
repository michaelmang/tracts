import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { useQuery, gql } from "@apollo/client";
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

const getTract = (data, id) => {
  const matchingCategory = data.categories.find(({ tracts }) => tracts.find(matchingTract({ by: id })))
  return matchingCategory.tracts.find(matchingTract);
};

const matchingTract = ({ by: id }) => (tract) => tract.id === id;

function App() {
  const { loading, data, error } = useQuery(TRACTS);

  const hero = loading
    ? { title: null }
    : data.categories.find(({ type }) => type === "featured").tracts[0];

  return (
    <Router>
      <ScrollToTop />
      <div>
        <Switch>
          <Route exact path="/">
            <Layout loading={loading}>
              {error && (
                <div className="flex flex-col items-between w-full p-4 md:pl-12 bg-red-700 text-white">
                  {error.graphQLErrors &&
                    error.graphQLErrors.map(({ message }, i) => (
                      <div className="flex justify-between">
                        <span key={i}>
                          <FontAwesomeIcon
                            className="mr-2"
                            icon={faExclamationCircle}
                          />
                          Error: {message}
                        </span>
                        <span>Please try again</span>
                      </div>
                    ))}
                </div>
              )}
              {loading && (
                <div className="relative">
                  <div className="overflow-hidden h-2 text-xs flex bg-black">
                    <div
                      style={{ "--duration": 10 }}
                      className="progress-meter rounded shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-red-500"
                    ></div>
                  </div>
                </div>
              )}
              <Hero {...hero} loading={loading}>
                {hero.title}
              </Hero>
              {!loading &&
                data.categories.map(({ id, type, tracts }) => (
                  <Section key={id} title={type}>
                    {tracts.map(({ title, ...rest }) => (
                      <Card key={rest.id} {...rest}>
                        {title}
                      </Card>
                    ))}
                  </Section>
                ))}
            </Layout>
          </Route>

          <Route
            exact
            path="/tracts/:name"
            render={(routerProps) => {
              const tract = getTract(data, routerProps.match.params.name);
              return (
                  <Layout {...routerProps} loading={loading}>
                  <Header {...tract}>{tract.title}</Header>
                  <div className="flex flex-col w-full items-center min-h-screen">
                    <div
                      className="text-white p-10 md:p-12 max-w-4xl text-justify text-sm md:text-md"
                      dangerouslySetInnerHTML={{ __html: tract.content }}
                    />
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
