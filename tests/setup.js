const Enzyme = require('enzyme')

const Adapter = require('enzyme-adapter-react-16')

const jestCavansMock = require('jest-canvas-mock')

Enzyme.configure({ adapter: new Adapter(), jestCavansMock })
