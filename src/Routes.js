import React /*, { useContext } */ from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation
  // __RouterContext
} from 'react-router-dom';
import { animated, useTransition } from 'react-spring';

// __RouterContext is unsafe to use. Use useLocation instead.
// function useRouter() {
//   return useContext(__RouterContext);
// }

const Routes = () => {
  return (
    <Router>
      <ul className="router-nav">
        <NavLink to="/">One</NavLink>
        <NavLink to="/two">Two</NavLink>
        <NavLink to="/three">Three</NavLink>
      </ul>
      <Main />
    </Router>
  );
};

const Main = () => {
  // const { location } = useRouter();
  const location = useLocation();
  console.log('location:', location);
  const transitions = useTransition(location, location => location.key, {
    from: {
      opacity: 0,
      position: 'absolute',
      width: '100%',
      transform: 'translate3d(100%, 0.01%, 0)'
    },
    enter: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
    leave: { opacity: 0, transform: 'translate3d(0.01%, 100%, 0)' }
    // to animate the transition in two direction, e.g. enter along x-axis and leave along y-axis,
    // set a greater-than-zero value for every axis
  });

  return transitions.map(({ item, props: transition, key }) => (
    <animated.div key={key} style={transition}>
      {/* Pass `location` to `Switch` so it can match the old location as it
      animates out. */}
      <Switch location={item}>
        <Route exact path="/" component={One} />
        <Route exact path="/two" component={Two} />
        <Route exact path="/three" component={Three} />
      </Switch>
    </animated.div>
  ));
};

function NavLink(props) {
  return (
    <li>
      <Link {...props} />
    </li>
  );
}

const One = () => {
  return (
    <div className="page-route">
      <h1>One</h1>
    </div>
  );
};
const Two = () => {
  return (
    <div className="page-route two">
      <h1>Two</h1>
    </div>
  );
};
const Three = () => {
  return (
    <div className="page-route three">
      <h1>Three</h1>
    </div>
  );
};

export default Routes;
