const clientId = '17';
const redirectUri = 'https://chiefapp-gus.herokuapp.com'; // http://localhost:3000  --  https://chiefapp-gus.herokuapp.com'


const Util = {
  login() {
    const accessUri = `https://app.storychief.io/oauth/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}`;
    window.location = accessUri;
  },
}

export default Util;
