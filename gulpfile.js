const gulp = require('gulp');
const fs = require('fs');
const { argv } = require('yargs');
const conventionalChangelog = require('gulp-conventional-changelog');

const styleguidePath = argv.styleguidePath || 'https://base-angewandte.github.io/base-ui-components/components/';

gulp.task('changelog', (cb) => {
  // check if the file exists and create it if necessary
  // fallback if user forgets to create an .env.local file
  if (!fs.existsSync('CHANGELOG.md')) {
    fs.openSync('CHANGELOG.md', 'w');
    console.info('CHANGELOG.md file was created.');
  }

  gulp.src('CHANGELOG.md')
    .pipe(conventionalChangelog({
      // conventional-changelog options go here
      preset: 'conventionalcommits',
      append: false,
      releaseCount: 1,
    }, {
      // do not link references to github repo
      linkReferences: false,
    }, {
      // git-raw-commits options go here
    }, {
      // conventional-commits-parser options go here
    }, {
      // sections are created based on commit type
      groupBy: 'type',
      reverse: false,
      // order by scope first so that components affecting same component are at least
      // listed below each other
      commitsSort: ['scope', 'subject'],
      // sort the sections according to a predefined order
      commitGroupsSort: (val1, val2) => {
        // define groups for which order is fixed here
        // (everything else will come after)
        const sortOrder = ['feat', 'change', 'deprecate', 'remove', 'fix', 'security'];
        const val1Index = sortOrder.indexOf(val1.title);
        const val2Index = sortOrder.indexOf(val2.title);
        // if val1 does not exist in the order array sort val2 before val1
        if (val1Index === -1) {
          return 1;
        }
        // if val2 does not exist in array sort val1 before val1
        if (val2Index === -1) {
          return -1;
        }
        // else sort according to the index value in sort array
        return val1Index - val2Index;
      },
      // do transformations for every single commit here
      // (also tried with transform function of conventional-changelog options however
      // outcome was quite different so leaving it here)
      transform: (commit) => {
        // initialize an object for the modified properties (so there is potential
        // to modify further props)
        const modifiedProps = {};
        // check if the scope does include the string 'Base' which would indicate that a
        // component was set as scope
        if (commit.scope && commit.scope.includes('Base')) {
          // remove space characters and split components listed in scope by comma
          const componentNameArray = commit.scope.replace(' ', '').split(',');
          // map the retrieved array and supplement the component name with the link markdown
          const alteredArray = componentNameArray
            .map(component => `[${component}](${styleguidePath}${component})`);
          // join altered strings array to one string again
          modifiedProps.scope = alteredArray.join(', ');
        }
        // return original commit object together with modified props overwriting original
        // if necessary via spread operator
        return {
          ...commit,
          ...modifiedProps,
        };
      },
      finalizeContext: (context) => {
        // define which type should go into which section here (as specified in documentation)
        const changelogGroups = {
          feat: 'Added',
          change: 'Changed',
          deprecate: 'Deprecated',
          remove: 'Removed',
          fix: 'Fixed',
          security: 'Security',
        };
        return {
          ...context,
          // create custom section headers instead of the default type derived ones
          commitGroups: context.commitGroups.map((group) => {
            // only return groups that have a title
            if (group.title) {
              const newTitleString = changelogGroups[group.title] || group.title;
              return {
                ...group,
                // check if there is actually a title string and if yes uppercase it
                title: newTitleString ? newTitleString.charAt(0).toUpperCase() + newTitleString.slice(1) : '',
              };
            }
            // returning an empty object will ignore the section in the changelog output
            return {};
          }),
        };
      },
    }))
    .pipe(gulp.dest('./'));
  cb();
});

gulp.task('default', gulp.series(gulp.parallel('changelog')));
