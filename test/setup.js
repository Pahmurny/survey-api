/* global beforeAll afterAll afterEach */
import { EventEmitter } from 'events';
import { Mockgoose } from 'mockgoose';
import mongoose from '../src/services/mongoose';
import { mongo } from '../src/config';


const mockgoose = new Mockgoose(mongoose);
mockgoose.helper.setDbVersion('3.2.1');

EventEmitter.defaultMaxListeners = Infinity;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 120000;

global.Array = Array;
global.Date = Date;
global.Function = Function;
global.Math = Math;
global.Number = Number;
global.Object = Object;
global.RegExp = RegExp;
global.String = String;
global.Uint8Array = Uint8Array;
global.WeakMap = WeakMap;
global.Set = Set;
global.Error = Error;
global.TypeError = TypeError;
global.parseInt = parseInt;
global.parseFloat = parseFloat;

beforeAll(async () => {
  try {
    await mockgoose.prepareStorage();
    mongoose.connect(mongo.uri);
  } catch (error) {
    console.log('Mongoose error:', error);
  }
});

afterAll(() => {
  mongoose.disconnect();
});

afterEach(async () => {
  const { collections } = mongoose.connection;
  const promises = [];
  Object.keys(collections).forEach((collection) => {
    promises.push(collections[collection].remove());
  });
  await Promise.all(promises);
});
