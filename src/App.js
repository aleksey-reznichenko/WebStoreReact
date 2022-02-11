import React from 'react';
import { Router } from 'react-router-dom';
import createHistory from "history/createBrowserHistory";
import MainPage from "./pages/MainPage";
import { Switch } from "react-router-dom"
import {AboutUsPage} from "./pages/AboutUsPage/AboutUsPage";
import {OurTeamPage} from "./pages/OurTeamPage/OurTeamPage";
import { Provider } from "react-redux";
import {store} from "./reducers";
import Header from "./components/Header";
import {CPRoute, CRRoute} from "./components/CPRoute";
import AdminPage from "./pages/AdminPage/AdminPage";
import Page404 from "./pages/404Page";
import {FAQPage} from "./pages/FAQPage/FAQPage";
import {CCatalogPage} from "./pages/Catalog/CatalogPage";
import {ContactPage} from "./pages/Contact/ContactPage";
import PrivacyPolicy from "./pages/PrivacyPolicyPage/PrivacyPolicyPage";
import SearchPage from "./pages/SearchPage/SearchPage";
import {CCartPage} from "./pages/CartPage/CartPage";
import {MyOrdersPage} from "./pages/MyOrdersPage/MyOrdersPage";
import {ProductPage} from "./pages/ProductPage/ProductPage";
import {WishListPage} from "./pages/WishListPage/WishListPage";
import MyAccountPage from "./pages/MyAccountPage/MyAccountPage";
import {CProfilePage} from "./pages/ProfilePage/ProfilePage";
import {Footer} from "./components/Footer/Footer";

const history = createHistory();

export const App = () => {
  return (
      <Router history={history}>
          <Provider store={store}>
              <Header/>
              <Switch>
                  <CRRoute path="/" component={MainPage} exact/>
                  <CRRoute path="/catalog" component={CCatalogPage} />
                  <CRRoute path="/good" component={ProductPage} />
                  <CRRoute path="/about-us" component={AboutUsPage} />
                  <CRRoute path="/our-team" component={OurTeamPage} />
                  <CRRoute path="/faq" component={FAQPage} />
                  <CRRoute path="/contact" component={ContactPage} />
                  <CRRoute path="/my-account" component={MyAccountPage} />
                  <CRRoute path="/privacy-policy" component={PrivacyPolicy} />
                  <CRRoute path="/search" component={SearchPage} />
                  <CRRoute path="/basket" component={CCartPage} />
                  <CRRoute path="/wish-list" component={WishListPage} />
                  <CRRoute path="/my-orders" component={MyOrdersPage} />
                  <CPRoute roles={["user", "admin"]} path="/profile" fallback='/my-account' component={CProfilePage} />
                  <CPRoute roles={["admin"]} path="/admin" fallback='/my-account' component={AdminPage} />
                  <CRRoute path="*" component={Page404} />
              </Switch>
              <Footer/>
          </Provider>
      </Router>
  )
}
