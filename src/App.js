import React, { Component } from 'react';
import './css/main.css';
import './App.css';
import respSales from './img/sales-responsive.png';
import saleHand from './img/sales-hand.png';
import saleGraph from './img/sales-graph.png'

class App extends Component {
  render() {
    return (
      <div className="body">
        <header className="header">
        <div className="l-container">

        <a
            className="header-logo a"
            href="#"
            target="_blank"
            rel="noopener noreferrer"
          >
            601DigitalWeb
          </a>

          <nav className="menu">
            <a
              className="menu-item is-active a"
              href="#"
              target="_blank"
              rel="noopener noreferrer"
            >
              About
            </a>
            <a
              className="menu-item a"
              href="#"
              target="_blank"
              rel="noopener noreferrer"
            >
              Team
            </a>
            <a
              className="menu-item a"
              href="#"
              target="_blank"
              rel="noopener noreferrer"
            >
              Service
            </a>
            <a
              className="menu-item a"
              href="#"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contact
            </a>
          </nav>

          <div className="cb"></div>
          <div className="header-baseline">
            <div className="header-baseline-l">Software developper</div>
            <div className="header-baseline-l header-baseline-l2">Front-end</div>
            <div className="header-baseline-1 header-baseline-l3">React JS / Material UI / Mongo DB</div>
          </div>
        </div>
        </header>
        <section className="sales-points">
          <div className="container grid">
            <h1 className="col col--full">Promote your app</h1>

            <div className="sales-point col col--1-3">
              <img src={respSales} alt="" />
              <h2>Responsive Design</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus hendrerit posuere finibus. Phasellus nibh lorem, cursus eu justo in, bibendum rutrum diam. </p>
            </div>
            <div className="sales-point col col--1-3">
              <img src={saleHand} alt="" />
              <h2>Easy to Set up</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus hendrerit posuere finibus. Phasellus nibh lorem, cursus eu justo in, bibendum rutrum diam. </p>
            </div>
            <div className="sales-point col col--1-3">
              <img src={saleGraph} alt="" />
              <h2>Great results</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus hendrerit posuere finibus. Phasellus nibh lorem, cursus eu justo in, bibendum rutrum diam. </p>
            </div>

          </div>
        </section>

        <section className="promo">
          <div className="title-box">
            <h1>This app is amazing</h1>
            <p>It does everything you didn’t know an app needed to do.</p>
          </div>
          <div className="grid">
            <div className="col col--1-2 bg-primary">
              <h1>Doing great things for you</h1>
              <h2>Phasellus henrerit psoeuere</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus hendrerit posuere finibus. Phasellus nibh lorem, cursus eu justo in, bibendum rutrum diam.
              Lorem ipsum dolor sit amet, consectetur. Phasellus hendrerit posuere finibus. Phasellus nibh lorem, cursus eu justo in, bibendum rutrum diam. </p>
              <a href="" className="btn btn--primary">Get the App</a>
            </div>

            <div className="col col--1-2 img-box lg-screen">

            </div>
            </div>
          </section>

          <section className="cta">
          <div className="container container--cta">
            <p className="text-large">You made it to the bottom and you still aren’t sure?</p>
            <h1 className="title-large">SHOWCASE THE GREATNESS today</h1>
            <a href="" className="btn btn--primary">Get the app</a>
          </div>
          </section>


          <footer>
          <div className="container container--footer">
            <p className="title-footer">Take your app to the next level</p>
            <ul className="unstyled-list social-links">
              <li><a href=""><i className="fa fa-twitter-square" aria-hidden="true"></i></a></li>
              <li><a href=""><i className="fa fa-instagram" aria-hidden="true"></i></a></li>
              <li><a href=""><i className="fa fa-facebook-square" aria-hidden="true"></i></a></li>
              <li><a href=""><i className="fa fa-youtube-square" aria-hidden="true"></i></a></li>
            </ul>

            <ul className="unstyled-list nav-footer">
              <li><a href="">Home</a></li>
              <li><a href="">About</a></li>
              <li><a href="">Blog</a></li>
              <li><a href="">Pricing</a></li>
              <li><a href="">Contact</a></li>
            </ul>
            </div>
          </footer>
        </div>
    );
  }
}

export default App;
