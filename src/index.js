import list from 'cli-list';
import meow from 'meow';
import yo from 'yeoman-environment';
import TerminalAdapter from 'yeoman-environment/lib/adapter';

export function defaultGetGeneratorOptions(generator) {
  return {
    name: generator.key || generator.name.toLowerCase(),
  };
}

export default function yoxable({
  pkg,
  generators,
  getGeneratorOptions = defaultGetGeneratorOptions,
  createAdapter = () => new TerminalAdapter(),
}) {
  function registerGenerators(env) {
    generators.forEach((generator) => {
      const { name } = getGeneratorOptions(generator);
      env.registerStub(generator, name);
    });
  }

  return async function run(argv) {
    const env = yo.createEnv([], {}, createAdapter());
    registerGenerators(env);

    await new Promise((resolve, reject) => {
      try {
        env.lookup(() => resolve());
      } catch (error) {
        reject(error);
      }
    });

    const gens = list(argv);

    await Promise.all(
      gens
        .map((gen) => {
          const minicli = meow({ help: false, pkg, argv: gen });
          const opts = minicli.flags;
          const args = minicli.input;
          return { opts, args };
        })
        .map(
          ({ args, opts }) =>
            new Promise((resolve, reject) => {
              env.run(args, opts, (error) => {
                if (error) {
                  reject(error);
                  return;
                }
                resolve();
              });
            })
        )
    );
  };
}
