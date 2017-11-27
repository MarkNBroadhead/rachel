import React, { Component } from 'react';
import { connect } from 'react-redux';

import { applicationSetSuccess, applicationSetError, setUser } from './actions';
import UserEdit from './containers/user-edit';
import Loading from './components/loading';
import Error from './components/error';
import PageUtility from './utils/page';
import FacebookParserUtility from './utils/facebook-parser';

class App extends Component {
    componentWillMount() {
        const { applicationSetError, applicationSetSuccess, setUser } = this.props;

        PageUtility.getPageInformations(({hostname, lang, body, pathname}) => {
            // check hostname and language
            if (hostname !== 'www.facebook.com') {
                return applicationSetError('Must be on Facebook');
            }
            if (lang !== 'fr') {
                return applicationSetError('Only French on Facebook is currently supported.');
            }

            // check if on a profile page and get picture
            const picture = FacebookParserUtility.getPicture(body);
            if (!picture) {
                return applicationSetError('You must be on a profile page on Facebook.');
            }

            // get fbUserId (ie theo.mathieu1)
            // is not working : https://www.facebook.com/profile.php?id=100008180678034
            pathname = pathname.substring(1);
            let fbUserId;
            if (pathname.indexOf('/') !== -1) {
                fbUserId = pathname.substring(0, pathname.indexOf('/'));
            } else {
                fbUserId = pathname;
            }
            
            //change page 
            PageUtility.changePage('https://www.facebook.com/' + fbUserId + '/about?section=contact-info', () => {

                PageUtility.getPageInformations(({body}) => {
                    const birthdate = FacebookParserUtility.getBirthdate(body);
                    const gender = FacebookParserUtility.getGender(body);
                    const firstName = FacebookParserUtility.getFirstName(body);
                    const lastName = FacebookParserUtility.getLastName(body);

                    setUser({
                        birthdate,
                        gender,
                        firstName,
                        lastName,
                        facebook_profile_url: 'https://www.facebook.com/' + fbUserId,
                        picture
                    });
                    applicationSetSuccess();
                });
            });
        });
    }
    render() {
        const { loading, success, error } = this.props;

        if (error) {
            return <Error error={error} />;
        }
        if (loading) {
            return <Loading />;
        }

        return <UserEdit />;
    }
}




const mapStateToProps = state => ({
    loading: state.app.loading,
    success: state.app.success,
    error: state.app.error,
});

const mapDispatchToProps = dispatch => ({
    applicationSetSuccess: () => dispatch(applicationSetSuccess()),
    applicationSetError: (error) => dispatch(applicationSetError(error)),
    setUser: (user) => dispatch(setUser(user))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
