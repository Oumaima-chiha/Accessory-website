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
import UsersFeedbackContainer from './components/UsersFeedback';
import FeedbackCategoriesContainer from './components/FeedbackCategories';
import { updateTabIndex } from './redux';

const FeedbackContainer = (): JSX.Element => {
  const { t } = useTranslation(['feedback']);
  const dispatch = useAppDispatch();
  const activeTabIndex = useAppSelector(state => state.feedback.activeTab);

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
              {t('feedback:users_feedback.name', { context: 'other' })}
            </Heading>
          </Tab>
          <Tab>
            <Heading size="md" color="secondary.500">
              {t('feedback:feedback_categories.name')}
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
            <UsersFeedbackContainer />
          </TabPanel>
          <TabPanel>
            <FeedbackCategoriesContainer />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};

export default FeedbackContainer;
