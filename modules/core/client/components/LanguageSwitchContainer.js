import React from 'react';
import i18n from '@/config/lib/i18n';
import PropTypes from 'prop-types';
import * as users from '@/modules/users/client/api/users.api';

const api = { users };

export default class LanguageSwitchContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentLanguageCode: i18n.language,
      languages: [
        { name: 'English', code: 'eng' },
        { name: 'Suomi', code: 'fin' },
        { name: 'Česky', code: 'cze' }
      ]
    };

    // bind class context to class methods
    this.handleChangeLanguage = this.handleChangeLanguage.bind(this);
  }

  async handleChangeLanguage(languageCode) {
    this.setState(() => ({ currentLanguageCode: languageCode }));
    i18n.changeLanguage(languageCode);

    // save the user's choice to api
    if (this.props.saveToAPI) {
      // @TODO this needs some feedback. Currently no feedback to user that this was saved.
      await api.users.update({ locale: languageCode });
    }
  }

  render() {
    return (
      <this.props.presentation
        currentLanguageCode={this.state.currentLanguageCode}
        languages={this.state.languages}
        onChangeLanguage={this.handleChangeLanguage}
      />
    );
  }
}

LanguageSwitchContainer.propTypes = {
  presentation: PropTypes.func.isRequired,
  saveToAPI: PropTypes.bool.isRequired
};
