import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./privatePages.module.css";

const Profile = () => {

  const navigate = useNavigate();

  const onNavListItem7Click = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const onButtonPrimaryClick = useCallback(() => {
    navigate("/register");
  }, [navigate]);

  return (
    <div className={styles.today}>
      <div className={styles.navNavMenu}>
        <img className={styles.logoScIcon} alt="" src="/logo-sc@2x.png" />
        <div className={styles.navNavMenu1}>
          <div className={styles.logo}>
            <img className={styles.logoIcon} alt="" src="/logo1@2x.png" />
          </div>
          <div className={styles.navListItem}>
            <div className={styles.listItem}>Aujourd’hui</div>
          </div>
          <div className={styles.navListItem}>
            <div className={styles.listItem1}>Chat</div>
          </div>
          <div className={styles.navListItem}>
            <div className={styles.listItem2}>Forum</div>
          </div>
          <div className={styles.navListItem}>
            <div className={styles.listItem3} />
          </div>
          <div className={styles.navListItem}>
            <div className={styles.listItem3} />
          </div>
          <div className={styles.navListItem5}>
            <div className={styles.listItem5}>
              <p className={styles.propos}>@ Propos</p>
            </div>
          </div>
          <div className={styles.navListItem}>
            <div className={styles.listItem6}>Mon profil</div>
          </div>
          <img
            className={styles.avatarsLeftSideMenuellipse}
            alt=""
            src="/avatars-leftside-menuellipse-11.svg"
          />
          <div className={styles.navListItem7} onClick={onNavListItem7Click}>
            <div className={styles.listItem7}>Connexion</div>
          </div>
          <div className={styles.buttonPrimary} onClick={onButtonPrimaryClick}>
            <b className={styles.label}>Inscrivez-vous</b>
          </div>
          <div className={styles.buttonPrimary1}>
            <b className={styles.listItem3}>Se déconnecter</b>
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <div className={styles.copyright}>
          <b className={styles.santConnect}>Santé Connect © 2023</b>
        </div>
      </div>
      <div className={styles.avatarsLeftSideMenu}>
        <img
          className={styles.property1variant13Icon}
          alt=""
          src="/property-1ellipse-1.svg"
        />
        <img
          className={styles.property1variant13Icon}
          alt=""
          src="/property-1ellipse-2.svg"
        />
        <img
          className={styles.property1variant13Icon}
          alt=""
          src="/property-1ellipse-3.svg"
        />
        <img
          className={styles.property1variant13Icon}
          alt=""
          src="/property-1ellipse-4.svg"
        />
        <img
          className={styles.property1variant13Icon}
          alt=""
          src="/property-1ellipse-5.svg"
        />
        <img
          className={styles.property1variant13Icon}
          alt=""
          src="/property-1ellipse-6.svg"
        />
        <img
          className={styles.property1variant13Icon}
          alt=""
          src="/property-1ellipse-7.svg"
        />
        <img
          className={styles.property1variant13Icon}
          alt=""
          src="/property-1ellipse-8.svg"
        />
        <img
          className={styles.property1variant13Icon}
          alt=""
          src="/property-1ellipse-9.svg"
        />
        <img
          className={styles.property1variant13Icon}
          alt=""
          src="/property-1ellipse-10.svg"
        />
        <img
          className={styles.property1variant13Icon}
          alt=""
          src="/property-1ellipse-11.svg"
        />
        <img
          className={styles.property1variant13Icon}
          alt=""
          src="/property-1variant13.svg"
        />
      </div>
      <div className={styles.todayBoard} />
    </div>
  );
};

export default Profile;
