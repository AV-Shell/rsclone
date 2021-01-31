/* eslint-disable class-methods-use-this */
/* eslint-disable max-classes-per-file */
import { BASE_URL } from '../constants/constants';
import {
  loginResponseData,
  signInRequestBody,
  wordData,
  wordsCount,
  userData,
  userResponce,
  tokenResponce,
  userWordReq,
  userWordRes,
  paginatedWord,
  aggregatedWordsResult,
  userStatistics,
  userSettings,
  IcreateUserError422Field,
} from '../constants/interfaces';
import { storage } from '../helpers/utils';

export class CreateUserError422 extends Error {
  public myErrField: IcreateUserError422Field;

  constructor(message: string, myErroField: IcreateUserError422Field) {
    super(message);
    this.myErrField = myErroField;
  }
}

export default class ApiService {
  public userId: string | null;

  public userName: string | null;

  public token: string | null;

  public refreshToken: string | null;

  public tokenExpiresIn: number;

  constructor() {
    this.userId = null;
    this.userName = null;
    this.token = null;
    this.refreshToken = null;
    this.tokenExpiresIn = 0;
  }

  updateStorage() {
    const tokenArr = this.token !== null ? this.token.split('.') : [];
    const payloadString = atob(tokenArr[1]);
    const payloadObj = JSON.parse(payloadString);
    this.tokenExpiresIn = payloadObj.exp * 1000;

    storage('userId', this.userId);
    storage('userName', this.userName);
    storage('token', this.token);
    storage('refreshToken', this.refreshToken);
    storage('tokenExpiresIn', this.tokenExpiresIn);
  }

  checkTokenValidity() {
    this.userId = storage('userId');
    this.userName = storage('userName');
    this.token = storage('token');
    this.refreshToken = storage('refreshToken');
    this.tokenExpiresIn = Number(storage('tokenExpiresIn'));

    if (!this.token || (new Date().getTime() - this.tokenExpiresIn > 0)) {
      return false;
    }

    return true;
  }

  clearUserLog() {
    this.userId = null;
    this.userName = null;
    this.token = null;
    this.refreshToken = null;
    this.tokenExpiresIn = 0;

    storage('userId', null);
    storage('userName', null);
    storage('token', null);
    storage('refreshToken', null);
    storage('tokenExpiresIn', null);
    storage('currentPage', null);
  }

