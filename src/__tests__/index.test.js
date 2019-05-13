import YoGen from 'yeoman-generator';
import yoxable from '..';

describe('yoxable', () => {
  let state = {};

  class Generator1 extends YoGen {
    end() {
      state.finishedGen1 = true;
    }
  }

  class Generator2 extends YoGen {
    end() {
      state.finishedGen2 = true;
    }
  }

  class GeneratorDefault extends YoGen {
    end() {
      state.finishedDefault = true;
    }
  }

  beforeEach(() => {
    state = {};
  });

  describe('multiple generators', () => {
    let yox = null;

    beforeAll(() => {
      yox = yoxable({
        pkg: require('../../package.json'),
        generators: [GeneratorDefault, Generator1, Generator2],
      });
    });

    it('should run generators in parallel', async () => {
      await yox(['generator1,', 'generator2']);
      expect(state.finishedGen1).toBe(true);
      expect(state.finishedGen2).toBe(true);
    });

    it('should run the first generator if no args provided', async () => {
      await yox([]);
      expect(state.finishedDefault).toBe(true);
    });
  });
});
