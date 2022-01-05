/*
 * Copyright (C) 2016 salesforce.com, inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const {SfdxCommand, flags} = require('@salesforce/command');
const linter = require('../../lib/linter.js');

class LintCommand extends SfdxCommand {
    async run() {
        var lintResult = linter(this.args.path, this.flags, {
            cwd: process.cwd()
        });

        if (this.flags.exit && lintResult === false) {
            process.exit(1);
        }
    }
}

LintCommand.description = 'analyze (lint) Aura component code';
LintCommand.longDescription = 'Runs a static analysis, or “lint,” tool on your Aura component code. ' +
    'The default rules include recommended best practices and Locker Service requirements. ' +
    'For details, including how to customize the rules for your org, see the Lightning Aura Components Developer Guide.';

LintCommand.examples = ['<%= config.bin %> <%= command.id %> ./path/to/be/linted/']

LintCommand.args = [{ name: 'path' }]

LintCommand.flagsConfig = {
    ignore: flags.string({
        char: 'i',
        description: 'pattern used to ignore some folders',
        longDescription: 'A “glob” pattern used to filter folders (and their contents) out of the analysis. ' +
            'For example: --ignore **/foo/**.'
    }),
    files: flags.string({
        description: 'pattern used to include specific files',
        longDescription: 'A “glob” pattern used to add specific files to the analysis. ' +
            'For example, to only analyse your controller files, use --files **/*Controller.js. ' +
            'When specified, this value overrides the --ignore flag. ' +
            'The default is all .js files.'
    }),
    config: flags.string({
        description: 'path to a custom ESLint configuration file',
        longDescription: 'Path to a custom ESLint configuration file. ' +
            'Only code style rules are used, while the rest are ignored. ' +
            'For example: --config path/to/.eslintrc.'
    }),
    verbose: flags.builtin({
        description: 'report warnings in addition to errors',
        longDescription: 'Report both warnings and errors. The default is to report only errors.'
    }),
    exit: flags.boolean({
        hasValue: false,
        description: 'exit with error code 1 if there are lint issues',
        longDescription: 'Exit with error code 1 if there are lint issues. ' +
            'The default exits without an error code.'
    })
};

module.exports = LintCommand;
