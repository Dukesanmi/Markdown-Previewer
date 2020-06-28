import React from 'react';
import './App.css';
import marked from 'marked';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      darkMode: this.getInitialMode()
    }

    this.handleChange = this.handleChange.bind(this);
    this.toggleDarkMode = this.toggleDarkMode.bind(this);
    this.getInitialMode = this.getInitialMode.bind(this);
    this.getPrefColorScheme = this.getPrefColorScheme.bind(this)
  }

  handleChange(event) {
    this.setState({
      input: event.target.value
    });
  }

  //toggles the darkMode state in the react app
  toggleDarkMode() {
    this.setState({
      darkMode: !this.state.darkMode
    });
  }
    
    //On toggle, this method stores boolean value of darkMode state in applications localStorage the user's chosen mode will remain when page is refreshed or another page on the app is visited as long as the it isn't changed in localstorage 
  componentDidUpdate() {
    localStorage.setItem('dark', JSON.stringify(this.state.darkMode));
  }

  //method gets the default mode to be displayed when user initially visits the app
  getInitialMode() {
    const isReturningUser = 'dark' in localStorage;
    const savedMode = JSON.parse(localStorage.getItem('dark'));
    const userPrefersDark = this.getPrefColorScheme;
    //if preferred color scheme was saved -> dark / light
    if (isReturningUser) {
      return savedMode;
    }
    //if preferred color scheme is dark -> dark
    else if (userPrefersDark) {
      return true;
    } 
    
    //else -> light
    else {
      return false;
    }

    //return savedMode; 
  }

  //method gets user's window preferred color scheme
  getPrefColorScheme() {
    if (!window.matchMedia) return;

    else {
      return window.matchMedia('(prefers-color-scheme: dark)');
    }
  }

  render() {
    return(
      <div>
        <div className="toggle-container">
          <span className="toggle" style={{color: this.state.darkMode ? 'slateblue' : '#cc9900'}} onClick={this.toggleDarkMode}>☀</span>
         </div>
        <div className={this.state.darkMode ? 'body-dark' : 'body-light'}>
          <header style={{color: this.state.darkMode ? 'grey' : 'black'}}><b>Markdown Live Preview</b></header>
          <div id="app">
            <div id="editor-wrapper">
              <header style={{ backgroundColor: this.state.darkMode ? '#111' : '#fff', color: this.state.darkMode ? 'grey' : 'red' }}><b>Editor</b></header>
              <textarea id={this.state.darkMode ? 'editor-dark' : 'editor-light'} value={this.state.input} onChange={this.handleChange}></textarea>
            </div>
            <div id="preview-wrapper">
              <header style={{ backgroundColor: this.state.darkMode ? '#111' : '#fff', color: this.state.darkMode ? 'grey' : 'green' }}><b>Preview</b></header>
              <div id={this.state.darkMode  ? 'preview-dark' : 'preview-light'} dangerouslySetInnerHTML={{__html: marked(this.state.input)}}></div>
            </div>
          </div>
        </div>
      </div>  
    );
  }
}

export default App;
