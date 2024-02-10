import { Languages } from 'common';
import Select from 'components/Select';
import { memo } from 'react';
import type { WithTranslation } from 'react-i18next';
import { withTranslation } from 'react-i18next';
import { setCookie } from 'utils/functions';

interface ILanguage {
  label: string;
  value: string;
}

const Language = ({
  i18n,
}: {
  i18n: WithTranslation<'common'>['i18n'];
}): JSX.Element => {
  function changeLanguage(lang: ILanguage): void {
    if (lang?.value !== i18n.language) {
      setCookie('lang', lang?.value);
      i18n.changeLanguage(lang?.value);
      window.location.reload();
    }
  }
  return (
    <Select
      defaultValue={i18n.language}
      options={[
        { label: 'English', value: Languages.EN },
        { label: 'العربية', value: Languages.AR },
      ]}
      onChange={(lang: any): void => {
        changeLanguage(lang);
      }}
    />
  );
};

export default withTranslation()(memo(Language));
