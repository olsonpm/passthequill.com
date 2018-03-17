import createWinstonWrapper from './create-winston-wrapper'

export default {
  http: createWinstonWrapper('http'),
  server: createWinstonWrapper('server'),
}
