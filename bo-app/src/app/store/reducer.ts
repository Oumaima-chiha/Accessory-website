import { combineReducers } from '@reduxjs/toolkit';
import { errorMiddleware } from 'app/api/middleware';
import {
  AboutUsManagement,
  Auth,
  BOUsersManagement,
  FAQManagement,
  FeedbackManagement,
  LegalManagement,
  NewsManagement,
  NotificationsManagement,
  RolesManagement,
  TipsManagement,
  UsersManagement,
} from 'modules';

export const combinedReducer = combineReducers({
  ...Auth.default,
  ...UsersManagement.default,
  ...RolesManagement.default,
  ...BOUsersManagement.default,
  ...TipsManagement.default,
  ...FAQManagement.default,
  ...FeedbackManagement.default,
  ...NewsManagement.default,
  ...LegalManagement.default,
  ...AboutUsManagement.default,
  ...NotificationsManagement.default,
});

export type IRootState = ReturnType<typeof combinedReducer>;
export const combinedMiddleware = [
  Auth.authAPI.middleware,
  UsersManagement.usersAPI.middleware,
  RolesManagement.rolesAPI.middleware,
  BOUsersManagement.boUsersApi.middleware,
  TipsManagement.tipsAPI.middleware,
  FAQManagement.faqAPI.middleware,
  FeedbackManagement.feedbackAPI.middleware,
  NewsManagement.newsAPI.middleware,
  LegalManagement.legalApi.middleware,
  AboutUsManagement.aboutUsAPI.middleware,
  NotificationsManagement.notificationsAPI.middleware,
  // unauthenticatedMiddleware,
  errorMiddleware,
];
