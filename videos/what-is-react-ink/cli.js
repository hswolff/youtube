import React, { Component } from 'react';
import { render, Color, Box, Static, AppContext } from 'ink';
import SelectInput from 'ink-select-input';
import packageJson from './package.json';
import child_process from 'child_process';

class Counter extends Component {
  constructor() {
    super();

    this.state = {
      i: 0,
    };
  }

  render() {
    const items = Object.keys(packageJson.scripts).map(commandName => {
      return {
        label: commandName,
        value: commandName,
      };
    });

    return (
      <>
        <Static>
          <Box width={4} height={2}>
            <Color blue>npm run command selector!</Color>
          </Box>
        </Static>

        <AppContext.Consumer>
          {({ exit }) => (
            <SelectInput
              items={items}
              onSelect={({ value }) => {
                console.log('Hello!');
                child_process.execSync(`npm run ${value}`, {
                  stdio: 'inherit',
                });
                exit();
              }}
            />
          )}
        </AppContext.Consumer>
      </>
    );
  }
}

render(<Counter />);
