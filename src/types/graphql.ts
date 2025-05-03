export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type Auth = {
  __typename?: 'Auth';
  token: Scalars['String']['output'];
  user: User;
};

export type Chat = {
  __typename?: 'Chat';
  admin?: Maybe<User>;
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isGroupChat: Scalars['Boolean']['output'];
  lastMessage?: Maybe<Message>;
  messages: Array<Message>;
  name?: Maybe<Scalars['String']['output']>;
  participants: Array<User>;
  updatedAt: Scalars['String']['output'];
};

export type FriendRequest = {
  __typename?: 'FriendRequest';
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  receiver: User;
  sender: User;
  status: FriendRequestStatus;
  updatedAt: Scalars['String']['output'];
};

export type FriendRequestStatus = 'ACCEPTED' | 'PENDING' | 'REJECTED';

export type Message = {
  __typename?: 'Message';
  chat: Chat;
  content: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  readBy: Array<User>;
  sender: User;
  updatedAt: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addUserToGroupChat: Chat;
  createChat: Chat;
  leaveGroupChat: Scalars['Boolean']['output'];
  login: Auth;
  markMessagesAsRead: Scalars['Boolean']['output'];
  register: Auth;
  removeFriend: Scalars['Boolean']['output'];
  removeUserFromGroupChat: Chat;
  respondToFriendRequest: FriendRequest;
  sendFriendRequest: FriendRequest;
  sendMessage: Message;
  updateProfile: User;
};

export type MutationAddUserToGroupChatArgs = {
  chatId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};

export type MutationCreateChatArgs = {
  isGroupChat: Scalars['Boolean']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  participantIds: Array<Scalars['ID']['input']>;
};

export type MutationLeaveGroupChatArgs = {
  chatId: Scalars['ID']['input'];
};

export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type MutationMarkMessagesAsReadArgs = {
  chatId: Scalars['ID']['input'];
};

export type MutationRegisterArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type MutationRemoveFriendArgs = {
  userId: Scalars['ID']['input'];
};

export type MutationRemoveUserFromGroupChatArgs = {
  chatId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};

export type MutationRespondToFriendRequestArgs = {
  accept: Scalars['Boolean']['input'];
  requestId: Scalars['ID']['input'];
};

export type MutationSendFriendRequestArgs = {
  userId: Scalars['ID']['input'];
};

export type MutationSendMessageArgs = {
  chatId: Scalars['ID']['input'];
  content: Scalars['String']['input'];
};

export type MutationUpdateProfileArgs = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  getChat?: Maybe<Chat>;
  getChatMessages: Array<Message>;
  getChats: Array<Chat>;
  getFriendRequests: Array<FriendRequest>;
  getFriends: Array<User>;
  getUser?: Maybe<User>;
  me?: Maybe<User>;
  searchUsers: Array<User>;
};

export type QueryGetChatArgs = {
  id: Scalars['ID']['input'];
};

export type QueryGetChatMessagesArgs = {
  chatId: Scalars['ID']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type QueryGetUserArgs = {
  id: Scalars['ID']['input'];
};

export type QuerySearchUsersArgs = {
  query: Scalars['String']['input'];
};

export type Subscription = {
  __typename?: 'Subscription';
  chatCreated: Chat;
  friendRequestReceived: FriendRequest;
  friendRequestUpdated: FriendRequest;
  messageSent: Message;
  userStatusChanged: User;
};

export type SubscriptionMessageSentArgs = {
  chatId?: InputMaybe<Scalars['ID']['input']>;
};

export type SubscriptionUserStatusChangedArgs = {
  userId?: InputMaybe<Scalars['ID']['input']>;
};

export type User = {
  __typename?: 'User';
  avatar?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['String']['output'];
  email: Scalars['String']['output'];
  friendRequests?: Maybe<Array<Maybe<FriendRequest>>>;
  friends?: Maybe<Array<Maybe<User>>>;
  id: Scalars['ID']['output'];
  lastSeen?: Maybe<Scalars['String']['output']>;
  sentFriendRequests?: Maybe<Array<Maybe<FriendRequest>>>;
  status?: Maybe<UserStatus>;
  updatedAt: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type UserStatus = 'AWAY' | 'OFFLINE' | 'ONLINE';
