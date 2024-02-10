import {
  Container,
  Heading,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from 'hooks';
import { useTranslation } from 'react-i18next';
import PrivacyPolicyContainer from './components/PrivacyPolicy';
import TermsConditionsContainer from './components/TermsConditions';
import { updateTabIndex } from './redux';

const FeedbackContainer = (): JSX.Element => {
  const { t } = useTranslation(['legal']);
  const dispatch = useAppDispatch();
  const activeTabIndex = useAppSelector(state => state.legal.activeTab);

  const changeTabIndex = (tabIndex: number): void => {
    dispatch(updateTabIndex(tabIndex));
  };

  return (
    <Container minW="100%">
      <Tabs
        position="relative"
        isFitted
        variant="unstyled"
        onChange={changeTabIndex}
        defaultIndex={activeTabIndex}
        isLazy>
        <TabList>
          <Tab>
            <Heading size="md" color="secondary.500">
              {t('terms_conditions')}
            </Heading>
          </Tab>
          <Tab>
            <Heading size="md" color="secondary.500">
              {t('privacy_policy')}
            </Heading>
          </Tab>
        </TabList>
        <TabIndicator
          mt="-1.5px"
          height="2px"
          bg="secondary.500"
          borderRadius="1px"
        />
        <TabPanels>
          <TabPanel>
            <TermsConditionsContainer />
          </TabPanel>
          <TabPanel>
            <PrivacyPolicyContainer />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};

export default FeedbackContainer;
