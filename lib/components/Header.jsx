import React from 'react';
import { signIn, signOut } from '../firebase';

const Header = ({user, handleShowForm, showForm}) => {

		let addNewContactClass;
		let addNewContactClassHover;

		if (showForm) {
			addNewContactClass = "add-contact-img add-button-exit"
			addNewContactClassHover = "add-contact-img-hover add-button-exit"
		} else {
			addNewContactClass = "add-contact-img";
			addNewContactClassHover = "add-contact-img-hover";
		}

		return (
      <header>
        <h1>
          Netwerker
        </h1>
        <div className="active-user">
          {user ? <div>
            <span className="greeting" title={`Logged in as ${user.email}`}>
              Hi,&nbsp;
              <span className="bold">
                {user.displayName}
              </span>
            </span>

            <button
              className= "signed-in auth-button"
              onClick={() => signOut()}
            >Sign Out
            </button>
            </div>
          :
            <button
              className= "signed-out auth-button"
              onClick={() => signIn()}
            >
            Sign In
            </button>
          }
        </div>
        <button
          className="add-contact-button"
          onClick={handleShowForm}
        >
          <img
            src="../images/plus.svg"
            alt="Icon to show that user can add contact."
            className={addNewContactClass}
          />
          <img
            src="../images/plus-lighter.svg"
            alt="Lighter version add contact for hover."
            className={addNewContactClassHover}
          />
        </button>
      </header>
  );
};

export default Header;
