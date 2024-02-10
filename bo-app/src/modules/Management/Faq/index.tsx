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
import { selectActiveFaqTab } from 'app/store/selectors';
import { useAppDispatch, useAppSelector } from 'hooks';
import { useTranslation } from 'react-i18next';
import FAQCategoriesContainer from './components/Categories';
import FAQContainer from './components/FAQ';
import { updateTabIndex } from './redux';

const FeedbackContainer = (): JSX.Element => {
  const { t } = useTranslation(['faq']);
  const dispatch = useAppDispatch();
  const activeTabIndex = useAppSelector(selectActiveFaqTab);

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
              {t('tab_title')}
            </Heading>
          </Tab>
          <Tab>
            <Heading size="md" color="secondary.500">
              {t('tab_title', { context: 'category' })}
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
            <FAQContainer />
          </TabPanel>
          <TabPanel>
            <FAQCategoriesContainer />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};

export default FeedbackContainer;