  // Sign in
  async loginUser(userLog: signInRequestBody) {
    const rawResponse = await fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userLog),
    });

    if (rawResponse.status !== 200) {
      throw new Error(`${rawResponse.status}`);
    }

    const content: loginResponseData = await rawResponse.json();

    this.userId = content.userId;
    this.userName = content.name;
    this.token = content.token;
    this.refreshToken = content.refreshToken;
    this.updateStorage();

    return content;
  }

  // Words methods
  async getWords(page: number = 0, group: number = 0, wordsPerExampleSentenceLTE: number | undefined, wordsPerPage: number = 10) {
    let url: string = `${BASE_URL}/words?page=${page}&group=${group}`;

    if (wordsPerExampleSentenceLTE !== undefined) {
      url += `&wordsPerExampleSentenceLTE=${wordsPerExampleSentenceLTE}&wordsPerPage=${wordsPerPage}`;
    }

    const rawResponse = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    if (rawResponse.status !== 200) {
      throw new Error(`${rawResponse.status}`);
    }

    const content: wordData[] | [] = await rawResponse.json();
    return content;
  }

  async getWordsCount(page: number = 0, wordsPerExampleSentenceLTE: number | undefined, wordsPerPage: number = 10) {
    let url: string = `${BASE_URL}/words/count?page=${page}`;

    if (wordsPerExampleSentenceLTE !== undefined) {
      url += `&wordsPerExampleSentenceLTE=${wordsPerExampleSentenceLTE}&wordsPerPage=${wordsPerPage}`;
    }

    const rawResponse = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    if (rawResponse.status !== 200) {
      throw new Error(`${rawResponse.status}`);
    }

    const content: wordsCount = await rawResponse.json();
    return content;
  }

  async getWordById(wordId: string, noAssets: boolean | null = true) {
    let url: string = `${BASE_URL}/words/${wordId}`;

    if (noAssets !== null) {
      url += `?noAssets=${noAssets}`;
    }

    const rawResponse = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    if (rawResponse.status !== 200) {
      throw new Error(`${rawResponse.status}`);
    }

    const content: wordData = await rawResponse.json();
    return content;
  }

  // Users methods
  async createUser(user: userData) {
    const rawResponse = await fetch(`${BASE_URL}/users`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    if (rawResponse.status !== 200) {
      if (rawResponse.status === 422) {
        const errorResult: IcreateUserError422Field = await rawResponse.json();
        const myError = new CreateUserError422(`${rawResponse.status}`, errorResult);
        throw myError;
      }
      throw new Error(`${rawResponse.status}`);
    }

    const content: userResponce = await rawResponse.json();
    return content;
  }

  async getUser() {
    const rawResponse = await fetch(`${BASE_URL}/users/${this.userId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.token}`,
        Accept: 'application/json',
      },
    });

    if (rawResponse.status !== 200) {
      throw new Error(`${rawResponse.status}`);
    }

    const content: userResponce = await rawResponse.json();
    return content;
  }

  async updateUser(user: userData) {
    const rawResponse = await fetch(`${BASE_URL}/users/${this.userId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${this.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    if (rawResponse.status !== 200) {
      throw new Error(`${rawResponse.status}`);
    }

    const content: userResponce = await rawResponse.json();
    this.userName = content.name;

    return content;
  }

  async deleteUser(confirm: boolean) {
    if (confirm !== true) {
      return false;
    }

    const rawResponse = await fetch(`${BASE_URL}/users/${this.userId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${this.token}`,
        Accept: '*/*',
      },
    });

    return rawResponse.status;
  }

  async getNewTokens() {
    const rawResponse = await fetch(`${BASE_URL}/users/${this.userId}/tokens`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.refreshToken}`,
        Accept: 'application/json',
      },
    });

    if (rawResponse.status !== 200) {
      throw new Error(`${rawResponse.status}`);
    }

    const content: tokenResponce = await rawResponse.json();

    this.token = content.token;
    this.refreshToken = content.refreshToken;
    this.updateStorage();

    return content;
  }

  // Users/Words methods
  async getAllUserWords() {
    const rawResponse = await fetch(`${BASE_URL}/users/${this.userId}/words`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.token}`,
        Accept: 'application/json',
      },
    });

    if (rawResponse.status !== 200) {
      throw new Error(`${rawResponse.status}`);
    }

    const content: userWordRes[] = await rawResponse.json();
    return content;
  }

  async createUserWord(wordId: string, word: userWordReq) {
    const rawResponse = await fetch(`${BASE_URL}/users/${this.userId}/words/${wordId}`, {
      method: 'POST',
      // withCredentials: true,
      headers: {
        Authorization: `Bearer ${this.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(word),
    });

    if (rawResponse.status !== 200) {
      throw new Error(`${rawResponse.status}`);
    }

    const content: userWordRes = await rawResponse.json();
    return content;
  }

  async getUserWordById(wordId: string) {
    const rawResponse = await fetch(`${BASE_URL}/users/${this.userId}/words/${wordId}`, {
      method: 'GET',
      // withCredentials: true,
      headers: {
        Authorization: `Bearer ${this.token}`,
        Accept: 'application/json',
      },
    });

    if (rawResponse.status !== 200) {
      throw new Error(`${rawResponse.status}`);
    }

    const content: userWordRes = await rawResponse.json();
    return content;
  }

  async updateUserWord(wordId: string, word: userWordReq) {
    const rawResponse = await fetch(`${BASE_URL}/users/${this.userId}/words/${wordId}`, {
      method: 'PUT',
      // withCredentials: true,
      headers: {
        Authorization: `Bearer ${this.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(word),
    });

    if (rawResponse.status !== 200) {
      throw new Error(`${rawResponse.status}`);
    }

    const content: userWordRes = await rawResponse.json();
    return content;
  }

  async deleteUserWord(wordId: string) {
    const rawResponse = await fetch(`${BASE_URL}/users/${this.userId}/words/${wordId}`, {
      method: 'DELETE',
      // withCredentials: true,
      headers: {
        Authorization: `Bearer ${this.token}`,
        Accept: '*/*',
      },
    });

    return rawResponse.status;
  }

  // Users/AggregatedWords methods

  // filter must be a string:
  // filter = '{"$or":[{"userWord.difficulty":"easy"},{"userWord":null}]}';

  // '{ "userWord": null }'
  // '{ "$or": [{ "userWord.optional.gameError": false }, { "userWord.optional.gameError": true }] }'
  // '{ "userWord.optional.gameError": { "$in": [true, false] } }'
  // '{ "userWord.optional.userWord": true }'
  async getAllUserAggregatedWords(group: number | null, page: number | null,
    wordsPerPage: number | null, filter: string | null) {
    let url: string = `${BASE_URL}/users/${this.userId}/aggregatedWords?`;

    if (group !== null) url += `group=${group}`;
    if (page !== null) url += `${group !== null ? '&' : ''}page=${group}`;
    if (wordsPerPage) url += `${(group !== null || page !== null) ? '&' : ''}wordsPerPage=${wordsPerPage}`;

    if (filter) {
      const encodedFilter = encodeURIComponent(filter);
      url += `${(group !== null || page !== null || wordsPerPage) ? '&' : ''}filter=${encodedFilter}`;
    }

    const rawResponse = await fetch(url, {
      method: 'GET',
      // withCredentials: true,
      headers: {
        Authorization: `Bearer ${this.token}`,
        Accept: 'application/json',
      },
    });

    if (rawResponse.status !== 200) {
      throw new Error(`${rawResponse.status}`);
    }

    const content: aggregatedWordsResult[] = await rawResponse.json();
    return content[0];
  }

  async getUserAggregatedWordById(wordId: string) {
    const rawResponse = await fetch(`${BASE_URL}/users/${this.userId}/aggregatedWords/${wordId}`, {
      method: 'GET',
      // withCredentials: true,
      headers: {
        Authorization: `Bearer ${this.token}`,
        Accept: 'application/json',
      },
    });

    if (rawResponse.status !== 200) {
      throw new Error(`${rawResponse.status}`);
    }

    const content: paginatedWord[] = await rawResponse.json();
    return content;
  }

  // Users/Statistic methods
  async getStatistics() {
    const rawResponse = await fetch(`${BASE_URL}/users/${this.userId}/statistics`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.token}`,
        Accept: 'application/json',
      },
    });

    if (rawResponse.status !== 200) {
      throw new Error(`${rawResponse.status}`);
    }

    const content: userStatistics = await rawResponse.json();
    delete content.id;

    return content;
  }

  async updateStatistics(stats: userStatistics) {
    const rawResponse = await fetch(`${BASE_URL}/users/${this.userId}/statistics`, {
      method: 'PUT',
      // withCredentials: true,
      headers: {
        Authorization: `Bearer ${this.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(stats),
    });

    if (rawResponse.status !== 200) {
      throw new Error(`${rawResponse.status}`);
    }

    const content: userStatistics = await rawResponse.json();
    delete content.id;

    return content;
  }

  // Users/Settings methods
  async getSettings() {
    const rawResponse = await fetch(`${BASE_URL}/users/${this.userId}/settings`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.token}`,
        Accept: 'application/json',
      },
    });

    if (rawResponse.status !== 200) {
      throw new Error(`${rawResponse.status}`);
    }

    const content: userSettings = await rawResponse.json();
    delete content.id;

    return content;
  }

  async updateSettings(settings: userSettings) {
    const rawResponse = await fetch(`${BASE_URL}/users/${this.userId}/settings`, {
      method: 'PUT',
      // withCredentials: true,
      headers: {
        Authorization: `Bearer ${this.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(settings),
    });

    if (rawResponse.status !== 200) {
      throw new Error(`${rawResponse.status}`);
    }

    const content: userSettings = await rawResponse.json();
    delete content.id;

    return content;
  }

  getAllAggregatedUserWords = async () => {
    const result = await this.getAllUserAggregatedWords(null, null, 3600,
      '{ "userWord.optional.userWord": true }');
    return result;
  }

  getAllAggregatedWords = async () => {
    const result = await this.getAllUserAggregatedWords(null, null, 3600, null);
    return result;
  }

  getAllAggregatedNewWords = async () => {
    const result = await this.getAllUserAggregatedWords(null, null, 3600, '{ "userWord": null }');
    return result;
  }

  getSomethingAggregatedNewWords = async (count: number) => {
    const result = await this.getAllUserAggregatedWords(null, null, count, '{ "userWord": null }');
    return result;
  }

  getAggregatedNewWordsFromGroup = async (count: number, group: number) => {
    const result = await this.getAllUserAggregatedWords(group, null, count, '{ "userWord": null }');
    return result;
  }
}
