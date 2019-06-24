/* eslint-disable no-useless-escape */
/* eslint-disable no-param-reassign */

function logSystem() {
  const testMail = document.querySelector('#emailSU');
  const testPass = document.querySelector('#passwordSU');
  const testRepeatPass = document.querySelector('#repeatPassword');
  const signUpForm = document.querySelector('#signUpForm');
  const signInForm = document.querySelector('#signInForm');
  const wrongEmail = document.querySelector('#wrongEmail');
  const wrongPassword = document.querySelector('#wrongPassword');
  const wrongRepeatPassword = document.querySelector('#wrongRepeatPassword');
  const loggedIn = document.querySelector('#loggedIn');
  const signedUp = document.querySelector('#signedUp');
  const regEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const regUppercaseLetter = /[A-Z]/;
  const regLowercaseLetter = /[a-z]/;
  const regNumber = /[0-9]/;
  const regSpecialCharacter = /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/;
  const regWhiteSpaces = /[/\s/]/;
  const minimumLength = 6;
  const progressSign = document.querySelector('#progressSign');
  const progressLog = document.querySelector('#progressLog');
  const signBtn = document.querySelector('#sign');
  const hideSignUp = document.querySelector('#hideSignUp');
  const hideSignIn = document.querySelector('#hideSignIn');

  const checkEmail = (value, msgField) => {
    if (!regEmail.test(value)) {
      msgField.innerHTML = 'Please type legal e-mail!';
      return false;
    }
    return true;
  };

  const checkEmpty = (value, msgField) => {
    if (value.length === 0) {
      msgField.innerHTML = 'Can not be empty!';
      return false;
    }
    return true;
  };

  const checkMinLength = (value, msgField) => {
    if (value.length < minimumLength) {
      msgField.innerHTML = 'You need at least 6 characters';
      return false;
    }
    return true;
  };

  const checkWhiteSpaces = (value, msgField) => {
    if (regWhiteSpaces.test(value)) {
      msgField.innerHTML = 'You can not type whitspace in password!';
      return false;
    }
    return true;
  };

  const checkLowerCaseLetter = (value, msgField) => {
    if (!regLowercaseLetter.test(value)) {
      msgField.innerHTML = 'You need at least one lower letter!';
      return false;
    }
    return true;
  };

  const checkUpperCaseLetter = (value, msgField) => {
    if (!regUppercaseLetter.test(value)) {
      msgField.innerHTML = 'You need at least one upper letter!';
      return false;
    }
    return true;
  };

  const checkNumber = (value, msgField) => {
    if (!regNumber.test(value)) {
      msgField.innerHTML = 'You need at least one number!';
      return false;
    }
    return true;
  };

  const checkSymbol = (value, msgField) => {
    if (!regSpecialCharacter.test(value)) {
      msgField.innerHTML = 'You need at least one symbol!';
      return false;
    }
    return true;
  };

  const checkRepeat = (value, msgField) => {
    if (testPass.value !== value) {
      msgField.innerHTML = 'Please repeat exact password';
      return false;
    }
    return true;
  };

  const testEmail = e => {
    if (checkEmpty(e.value, wrongEmail) && checkEmail(e.value, wrongEmail)) {
      wrongEmail.innerHTML = '';
      testMail.style.borderBottomColor = '#2bbbad';
      return true;
    }
    testMail.style.borderBottomColor = 'red';
    return false;
  };

  const testPassword = e => {
    if (
      checkEmpty(e.value, wrongPassword) &&
      checkWhiteSpaces(e.value, wrongPassword) &&
      checkMinLength(e.value, wrongPassword) &&
      checkLowerCaseLetter(e.value, wrongPassword) &&
      checkUpperCaseLetter(e.value, wrongPassword) &&
      checkNumber(e.value, wrongPassword) &&
      checkSymbol(e.value, wrongPassword)
    ) {
      wrongPassword.innerHTML = '';
      testPass.style.borderBottomColor = '#2bbbad';
      return true;
    }
    testPass.style.borderBottomColor = 'red';
    return false;
  };

  const testRepeatPassword = e => {
    if (checkEmpty(e.value, wrongRepeatPassword) && checkRepeat(e.value, wrongRepeatPassword)) {
      wrongRepeatPassword.innerHTML = '';
      testRepeatPass.style.borderBottomColor = '#2bbbad';
      return true;
    }
    testRepeatPass.style.borderBottomColor = 'red';
    return false;
  };

  testMail.addEventListener('keyup', () => {
    setTimeout(() => {
      testEmail(testMail);
    }, 500);
  });

  testPass.addEventListener('keyup', () => {
    setTimeout(() => {
      testPassword(testPass);
    }, 500);
  });

  testRepeatPass.addEventListener('focusout', () => {
    setTimeout(() => {
      testRepeatPassword(testRepeatPass);
    }, 500);
  });

  const logInScenario = () => {
    if (localStorage.getItem('token') === 'null' || localStorage.getItem('token') === 'undefined') {
      progressLog.style.display = 'none';
      loggedIn.style.color = '#f44336';
      loggedIn.innerHTML = "Something's wrong! Please try again.";
      return;
    }
    loggedIn.style.color = '#00695c';
    loggedIn.innerHTML = 'You are logged in with:';
    hideSignIn.style.display = 'none';
    signBtn.style.display = 'none';
    progressLog.style.display = 'block';

    setTimeout(() => {
      progressLog.style.display = 'none';
      signBtn.style.display = 'block';
    }, 2000);
    signBtn.classList.replace('white-text', 'myGreen');
  };

  signUpForm.addEventListener('submit', e => {
    e.preventDefault();
    if (testEmail(testMail) && testPassword(testPass) && testRepeatPassword(testRepeatPass)) {
      const email = testMail.value;
      const pass = testPass.value;
      const repeatPass = testRepeatPass.value;
      progressSign.style.display = 'block';
      fetch('https://spomenici-api.herokuapp.com/korisnici/registracija', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, pass, repeatPass })
      })
        .then(response => response.json())
        .then(response => {
          setTimeout(() => {
            progressSign.style.display = 'none';
          }, 1000);
          setTimeout(() => {
            signedUp.style.color = '#00695c';
            signedUp.innerHTML = `${response.status}</br> Registered with an email.</br> Please log in now!`;
          }, 2000);
          setTimeout(() => {
            hideSignUp.style.display = 'none';
            hideSignIn.style.display = 'block';
          }, 5000);
        })
        .catch(error => {
          progressSign.style.display = 'none';
          signedUp.style.color = '#f44336';
          signedUp.innerHTML = `${error}</br> Please try again!`;
        });
    }
  });

  signInForm.addEventListener('submit', e => {
    e.preventDefault();
    const testMail1 = document.querySelector('#emailSI');
    const testPass1 = document.querySelector('#passwordSI');
    const email = testMail1.value;
    const pass = testPass1.value;
    fetch('https://spomenici-api.herokuapp.com/korisnici/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, pass })
    })
      .then(response => response.json())
      .then(response => {
        localStorage.setItem('token', response.data);
        logInScenario();
      });
  });

  if (localStorage.token && localStorage.getItem('token') !== 'null') {
    signBtn.classList.replace('white-text', 'myGreen');
  }
}

export default logSystem;
