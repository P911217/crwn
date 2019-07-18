import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import './app.style.scss';
import { Header } from '../components/header/header.component';
import { Homepage } from '../pages/homepage/homepage.component';
import { ShopPage } from '../pages/shop/shop.component';
import { ContactPage } from '../pages/contact/contact.component';
import { SignInPage } from '../pages/sign-in/sign-in.component';
import { SignUpPage } from '../pages/sign-up/sign-up.component';
import { Footer } from '../components/footer/footer.component';
import { auth, createUserProfileDocument } from '../utils/firebase.utils';
import { setCurrentUser } from '../redux/user/user-actions';


class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(
      async authicatedUser => {
        if (authicatedUser) {
          const userReference = await createUserProfileDocument(authicatedUser);
          userReference.onSnapshot(snapshot => {
            setCurrentUser({
              id: snapshot.id,
              ...snapshot.data()
            });
          });
        };

        setCurrentUser(null);
      }
    );
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div className="app">
        <Header />
        <Switch>
          <Route exact path='/' component={Homepage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/login' component={SignInPage} />
          <Route path='/register' component={SignUpPage} />
          <Route path='/contact' component={ContactPage} />
        </Switch>
        <Footer />
      </div>
    );
  }
};

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(null, mapDispatchToProps)(App);
