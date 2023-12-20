import React, {Component} from "react";
import styles from "./login.module.css";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";

import AuthService from "../services/auth.service";

import { withRouter } from '../common/with-router';

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Veuillez remplir ce champ !
      </div>
    );
  }
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      email:"",
      password: "",
      loading: false,
      message: ""
    }
  }
  onChangeEmail(event) {
    this.setState({
      email: event.target.value
    });
  }

  onChangePassword(event) {
    this.setState({
      password: event.target.value
    });
  }

  handleLogin(event) {
    event.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0 ) {
      AuthService.login(this.state.email, this.state.password).then (
        () => {
          this.props.router.navigate("/profile");
          window.location.reload();
        },
        error => { 
          const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        this.setState({
          loading: false,
          message: resMessage
        });
      }
    );
    } else {
      this.setState({
        loading: false
      });
    }
  }

  render () {
    return (
      <Form 
        onSubmit={this.handleLogin}
        ref={c => {
          this.form = c;
        }}>
        <div>
          <div className={styles.login}>
            <div className={styles.leftSideRectangle} />
            <img className={styles.vectorIcon} alt="" src="/vector.svg" />
            <div className={styles.loginForm}>
              <a href="/register"
                 className={styles.pasDeCompteContainer}
              >
                <span>Pas de compte ?</span>
                <span className={styles.span}>{` `}</span>
                <span className={styles.inscrivezVous}>Inscrivez-vous !</span>
              </a>
              <div className={styles.submit}>
                <button 
                  className={styles.submit1}
                  disabled={this.state.loading}
                  type="submit"
                  value="login"
                  onClick={this.handleLogin}
                  >
                  <img
                    className={styles.submitRectangleIcon}
                    alt=""
                    src="/submit-rectangle.svg"
                  />
                  <div className={styles.insideSubmitRectangle}>
                    <div className={styles.connectezVous}>Connectez-vous</div>
                    <img
                      className={styles.antDesignswapLeftOutlinedIcon}
                      alt=""
                      src="/antdesignswapleftoutlined1.svg"
                      />
                  </div>
                </button>
                {this.state.message && (
                  <div className="form-group">
                    <div className="alert alert-danger" role="alert">
                      {this.state.message}
                    </div>
                  </div>
                )}
                <CheckButton
                  style={{ display: "none" }}
                  ref={c => {
                    this.checkBtn = c;
                  }}
                />
              </div>
              <div className={styles.password}>
                <div className={styles.password1}>
                  <input
                    className={styles.passwordRectangle}
                    name="password"
                    type="password"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    required={[required]}
                  />
                  <div className={styles.motDePasse}>Mot de passe</div>
                  <a
                    className={styles.motDePasse1}
                    href="http://localhost:3000/forgotten-pwd"
                    target="_blank"
                  >
                    Mot de passe oublié ?
                  </a>
                </div>
              </div>
              <div className={styles.email}>
                <div className={styles.email1}>
                  <div className={styles.email2}>
                    <p className={styles.email3}>Email</p>
                  </div>
                  <input 
                    className={styles.emailRectangle}
                    name="email"
                    type="email" 
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    validations={[required]} />
                </div>
              </div>
            </div>
            <div className={styles.connexion}>Connexion</div>
            <div className={styles.santConnect}>{`Santé Connect  `}</div>
            <div className={styles.raviDeVous}>Ravi de vous revoir !</div>
            <div className={styles.logo}>
              <img className={styles.logoIcon} alt="Logo de Santé Connect" src="/logo@2x.png" />
            </div>
            <img
              className={styles.backgroundConnexionIcon}
              alt="Arrière plan : femmes médecins se tenant debout face caméra"
              src="/background-connexion2@2x.png"
            />
            <div className={styles.santConnect1}>Santé Connect © 2023</div>
          </div>
        </div>
      </Form>
    )
  }
}

export default withRouter(Login);
