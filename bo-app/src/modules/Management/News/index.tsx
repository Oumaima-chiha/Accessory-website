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
import { selectActiveNewsTab } from 'app/store/selectors';
import { useAppDispatch, useAppSelector } from 'hooks';
import { useTranslation } from 'react-i18next';
import NewsManagementContainer from './components/NewsManagement';
import TopicsManagementContainer from './components/TopicsManagement';
import { updateTabIndex } from './redux';

const FeedbackContainer = (): JSX.Element => {
  const { t } = useTranslation(['feedback']);
  const dispatch = useAppDispatch();
  const activeTabIndex = useAppSelector(selectActiveNewsTab);

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
              {t('news:tab_title')}
            </Heading>
          </Tab>
          <Tab>
            <Heading size="md" color="secondary.500">
              {t('news:tab_title', { context: 'topics' })}
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
            <NewsManagementContainer />
          </TabPanel>
          <TabPanel>
            <TopicsManagementContainer />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};

export default FeedbackContainer;
