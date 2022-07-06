
jest.mock('winston', () => ({
    transports: {
        Console: jest.fn()
    },
    format: {
        combine: () =>  jest.fn(),
        timestamp: () => jest.fn(),
        json: () => jest.fn(),
    },
    createLogger: () => ({
        info: jest.fn(),
        error: jest.fn(),
        warn: jest.fn(),
    })
}))


import LoggerWinston from './index'

describe ('LoggerWinston', () => {
 
    let loggerWinston = new LoggerWinston();


   test('should create logger info for winston', () => {
    expect(typeof loggerWinston.info).toBe('function');
    expect(loggerWinston.info('test')).not.toBeNull()
   })

   test('should create logger error for winston', () => {
    expect(typeof loggerWinston.error).toBe('function');
    expect(loggerWinston.error('test')).not.toBeNull()
   })


   test('should create logger warn for winston', () => {
    expect(typeof loggerWinston.warn).toBe('function');
    expect(loggerWinston.warn('test')).not.toBeNull()
   })
})