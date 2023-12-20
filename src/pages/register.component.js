import React, {Component} from "react";
import styles from "./register.module.css";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import AuthService from "../services/auth.service";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Veuillez remplir ce champ !
      </div>
    );
  }
};

const email = value => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        Cette adresse email n'est pas valide !
      </div>
    );
  }
};

const vage = value => {
  if (!isNaN(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        L'âge doit être un nombre !
      </div>
    )
  }
  if ( 130 < value || value < 15 ) {
    return (
      <div className="alert alert-danger" role="alert">
        Vous devez avoir au moins 15 ans pour vous inscrire !
      </div>
    );
  };
};

const vusername = value => {
  if (value.length < 6 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        Le nom d'utilisateur doit avoir entre 6 et 20 caractères.
      </div>
    );
  }
};

const vpassword = value => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        Le mot de passe doit avoir entre 6 et 20 caracactères.
      </div>
    );
  }
};

const cpassword = (value, components) => {
  if (value !== components["password"][0].value) {
    return (
      <div className="alert alert-danger" role="alert">
        Les mots de passe doivent être les mêmes !
      </div>
    );
  }
};

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeCPassword = this.onChangeCPassword.bind(this);
    this.onChangeAge = this.onChangeAge.bind(this);
    this.onChangeCountry = this.onChangeCountry.bind(this);
    this.onChangeRoles = this.onChangeRoles.bind(this);

    this.state = {
      username: "",
      email: "",
      password: "",
      cpassword: "",
      age: 15,
      country: "",
      roles: [],
      successful: false,
      message: "",
      errors: {}
    };
  }

  onChangeUsername(event) {
    this.setState({
      username: event.target.value
    });
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

  onChangeCPassword(event) {
    this.setState({
      cpassword: event.target.value
    });
  }

  onChangeAge(event) {
    this.setState({
      age: event.target.value,
    });
  }

  onChangeCountry(event) {
    this.setState({
      country: event.target.value
    });
  }

  onChangeRoles(event) {
    this.setState({
      roles: event.target.roles
    });
  }

  handleRegister = (event) => {
    event.preventDefault();
    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();

    const formData = JSON.stringify({
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      age: this.state.age,
      country: this.state.country,
      roles: this.state.roles
    });

    if (this.checkBtn.context._errors.length === 0) {
      console.log(formData);
      AuthService.register(
        this.state.username,
        this.state.email,
        this.state.password,
        this.state.age,
        this.state.country,
        this.state.roles
      ).then(
        response => {
          this.setState({
            message: response.data.message,
            successful: true
          });
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            message: resMessage
          });
        }
      );
    }
  }

render() {
  return (
    <Form
      onSubmit={this.handleRegister}
      ref={c => {
        this.form = c;
      }}
    >
    {!this.state.successful && (
      <div className={styles.register}>
        <div className={styles.leftSideRectangle}></div>
        <div className={styles.santConnect}>Santé Connect © 2023</div>
        <img className={styles.vectorIcon} alt=" îcone vecteur " />
        <div className={styles.registerForm}>
          <a className={styles.vousAvezDjContainer} 
              href="/login"
            >
            <span>{`Vous avez déjà un compte ? `}</span>
            <span className={styles.connectezVous}>Connectez-vous !</span>
          </a>
          <button className={styles.submit}
                  type="submit" 
                  onClick={this.handleRegister}>
            <img
              className={styles.submitRectangleIcon}
              alt="bouton d'inscription"
              src="/rectangle-10481.svg"
            />
            <div className={styles.insideSubmitRectangle}>
              <div className={styles.inscrivezVous}>Inscrivez-vous</div>
              <img
                className={styles.antDesignswapLeftOutlinedIcon}
                alt="bouton d'inscription"
                src="/antdesignswapleftoutlined1.svg"
              />
            </div>
          </button>
          <div className={styles.country}>
            <div className={styles.pays}>
              <p className={styles.pays1}>Pays</p>
            </div>
            <input
              className={styles.countryRectangle} 
              name="country"
              type="text" 
              value={this.state.country}
              onChange={this.onChangeCountry}
              tabIndex={1}
            />
          </div>
          <div className={styles.age}>
            <div className={styles.ge}>Âge*</div>
              <input
                className={styles.ageRectangle}
                name="age"
                min={15}
                max={130}
                value={this.state.age}
                onChange={this.onChangeAge}
                type="number"
                validations={[required, vage]}
                tabIndex={1}
              />
          </div>
          <div className={styles.confirmpassword}>
            <div className={styles.ge}>Confirmez votre mot de passe*</div>
            <input
              className={styles.ageRectangle}
              name="cpassword"
              type="password"
              maxLength={20}
              minLength={6}
              value={this.state.cpassword}
              onChange={this.onChangeCPassword}
              validations={[required, vpassword, cpassword]}
              tabIndex={1}
            />
          </div>
          <div className={styles.password}>
            <div className={styles.ge}>Mot de passe*</div>
            <input
              className={styles.ageRectangle}
              name="username"
              placeholder="Entrez un mot de passe entre 6 et 20 caractères"
              type="password"
              maxLength={20}
              minLength={6}
              value={this.state.password}
              onChange={this.onChangePassword}
              validations={[required, vpassword]}
              tabIndex={1}
            />
          </div>
          <div className={styles.email}>
            <div className={styles.ge}>Email*</div>
            <input
              className={styles.ageRectangle}
              name="email"
              type="text"
              value={this.state.email}
              onChange={this.onChangeEmail}
              maxLength={40}
              minLength={5}
              validations={[required, email]}
              tabIndex={1}
            />
          </div>
          <div className={styles.username}>
            <div className={styles.identifiant}>Identifiant*</div>
            <input 
              className={styles.usernameRectangle}
              name="username"
              type="text"
              value={this.state.username}
              onChange={this.onChangeUsername}
              validations={[required, vusername]} 
              tabIndex={1}
              />
          </div>
        </div>
        <div className={styles.inscription}>Inscription</div>
        <div className={styles.inscrivezVousEtDcouvrez}>
          Inscrivez-vous et découvrez ce qui vous attends chez
        </div>
        <div className={styles.santeConnectBrand}>{`Santé Connect`}</div>
          <img
            className={styles.backgroundConnexionIcon}
            alt=" Arrière plan : femmes médecins debout face caméra "
            src="/background-connexion@2x.png"
          />
          <div className={styles.logo}>
            <img className={styles.logoIcon} alt=" Logo de Santé Connect " src="/logo@2x.png" />
          </div>
        </div>
      )};

      {this.state.message && (
              <div className="form-group">
                <div
                  className={
                    this.state.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
                  {this.state.message}
                </div>
              </div>
            )};

            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
      </Form>
    )
  }
}
